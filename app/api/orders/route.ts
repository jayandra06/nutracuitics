import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { rapidShypService } from '@/lib/rapidshyp';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// Mock database - in production, use a real database
const orders: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, customer, total, gst, subtotal } = body;

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: total * 100, // Amount in paise
      currency: 'INR',
      receipt: `order_${Date.now()}`,
      notes: {
        customer_name: `${customer.firstName} ${customer.lastName}`,
        customer_email: customer.email,
        customer_phone: customer.phone,
        items_count: items.length,
        gst_amount: gst,
        subtotal: subtotal,
      },
    });

    // Create order record
    const order = {
      id: `ORD-${Date.now()}`,
      razorpayOrderId: razorpayOrder.id,
      customer,
      items,
      total,
      gst,
      subtotal,
      status: 'pending',
      paymentStatus: 'pending',
      shipmentStatus: 'not_created',
      trackingId: null,
      awbNumber: null,
      courierName: null,
      estimatedDelivery: null,
      shippingCost: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Store order (in production, save to database)
    orders.push(order);

    return NextResponse.json({
      success: true,
      razorpayOrderId: razorpayOrder.id,
      order,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');
    const trackingId = searchParams.get('trackingId');

    if (orderId) {
      // Get specific order
      const order = orders.find(o => o.id === orderId || o.razorpayOrderId === orderId);
      if (!order) {
        return NextResponse.json(
          { success: false, error: 'Order not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, order });
    }

    if (trackingId) {
      // Track shipment
      try {
        const trackingData = await rapidShypService.trackShipment(trackingId);
        return NextResponse.json({ success: true, tracking: trackingData });
      } catch (error) {
        return NextResponse.json(
          { success: false, error: 'Tracking failed' },
          { status: 500 }
        );
      }
    }

    // Get all orders (for admin)
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, action, data } = body;

    const orderIndex = orders.findIndex(o => o.id === orderId);
    if (orderIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    const order = orders[orderIndex];

    switch (action) {
      case 'confirm_payment':
        order.paymentStatus = 'paid';
        order.status = 'confirmed';
        break;

      case 'create_shipment':
        try {
          // Calculate total weight and value
          const totalWeight = order.items.reduce((sum: number, item: any) => sum + (item.weight || 0.5), 0);
          const totalValue = order.total;

          const shipmentData = {
            order_id: order.id,
            customer_name: `${order.customer.firstName} ${order.customer.lastName}`,
            customer_phone: order.customer.phone,
            customer_email: order.customer.email,
            customer_address: order.customer.address,
            customer_city: order.customer.city,
            customer_state: order.customer.state,
            customer_pincode: order.customer.pincode,
            customer_country: 'India',
            product_name: order.items.map((item: any) => item.name).join(', '),
            product_quantity: order.items.reduce((sum: number, item: any) => sum + item.quantity, 0),
            product_weight: totalWeight,
            product_value: totalValue,
            payment_mode: 'prepaid' as const,
            return_address: {
              name: 'AXION SCIENTIFICS',
              phone: '+91 9876543210',
              address: '123 Industrial Area, Phase 1',
              city: 'Mumbai',
              state: 'Maharashtra',
              pincode: '400001',
            },
          };

          const shipment = await rapidShypService.createShipment(shipmentData);
          
          order.shipmentStatus = 'created';
          order.trackingId = shipment.data.tracking_id;
          order.awbNumber = shipment.data.awb_number;
          order.courierName = shipment.data.courier_name;
          order.estimatedDelivery = shipment.data.estimated_delivery;
          order.shippingCost = shipment.data.shipping_cost;
          order.status = 'shipped';

        } catch (error) {
          console.error('Error creating shipment:', error);
          return NextResponse.json(
            { success: false, error: 'Failed to create shipment' },
            { status: 500 }
          );
        }
        break;

      case 'update_status':
        order.status = data.status;
        break;

      case 'schedule_pickup':
        try {
          const pickupData = {
            pickup_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Tomorrow
            pickup_time_slot: '10:00-14:00',
            special_instructions: 'Please handle with care - Herbal supplements'
          };
          
          const response = await fetch(`/api/shipments/${order.id}/pickup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pickupData),
          });
          
          if (response.ok) {
            order.shipmentStatus = 'pickup_scheduled';
          }
        } catch (error) {
          console.error('Error scheduling pickup:', error);
        }
        break;

      case 'generate_label':
        try {
          const response = await fetch(`/api/shipments/${order.id}/label`);
          if (response.ok) {
            const labelData = await response.json();
            // Store label URL for download
            order.labelUrl = labelData.label?.url;
          }
        } catch (error) {
          console.error('Error generating label:', error);
        }
        break;

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }

    order.updatedAt = new Date().toISOString();
    orders[orderIndex] = order;

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update order' },
      { status: 500 }
    );
  }
}
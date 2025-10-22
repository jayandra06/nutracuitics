import { NextRequest, NextResponse } from 'next/server';
import { rapidShypService } from '@/lib/rapidshyp';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { from_pincode, to_pincode, weight, value, courier_preference } = body;

    if (!from_pincode || !to_pincode || !weight || !value) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const shippingCost = await rapidShypService.calculateShippingCost({
      from_pincode,
      to_pincode,
      weight,
      value,
      courier_preference,
    });

    return NextResponse.json({
      success: true,
      shippingCost,
    });
  } catch (error) {
    console.error('Error calculating shipping cost:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to calculate shipping cost' },
      { status: 500 }
    );
  }
}


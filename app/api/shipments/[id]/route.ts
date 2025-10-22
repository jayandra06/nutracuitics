import { NextRequest, NextResponse } from 'next/server';
import { rapidShypService } from '@/lib/rapidshyp';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const shipment = await rapidShypService.getShipmentDetails(id);

    return NextResponse.json({
      success: true,
      shipment,
    });
  } catch (error) {
    console.error('Error fetching shipment details:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch shipment details' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const shipment = await rapidShypService.updateShipment(id, body);

    return NextResponse.json({
      success: true,
      shipment,
    });
  } catch (error) {
    console.error('Error updating shipment:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update shipment' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const result = await rapidShypService.cancelShipment(id, body.reason);

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error('Error canceling shipment:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to cancel shipment' },
      { status: 500 }
    );
  }
}

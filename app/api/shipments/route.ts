import { NextRequest, NextResponse } from 'next/server';
import { rapidShypService } from '@/lib/rapidshyp';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status') || undefined;

    const shipments = await rapidShypService.getShipments(page, limit, status);

    return NextResponse.json({
      success: true,
      shipments,
    });
  } catch (error) {
    console.error('Error fetching shipments:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch shipments' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const shipment = await rapidShypService.createShipment(body);

    return NextResponse.json({
      success: true,
      shipment,
    });
  } catch (error) {
    console.error('Error creating shipment:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create shipment' },
      { status: 500 }
    );
  }
}

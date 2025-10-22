import { NextRequest, NextResponse } from 'next/server';
import { rapidShypService } from '@/lib/rapidshyp';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pincode = searchParams.get('pincode');

    if (!pincode) {
      return NextResponse.json(
        { success: false, error: 'Pincode is required' },
        { status: 400 }
      );
    }

    const couriers = await rapidShypService.getAvailableCouriers(pincode);

    return NextResponse.json({
      success: true,
      couriers,
    });
  } catch (error) {
    console.error('Error fetching available couriers:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch couriers' },
      { status: 500 }
    );
  }
}


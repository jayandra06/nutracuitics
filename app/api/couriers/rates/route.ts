import { NextRequest, NextResponse } from 'next/server';
import { rapidShypService } from '@/lib/rapidshyp';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { from_pincode, to_pincode, weight, value } = body;

    if (!from_pincode || !to_pincode || !weight || !value) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const rates = await rapidShypService.getCourierRates({
      from_pincode,
      to_pincode,
      weight,
      value,
    });

    return NextResponse.json({
      success: true,
      rates,
    });
  } catch (error) {
    console.error('Error getting courier rates:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get courier rates' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Coupon from '@/models/Coupon';

export async function POST(req: NextRequest) {
  try {
    const { code, orderAmount } = await req.json();

    await dbConnect();

    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
      active: true,
      expiryDate: { $gt: new Date() },
    });

    if (!coupon) {
      return NextResponse.json(
        { error: 'Invalid or expired coupon code' },
        { status: 400 }
      );
    }

    if (orderAmount < coupon.minOrderAmount) {
      return NextResponse.json(
        {
          error: `Minimum order amount of ₹${coupon.minOrderAmount} required for this coupon`,
        },
        { status: 400 }
      );
    }

    if (coupon.usedCount >= coupon.usageLimit) {
      return NextResponse.json(
        { error: 'Coupon usage limit reached' },
        { status: 400 }
      );
    }

    let discountAmount = 0;
    if (coupon.discountType === 'percentage') {
      discountAmount = (orderAmount * coupon.discountValue) / 100;
      if (coupon.maxDiscountAmount) {
        discountAmount = Math.min(discountAmount, coupon.maxDiscountAmount);
      }
    } else {
      discountAmount = coupon.discountValue;
    }

    return NextResponse.json(
      {
        coupon: {
          code: coupon.code,
          discountType: coupon.discountType,
          discountValue: coupon.discountValue,
          discountAmount: Math.round(discountAmount * 100) / 100,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error validating coupon:', error);
    return NextResponse.json(
      { error: 'Failed to validate coupon' },
      { status: 500 }
    );
  }
}


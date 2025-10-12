import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Settings from '@/models/Settings';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create({
        tax: { gstRate: 18, enabled: true },
        shipping: {
          freeShippingThreshold: 500,
          standardShippingCost: 50,
          expressShippingCost: 150,
          enabled: true,
        },
        policies: {},
      });
    }

    return NextResponse.json({ settings }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const updateData = await req.json();

    await dbConnect();

    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create(updateData);
    } else {
      settings = await Settings.findOneAndUpdate({}, updateData, {
        new: true,
        runValidators: true,
      });
    }

    return NextResponse.json({ settings }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}


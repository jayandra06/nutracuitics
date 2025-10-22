import { NextRequest, NextResponse } from 'next/server';
import { rapidShypService } from '@/lib/rapidshyp';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const result = await rapidShypService.schedulePickup(id, body);

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error('Error scheduling pickup:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to schedule pickup' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { rapidShypService } from '@/lib/rapidshyp';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const proof = await rapidShypService.getDeliveryProof(id);

    return NextResponse.json({
      success: true,
      proof,
    });
  } catch (error) {
    console.error('Error getting delivery proof:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get delivery proof' },
      { status: 500 }
    );
  }
}

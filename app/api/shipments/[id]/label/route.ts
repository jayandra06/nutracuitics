import { NextRequest, NextResponse } from 'next/server';
import { rapidShypService } from '@/lib/rapidshyp';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const label = await rapidShypService.generateLabel(id);

    return NextResponse.json({
      success: true,
      label,
    });
  } catch (error) {
    console.error('Error generating label:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate label' },
      { status: 500 }
    );
  }
}

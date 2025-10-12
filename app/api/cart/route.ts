import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Cart from '@/models/Cart';
import Product from '@/models/Product';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    let cart = await Cart.findOne({ user: session.user.id }).populate('items.product');

    if (!cart) {
      cart = await Cart.create({ user: session.user.id, items: [] });
    }

    return NextResponse.json({ cart }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { productId, quantity } = await req.json();

    await dbConnect();

    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    let cart = await Cart.findOne({ user: session.user.id });

    if (!cart) {
      cart = await Cart.create({
        user: session.user.id,
        items: [{ product: productId, quantity, price: product.ourPrice }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item: any) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity, price: product.ourPrice });
      }
    }

    cart.totalAmount = cart.items.reduce(
      (total: number, item: any) => total + item.price * item.quantity,
      0
    );

    await cart.save();

    cart = await Cart.findOne({ user: session.user.id }).populate('items.product');

    return NextResponse.json({ cart }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating cart:', error);
    return NextResponse.json(
      { error: 'Failed to update cart' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('productId');

    await dbConnect();

    const cart = await Cart.findOne({ user: session.user.id });

    if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    cart.items = cart.items.filter(
      (item: any) => item.product.toString() !== productId
    );

    cart.totalAmount = cart.items.reduce(
      (total: number, item: any) => total + item.price * item.quantity,
      0
    );

    await cart.save();

    return NextResponse.json({ cart }, { status: 200 });
  } catch (error: any) {
    console.error('Error removing item from cart:', error);
    return NextResponse.json(
      { error: 'Failed to remove item from cart' },
      { status: 500 }
    );
  }
}


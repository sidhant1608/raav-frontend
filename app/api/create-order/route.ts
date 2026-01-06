import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'

export async function POST(request: NextRequest) {
  try {
    // Initialize Razorpay only when the route is called (not during build)
    const keyId = process.env.RAZORPAY_KEY_ID
    const keySecret = process.env.RAZORPAY_KEY_SECRET

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: 'Razorpay credentials not configured' },
        { status: 500 }
      )
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    })

    const body = await request.json()
    const { amount, items, shippingInfo } = body

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
    }

    // Generate a unique order ID
    const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: amount, // Amount in paise
      currency: 'INR',
      receipt: orderId,
      notes: {
        orderId,
        items: JSON.stringify(items),
        shippingInfo: JSON.stringify(shippingInfo),
      },
    })

    // In a real application, you would save the order to a database here
    // For now, we'll just return the Razorpay order details

    return NextResponse.json({
      orderId,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
    })
  } catch (error: any) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create order' },
      { status: 500 }
    )
  }
}


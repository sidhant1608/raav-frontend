import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, orderId } = body

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return NextResponse.json({ error: 'Missing payment details' }, { status: 400 })
    }

    // Verify the payment signature
    const text = `${razorpayOrderId}|${razorpayPaymentId}`
    const secret = process.env.RAZORPAY_KEY_SECRET || ''
    const generatedSignature = crypto
      .createHmac('sha256', secret)
      .update(text)
      .digest('hex')

    const isValid = generatedSignature === razorpaySignature

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 })
    }

    // In a real application, you would:
    // 1. Update the order status in your database
    // 2. Send confirmation email to the customer
    // 3. Update inventory
    // 4. Create shipping label, etc.

    // For now, we'll just return success
    return NextResponse.json({
      success: true,
      orderId,
      paymentId: razorpayPaymentId,
    })
  } catch (error: any) {
    console.error('Error verifying payment:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to verify payment' },
      { status: 500 }
    )
  }
}


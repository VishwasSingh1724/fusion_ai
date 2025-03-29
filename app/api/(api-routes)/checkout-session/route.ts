import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req: Request) {
  const { name, price, clerkId } = await req.json();
  
  try {
    // Create Stripe checkout session with INR currency
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "inr",  // Change to INR
            product_data: { name },
            unit_amount: price * 100, // Convert price to paise (100 paise = 1 INR)
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3000/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/dashboard`,
      metadata: { clerkId, amount: price },
      // Add required fields for Indian payments (like address)
      payment_intent_data: {
        capture_method: 'automatic',
      },
      shipping_address_collection: {
        allowed_countries: ['IN'], // Only allow addresses in India
      },
      phone_number_collection: {
        enabled: true, // Enable phone number collection
      },
    });

    return NextResponse.json({ url: session?.url });
  } catch (err) {
    console.error('Error creating Stripe checkout session:', err);
    return NextResponse.json({ err}, { status: 500 });
  }
}


// import { NextResponse } from "next/server";
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// export async function POST(req: Request) {
//   const { name, price, clerkId } = await req.json();
//   try {
//     const session = await stripe.checkout.sessions.create({
//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             product_data: { name },
//             unit_amount: price * 100, // Convert dollars to cents
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       success_url: http://localhost:3000/payment-success?session_id={CHECKOUT_SESSION_ID},
//       cancel_url: http://localhost:3000/dashboard,
//       metadata: { clerkId, amount: price }, // Attach user info
//     });
//     return NextResponse.json({ url: session?.url });
//   } catch (err) {
//     return NextResponse.json({ error: err }, { status: 500 });
//   }
// }
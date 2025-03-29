'use client';

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function processPayment() {
      if (!sessionId) return;

      try {
        // Fetch session details from Stripe
        const res = await fetch(`/api/fetch-session?session_id=${sessionId}`);
        const session = await res.json();

        if (!session || session.error) {
          setError(true);
          return;
        }

        // Update user credits in the database
        const updateRes = await fetch(`/api/update-credits`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            clerkId: session.metadata.clerkId,
            amount: session.metadata.amount,
          }),
        });

        if (!updateRes.ok) throw new Error("Failed to update credits");

        setLoading(false);
      } catch {
        setError(true);
      }
    }

    processPayment();
  }, [sessionId]);

  if (loading) return <div>Processing your payment...</div>;
  if (error) return <div>There was an error processing your payment.</div>;

  return <div className="py-24 px-80">Payment successful! Credits have been added to your account.</div>;
}

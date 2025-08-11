"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const faqs = [
  { q: "How do I get paid?", a: "Payouts via Stripe or PayPal after approval." },
  { q: "What if views drop?", a: "You earn only for valid views." },
];

export default function Faqs() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-20">
      <h2 className="text-3xl font-semibold text-center mb-12">FAQs</h2>
      <div className="max-w-2xl mx-auto space-y-4 px-6">
        {faqs.map((f, i) => (
          <div key={i} className="border-b">
            <button
              className="w-full text-left py-4 flex justify-between items-center"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="font-medium">{f.q}</span>
              <span>{open === i ? "-" : "+"}</span>
            </button>
            {open === i && (
              <motion.p
                className="pb-4 text-gray-600"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {f.a}
              </motion.p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

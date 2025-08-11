import React from "react";

const features = [
  { title: "Real Campaigns", desc: "Work with top brands." },
  { title: "Transparent Tracking", desc: "Live view counts, no bots." },
  { title: "Fast Payouts", desc: "Get paid swiftly after approval." },
];

export default function Features() {
  return (
    <section className="py-20">
      <h2 className="text-3xl font-semibold text-center mb-12">Features</h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 px-6">
        {features.map((f, i) => (
          <div key={i} className="p-6 bg-white rounded-2xl shadow-md text-center">
            <h3 className="text-xl font-medium mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

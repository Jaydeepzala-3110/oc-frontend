import React from "react";

const testimonials = [
  { name: "Alex P.", quote: "Earned $500 in one week!" },
  { name: "Jamie L.", quote: "Easy to use and reliable." },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-indigo-50">
      <h2 className="text-3xl font-semibold text-center mb-12">What Creators Say</h2>
      <div className="max-w-3xl mx-auto space-y-8 px-6">
        {testimonials.map((t, i) => (
          <blockquote key={i} className="p-6 bg-white rounded-2xl shadow">
            <p className="italic mb-4">“{t.quote}”</p>
            <footer className="text-right font-medium">— {t.name}</footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

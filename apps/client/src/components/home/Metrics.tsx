"use client";

import { CheckCircle2, AlertCircle } from "lucide-react";

const metricsData = [
  {
    reel: "Summer Campaign #1",
    platform: "Instagram",
    views: "1.2M",
    earnings: "$600.00",
    logoDetected: true,
    status: "Verified",
  },
  {
    reel: "Tech Review Short",
    platform: "TikTok",
    views: "850K",
    earnings: "$425.00",
    logoDetected: true,
    status: "Verified",
  },
  {
    reel: "Fitness Challenge",
    platform: "Instagram",
    views: "45K",
    earnings: "$0.00",
    logoDetected: false,
    status: "Pending",
  },
  {
    reel: "Gaming Highlight",
    platform: "YouTube Shorts",
    views: "2.5M",
    earnings: "$1,250.00",
    logoDetected: true,
    status: "Verified",
  },
];

export default function Metrics() {
  return (
    <section id="metrics" className="py-24 bg-gray-50/50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Real-Time Performance</h2>
          <p className="text-gray-500 max-w-2xl">
            Track every view, verify every logo, and watch your earnings grow in real-time.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-medium text-gray-900">Reel Name</th>
                  <th className="px-6 py-4 font-medium text-gray-900">Platform</th>
                  <th className="px-6 py-4 font-medium text-gray-900">Verified Views</th>
                  <th className="px-6 py-4 font-medium text-gray-900">Earnings</th>
                  <th className="px-6 py-4 font-medium text-gray-900">Logo Detected</th>
                  <th className="px-6 py-4 font-medium text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {metricsData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{row.reel}</td>
                    <td className="px-6 py-4 text-gray-500">{row.platform}</td>
                    <td className="px-6 py-4 text-gray-900 font-mono">{row.views}</td>
                    <td className="px-6 py-4 text-green-600 font-mono font-medium">
                      {row.earnings}
                    </td>
                    <td className="px-6 py-4">
                      {row.logoDetected ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                          <CheckCircle2 size={12} />
                          Detected
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700">
                          <AlertCircle size={12} />
                          Missing
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          row.status === "Verified"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-gray-50 text-gray-500"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

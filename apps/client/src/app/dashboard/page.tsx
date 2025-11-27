"use client";

import { Eye, Video, DollarSign } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import {
  BarChartComponent,
  PieChartComponent,
  DonutChartComponent,
} from "@/components/dashboard/Charts";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome back! 👋
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your content today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Total Views"
          value="1.2M"
          icon={Eye}
          trend={{ value: "+12.5%", isPositive: true }}
          gradient="primary"
        />
        <StatsCard
          title="Total Reels"
          value="342"
          icon={Video}
          trend={{ value: "+8.2%", isPositive: true }}
          gradient="secondary"
        />
        <StatsCard
          title="Total Earnings"
          value="$24,580"
          icon={DollarSign}
          trend={{ value: "+23.1%", isPositive: true }}
          gradient="accent"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <BarChartComponent />
        <PieChartComponent />
      </div>

      {/* Donut Chart - Full Width */}
      <div className="grid gap-6 lg:grid-cols-1">
        <DonutChartComponent />
      </div>
    </div>
  );
}


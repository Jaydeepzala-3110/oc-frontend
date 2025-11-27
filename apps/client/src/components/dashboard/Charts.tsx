"use client";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = {
  primary: "#6366f1",
  secondary: "#14b8a6",
  accent: "#a855f7",
  muted: "#64748b",
};

// Sample data
const barChartData = [
  { name: "Mon", views: 4000, engagement: 2400 },
  { name: "Tue", views: 3000, engagement: 1398 },
  { name: "Wed", views: 2000, engagement: 9800 },
  { name: "Thu", views: 2780, engagement: 3908 },
  { name: "Fri", views: 1890, engagement: 4800 },
  { name: "Sat", views: 2390, engagement: 3800 },
  { name: "Sun", views: 3490, engagement: 4300 },
];

const pieChartData = [
  { name: "Instagram", value: 400, color: COLORS.primary },
  { name: "TikTok", value: 300, color: COLORS.secondary },
  { name: "YouTube", value: 200, color: COLORS.accent },
  { name: "Other", value: 100, color: COLORS.muted },
];

const donutChartData = [
  { name: "Completed", value: 65, color: COLORS.secondary },
  { name: "In Progress", value: 25, color: COLORS.primary },
  { name: "Pending", value: 10, color: COLORS.muted },
];

export function BarChartComponent() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Weekly Performance</h3>
        <p className="text-sm text-muted-foreground">Views and engagement over the week</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={barChartData}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="name"
            className="text-xs text-muted-foreground"
            tick={{ fill: "currentColor" }}
          />
          <YAxis
            className="text-xs text-muted-foreground"
            tick={{ fill: "currentColor" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "0.5rem",
            }}
            labelStyle={{ color: "hsl(var(--foreground))" }}
          />
          <Legend />
          <Bar
            dataKey="views"
            fill={COLORS.primary}
            radius={[8, 8, 0, 0]}
            name="Views"
          />
          <Bar
            dataKey="engagement"
            fill={COLORS.secondary}
            radius={[8, 8, 0, 0]}
            name="Engagement"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function PieChartComponent() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Platform Distribution</h3>
        <p className="text-sm text-muted-foreground">Content views by platform</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieChartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "0.5rem",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 flex flex-wrap gap-4 justify-center">
        {pieChartData.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-muted-foreground">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DonutChartComponent() {
  const total = donutChartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Campaign Status</h3>
        <p className="text-sm text-muted-foreground">Distribution of active campaigns</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={donutChartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            {donutChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "0.5rem",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 flex flex-col gap-2">
        {donutChartData.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-foreground">{item.name}</span>
            </div>
            <span className="text-sm font-medium text-foreground">
              {item.value}% ({((item.value / total) * 100).toFixed(1)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}


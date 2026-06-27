"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart as PieChartIcon, Zap, Clock, Target, Box } from "lucide-react";
import { ProductionYieldChart } from "@/components/dashboard/ProductionYieldChart";
import { DowntimeAnalysis } from "@/components/dashboard/DowntimeAnalysis";
import { MTBFMatrix } from "@/components/dashboard/MTBFMatrix";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const summaryCards = [
  {
    title: "Total Output (Month)",
    value: "124,500 units",
    icon: Box,
    color: "text-primary",
  },
  {
    title: "Avg Yield",
    value: "96.4%",
    icon: Target,
    color: "text-accent",
  },
  {
    title: "Total Downtime",
    value: "42.5 hrs",
    icon: Clock,
    color: "text-warning",
  },
  {
    title: "Energy/Unit",
    value: "1.2 kWh",
    icon: Zap,
    color: "text-destructive",
  },
];

export default function StatisticsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-headline tracking-wider text-primary flex items-center gap-3 uppercase">
            <PieChartIcon className="h-8 w-8" />
            Factory Statistics
          </h1>
          <p className="text-muted-foreground font-mono mt-1 tracking-widest text-sm uppercase">
            // MODULE_STATISTICS_v1.0
          </p>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryCards.map((card, idx) => (
            <motion.div key={idx} variants={itemVariants} className="h-full">
              <Card className="cyber-panel h-full">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-headline tracking-widest text-muted-foreground uppercase">
                    {card.title}
                  </CardTitle>
                  <card.icon className={`h-4 w-4 ${card.color}`} />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-mono ${card.color}`}>{card.value}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div variants={itemVariants}>
            <ProductionYieldChart />
          </motion.div>
          <motion.div variants={itemVariants}>
            <DowntimeAnalysis />
          </motion.div>
        </div>

        {/* Matrix Row */}
        <motion.div variants={itemVariants}>
          <MTBFMatrix />
        </motion.div>
      </motion.div>
    </div>
  );
}

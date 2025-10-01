import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

interface DashboardCardProps {
  title: string;
  value: string | number | React.ReactNode;
  description: string;
  valueColor: string;
  descriptionColor?: string;
  icon?: React.ReactNode;
}

export default function DashboardCard({
  title,
  value,
  description,
  valueColor,
  descriptionColor = "text-muted-foreground",
  icon,
}: DashboardCardProps) {
  return (
    <Card className="p-4 sm:p-6 border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-2 px-0 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg sm:text-xl text-gray-700 font-medium">
          {title}
        </CardTitle>
        
        {icon}
      </CardHeader>
      <CardContent className="px-0">
        <p className={cn(
            
            `text-2xl sm:text-3xl lg:text-4xl font-bold mb-1`,
            valueColor
        )}>
          {value}
        </p>
        <p className={`text-xs sm:text-sm ${descriptionColor} leading-relaxed`}>
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
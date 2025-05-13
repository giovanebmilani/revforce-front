"use client";

import * as React from "react";
import { subDays, subMonths, subYears } from "date-fns";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PresetOption =
  | "5_days"
  | "1_month"
  | "3_months"
  | "6_months"
  | "1_year"
  | "2_years"
  | "5_years";

const presets: Record<PresetOption, string> = {
  "5_days": "Últimos 5 dias",
  "1_month": "Último mês",
  "3_months": "Últimos 3 meses",
  "6_months": "Últimos 6 meses",
  "1_year": "Último ano",
  "2_years": "Últimos 2 anos",
  "5_years": "Últimos 5 anos",
};

interface DateRangePresetsProps {
  onChange: (range: { from: Date; to: Date }) => void;
}

export function DateRangePresets({ onChange }: DateRangePresetsProps) {
  const [selectedValue, setSelectedValue] = React.useState<string | undefined>(
    undefined
  );

  const handleSelect = (value: PresetOption) => {
    const to = new Date();
    let from: Date;

    switch (value) {
      case "5_days":
        from = subDays(to, 5);
        break;
      case "1_month":
        from = subMonths(to, 1);
        break;
      case "3_months":
        from = subMonths(to, 3);
        break;
      case "6_months":
        from = subMonths(to, 6);
        break;
      case "1_year":
        from = subYears(to, 1);
        break;
      case "2_years":
        from = subYears(to, 2);
        break;
      case "5_years":
        from = subYears(to, 5);
        break;
      default:
        from = subMonths(to, 1);
    }

    setSelectedValue(value);
    onChange({ from, to });
  };

  return (
    <Select onValueChange={handleSelect} value={selectedValue}>
      <SelectTrigger className="w-[300px]">
        <SelectValue placeholder="Selecionar período" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(presets).map(([value, label]) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

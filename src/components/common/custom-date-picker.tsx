"use client";

import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  date?: Date;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  isPreDisable?: boolean;
}

export default function CustomDatePicker({
  date,
  onChange,
  placeholder,
  className,
  isPreDisable = true,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[240px] flex justify-start pl-3 text-left font-normal",

            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
          {date ? format(date, "EEE, dd MMM yyyy") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onChange}
          captionLayout="dropdown"
          disabled={(date) =>
            isPreDisable
              ? date < new Date(new Date().setHours(0, 0, 0, 0))
              : false
          }
        />
      </PopoverContent>
    </Popover>
  );
}

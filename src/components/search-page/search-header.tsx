"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { airportOptions } from "@/components/common/search-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Search, Users } from "lucide-react";
import { searchFlights, setSearchParams } from "@/store/features/searchSlice";
import CustomDatePicker from "@/components/common/custom-date-picker";

type Props = {
  onSearchComplete?: () => void;
};

export default function SearchHeader({ onSearchComplete }: Props) {
  const dispatch = useAppDispatch();
  const { searchParams } = useAppSelector((state) => state.search);

  const [searchDates, setSearchDates] = useState<{
    departure: Date | undefined;
    return?: Date | undefined;
  }>({
    departure: searchParams?.departureDate || new Date(),
    return: searchParams?.returnDate || undefined,
  });

  const [fromTo, setFromTo] = useState({
    from: searchParams?.origin || "",
    to: searchParams?.destination || "",
  });

  const passengerCount = searchParams?.passenger || {
    adult: 1,
    children: 0,
    infant: 0,
  };

  const totalPassengers =
    Number(passengerCount.adult || 0) +
    Number(passengerCount.children || 0) +
    Number(passengerCount.infant || 0);

  const handleSearch = () => {
    const params = {
      origin: fromTo.from,
      destination: fromTo.to,
      departureDate: searchDates.departure!,
      passenger: passengerCount,
    };

    dispatch(setSearchParams(params));
    dispatch(searchFlights(params));

    onSearchComplete?.();
  };

  return (
    <motion.div
      className="bg-white shadow-sm border-b"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
        >
          {/* From - To Fields */}
          <motion.div
            className="md:col-span-2 relative"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <div className="grid grid-cols-2 gap-2 relative">
              <div>
                <label className="block text-sm font-medium mb-2">From</label>
                <Select
                  value={fromTo.from}
                  onValueChange={(value) =>
                    setFromTo((prev) => ({ ...prev, from: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="From" />
                  </SelectTrigger>
                  <SelectContent>
                    {airportOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">To</label>
                <Select
                  value={fromTo.to}
                  onValueChange={(value) =>
                    setFromTo((prev) => ({ ...prev, to: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="To" />
                  </SelectTrigger>
                  <SelectContent>
                    {airportOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Swap Button */}
              <motion.button
                className="absolute top-8 left-[47%] transform -translate-x-[47%] w-8 h-8 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow z-10"
                whileTap={{ rotate: 180 }}
                onClick={() =>
                  setFromTo((prev) => ({ from: prev.to, to: prev.from }))
                }
              >
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
              </motion.button>
            </div>
          </motion.div>

          {/* Date Picker */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <label className="block text-sm font-medium mb-2">Departing</label>
            <CustomDatePicker
              className="w-full"
              date={searchDates.departure}
              onChange={(date) =>
                setSearchDates((prev) => ({ ...prev, departure: date }))
              }
              placeholder="Select Date"
            />
          </motion.div>

          {/* Passenger Count */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <label className="block text-sm font-medium mb-2">Travelers</label>
            <div className="relative">
              <Users className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input readOnly value={totalPassengers} className="pl-10" />
            </div>
          </motion.div>

          {/* Search Button */}
          <motion.div
            className="mt-auto"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-700 text-white w-full"
              >
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { convertToIFlight } from "@/lib/convertToIFlight";

interface FiltersSidebarProps {
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  selectedAirlines: string[];
  setSelectedAirlines: React.Dispatch<React.SetStateAction<string[]>>;
  selectedDurations: string[];
  setSelectedDurations: React.Dispatch<React.SetStateAction<string[]>>;
}

const FiltersSidebar = ({
  priceRange,
  setPriceRange,
  selectedAirlines,
  setSelectedAirlines,
  selectedDurations,
  setSelectedDurations,
}: FiltersSidebarProps) => {
  const { flights } = useAppSelector((state) => state.search);

  const flightsData = convertToIFlight(flights);
  const [expandedSections, setExpandedSections] = useState({
    airlines: true,
    price: true,
    duration: true,
    baggage: true,
  });

  const toggle = <T extends string>(
    setter: React.Dispatch<React.SetStateAction<T[]>>,
    value: T
  ) => {
    setter((prev: T[]) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const toggleSection = (key: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const uniqueAirlines = Array.from(
    new Set(flightsData?.map((flight) => flight?.airline_name))
  );

  return (
    <motion.div
      className="lg:col-span-1"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Filter By</h3>
            <Button
              onClick={() => {
                setPriceRange([175, 475]);
                setSelectedAirlines([]);
                setSelectedDurations([]);
              }}
              variant="link"
              className="text-blue-600 p-0"
            >
              Reset
            </Button>
          </div>

          <div className="mb-6">
            <div className="flex justify-between mb-3">
              <h4 className="font-medium">Airlines</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleSection("airlines")}
              >
                {expandedSections.airlines ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </Button>
            </div>
            <AnimatePresence>
              {expandedSections.airlines && (
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {uniqueAirlines?.map((airline_name, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between"
                    >
                      <label className="flex items-center">
                        <Checkbox
                          checked={selectedAirlines.includes(airline_name)}
                          onCheckedChange={() =>
                            toggle(setSelectedAirlines, airline_name)
                          }
                          className="mr-2"
                        />
                        {airline_name}
                      </label>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mb-6">
            <div className="flex justify-between mb-3">
              <h4 className="font-medium">Price</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleSection("price")}
              >
                {expandedSections.price ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </Button>
            </div>
            <AnimatePresence>
              {expandedSections.price && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={100000}
                    min={200}
                    step={50}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mb-6">
            <div className="flex justify-between mb-3">
              <h4 className="font-medium">Duration</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleSection("duration")}
              >
                {expandedSections.duration ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </Button>
            </div>
            <AnimatePresence>
              {expandedSections.duration && (
                <motion.div
                  className="space-y-2 text-sm text-gray-600"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {["0-6", "6-12", "12+"].map((range, i) => (
                    <label key={i} className="flex items-center">
                      <Checkbox
                        checked={selectedDurations.includes(range)}
                        onCheckedChange={() =>
                          toggle(setSelectedDurations, range)
                        }
                        className="mr-2"
                      />
                      {range === "0-6" && "Up to 6 hours"}
                      {range === "6-12" && "6–12 hours"}
                      {range === "12+" && "12+ hours"}
                    </label>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FiltersSidebar;

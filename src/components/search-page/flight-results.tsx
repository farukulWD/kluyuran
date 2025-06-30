"use client";

import { useMemo } from "react";
import { List, AutoSizer } from "react-virtualized";
import { motion } from "framer-motion";
import { AnimatedFlightCard } from "@/components/animations/flight-card";
import { Flight } from "@/lib/convertToIFlight";
import { Button } from "../ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface FlightResultsProps {
  flights: Flight[];
  onBook: (flight: Flight) => void;
  filters: {
    priceRange: number[];
    selectedAirlines: string[];
    selectedDurations: string[];
  };
}

export default function FlightResults({
  flights,
  onBook,
  filters,
}: FlightResultsProps) {
  const isMobile = useIsMobile();

  const filteredFlights = useMemo(() => {
    return flights.filter((flight) => {
      const matchesAirline =
        filters.selectedAirlines.length === 0 ||
        filters.selectedAirlines.includes(flight.airline_name);

      const matchesDuration =
        filters.selectedDurations.length === 0 ||
        filters.selectedDurations.some((range) => {
          if (range === "0-6") return Number(flight.duration) <= 360;
          if (range === "6-12")
            return (
              Number(flight.duration) > 360 && Number(flight.duration) <= 720
            );
          if (range === "12+") return Number(flight.duration) > 720;
        });

      const matchesPrice =
        flight.price >= filters.priceRange[0] &&
        flight.price <= filters.priceRange[1];
      console.log(flight.price, filters.priceRange);

      return matchesAirline && matchesPrice && matchesDuration;
    });
  }, [
    flights,
    filters.priceRange,
    filters.selectedAirlines,
    filters.selectedDurations,
  ]);
  console.log(filteredFlights, filters.priceRange);
  return (
    <motion.div
      className="lg:col-span-3"
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <motion.div
        className="flex items-center justify-between mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-lg font-semibold">
          {filteredFlights.length} Result
          {filteredFlights.length !== 1 ? "s" : ""}
        </h2>
        <div className="hidden md:flex items-center space-x-4">
          {[
            { label: "Recommended", active: true },
            { label: "Fastest", active: false },
            { label: "Cheapest", active: false },
          ].map((filter, index) => (
            <motion.div
              key={filter.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <Button
                className={
                  filter.active
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : ""
                }
                variant={filter.active ? "default" : "outline"}
              >
                {filter.label}
                <div className="text-xs">$500 • 10h 20m</div>
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div style={{ height: "600px" }}>
        <AutoSizer>
          {({ height, width }) => (
            <List
              width={width}
              height={height}
              rowHeight={isMobile ? 350 : 180}
              rowCount={filteredFlights.length}
              rowRenderer={({ index, key, style }) => {
                const flight = filteredFlights[index];
                return (
                  <div key={key} style={style}>
                    <AnimatedFlightCard
                      flight={flight}
                      onBook={onBook}
                      index={index}
                    />
                  </div>
                );
              }}
            />
          )}
        </AutoSizer>
      </div>
    </motion.div>
  );
}

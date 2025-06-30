"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Flight } from "@/lib/convertToIFlight";

interface FlightCardProps {
  flight: Flight;
  onBook: (flight: Flight) => void;
  index?: number;
}

export const AnimatedFlightCard = ({ flight, onBook }: FlightCardProps) => {
  return (
    <motion.div whileHover={{ y: -5 }} className="w-full">
      <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 rounded-xl">
        <CardContent className="p-6 flex flex-col md:flex-row  items-center md:justify-between gap-4 flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-4 w-52 min-w-max">
            <div className="w-10 h-10 relative">
              <Image
                src={flight.airline_logo}
                alt="airline-logo"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div>
              <p className="font-semibold">{flight.airline_name}</p>
              <span className="text-xs text-green-700 border border-green-300 px-2 py-0.5 rounded-full">
                {flight.refundable ? "Partially Refundable" : "Non-refundable"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-8 text-center">
            <div>
              <p className="text-xl font-semibold">{flight.departure.time}</p>
              <p className="text-sm text-gray-600">
                {flight.departure.airport}
              </p>
            </div>

            <div className="flex flex-col items-center text-xs text-gray-500">
              <span>{flight.duration}</span>
              <div className="flex items-center my-1">
                <div className="w-8 h-px bg-gray-400"></div>
                <span className="mx-2">✈️</span>
                <div className="w-8 h-px bg-gray-400"></div>
              </div>
              <span>{flight.stops}</span>
            </div>

            <div>
              <p className="text-xl font-semibold">{flight.arrival.time}</p>
              <p className="text-sm text-gray-600">{flight.arrival.airport}</p>
            </div>
          </div>

          <div className="text-center mx-auto md:ml-auto  min-w-max">
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">
              Cheapest
            </span>
            <p className="text-lg font-bold text-blue-700">
              {flight.salecurrencycode === "BDT" ? "BDT" : "$"} {flight.price}
            </p>
            <p className="text-sm text-gray-600">{flight.class}</p>
            <div className="flex items-center justify-end gap-2 mt-2">
              <Button
                className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2"
                onClick={() => onBook(flight)}
              >
                Book Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

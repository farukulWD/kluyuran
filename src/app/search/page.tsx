"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

import { PageTransition } from "@/components/animations/page-transition";
import { SearchingAnimation } from "@/components/animations/loading-spinner";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { initializeBooking } from "@/store/features/bookingSlice";
import { convertToIFlight, Flight } from "@/lib/convertToIFlight";
import SearchHeader from "../../components/search-page/search-header";

import FiltersSidebar from "@/components/search-page/filters-sidebar";
import FlightResults from "@/components/search-page/flight-results";

export default function SearchPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { flights, isLoading, searchParams } = useAppSelector(
    (state) => state.search
  );

  const flightsData = convertToIFlight(flights);

  // const { isAuthenticated } = useAppSelector((state) => state.auth);

  const [priceRange, setPriceRange] = useState([200, 100000]);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);

  const passengerCount = searchParams?.passenger || {
    adult: 1,
    children: 0,
    infant: 0,
  };

  const handleBookFlight = (flight: Flight) => {
    // if (!isAuthenticated) {
    //   router.push(`/auth/signin?returnUrl=/book?flightId=${flight.id}`);
    //   return;
    // }

    dispatch(initializeBooking({ flight, passengerCount }));
    router.push("/book");
  };

  return (
    <PageTransition className=" bg-gray-100">
      <SearchHeader />

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <FiltersSidebar
            priceRange={priceRange}
            selectedAirlines={selectedAirlines}
            selectedDurations={selectedDurations}
            setPriceRange={setPriceRange}
            setSelectedAirlines={setSelectedAirlines}
            setSelectedDurations={setSelectedDurations}
          />

          {isLoading ? (
            <div className="flex justify-center items-center">
              <SearchingAnimation />
            </div>
          ) : (
            <motion.div
              className="lg:col-span-3"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <FlightResults
                filters={{
                  priceRange,

                  selectedAirlines,
                  selectedDurations,
                }}
                flights={flightsData}
                onBook={handleBookFlight}
              />
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}

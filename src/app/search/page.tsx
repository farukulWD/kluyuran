/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO:Fix type here
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

import { ChevronDown, ChevronUp, Search, Users } from "lucide-react";
import { PageTransition } from "@/components/animations/page-transition";
import { SearchingAnimation } from "@/components/animations/loading-spinner";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { AnimatedFlightCard } from "@/components/animations/flight-card";
import { initializeBooking } from "@/store/features/bookingSlice";
import CustomDatePicker from "@/components/common/custom-date-picker";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { airportOptions } from "@/components/common/search-form";
import { searchFlights, setSearchParams } from "@/store/features/searchSlice";
import { convertToIFlight, Flight } from "@/lib/convertToIFlight";

export default function SearchPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { flights, isLoading, searchParams } = useAppSelector(
    (state) => state.search
  );
  const flightsData = convertToIFlight(flights);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [priceRange, setPriceRange] = useState([175, 475]);
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

  const [expandedSections, setExpandedSections] = useState({
    airlines: true,
    price: true,
    duration: true,
    baggage: true,
    airports: true,
  });

  type SectionKey = keyof typeof expandedSections;

  const filterSections: {
    title: string;
    key: SectionKey;
    expandable?: boolean;
    content: JSX.Element | false;
  }[] = [
    {
      title: "Airlines",
      key: "airlines",
      expandable: true,
      content: expandedSections.airlines && (
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          {[
            { name: "Singapore Airlines", price: "$110" },
            { name: "Qatar Airways", price: "$324" },
            { name: "Emirates", price: "$349" },
            { name: "ANA All Nippon", price: "$110" },
            { name: "Cathay Pacific", price: "$324" },
            { name: "Air France", price: "$349" },
          ].map((airline, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-between"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <label className="flex items-center">
                <Checkbox className="mr-2" />
                {airline.name}
              </label>
              <span className="text-sm">{airline.price}</span>
            </motion.div>
          ))}
        </motion.div>
      ),
    },
    {
      title: "Price",
      key: "price",
      expandable: true,
      content: expandedSections.price && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={500}
            min={100}
            step={25}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </motion.div>
      ),
    },
    {
      title: "Duration",
      key: "duration",
      expandable: true,
      content: expandedSections.duration && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-2 text-sm text-gray-600"
        >
          <label className="flex items-center">
            <Checkbox className="mr-2" />
            Up to 6 hours
          </label>
          <label className="flex items-center">
            <Checkbox className="mr-2" />
            6–12 hours
          </label>
          <label className="flex items-center">
            <Checkbox className="mr-2" />
            12+ hours
          </label>
        </motion.div>
      ),
    },
    {
      title: "Baggage",
      key: "baggage",
      expandable: true,
      content: expandedSections.baggage && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-2 text-sm text-gray-600"
        >
          <label className="flex items-center">
            <Checkbox className="mr-2" />
            Cabin Bag Only
          </label>
          <label className="flex items-center">
            <Checkbox className="mr-2" />
            Checked Baggage Included
          </label>
        </motion.div>
      ),
    },
    {
      title: "Airports",
      key: "airports",
      expandable: true,
      content: expandedSections.airports && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-2 text-sm text-gray-600"
        >
          <label className="flex items-center">
            <Checkbox className="mr-2" />
            Dhaka (DAC)
          </label>
          <label className="flex items-center">
            <Checkbox className="mr-2" />
            Chattogram (CGP)
          </label>
          <label className="flex items-center">
            <Checkbox className="mr-2" />
            Sylhet (ZYL)
          </label>
        </motion.div>
      ),
    },
  ];

  const toggleSection = (section: SectionKey) => {
    setExpandedSections((prev) => {
      const preValue = prev[section];
      return {
        ...prev,
        [section]: !preValue,
      };
    });
  };
  const passengerCount = searchParams?.passenger || {
    adult: 1,
    children: 0,
    infant: 0,
  };
  const totalPassengers =
    Number(passengerCount.adult || 0) +
    Number(passengerCount.children || 0) +
    Number(passengerCount.infant || 0);
  const handleBookFlight = (flight: Flight) => {
    if (!isAuthenticated) {
      router.push(`/auth/signin?returnUrl=/book?flightId=${flight.id}`);
      return;
    }

    dispatch(initializeBooking({ flight, passengerCount }));
    router.push("/book");
  };
  const handleSearch = () => {
    const MakSearchParams = {
      origin: searchParams?.origin || fromTo.from,
      destination: searchParams?.destination || fromTo.to,
      departureDate:
        searchParams?.departureDate || (searchDates.departure as Date),
      passenger: {
        adult: searchParams?.passenger.adult || 1,
        children: searchParams?.passenger.children || 0,
        infant: searchParams?.passenger.infant || 0,
      },
    };

    dispatch(setSearchParams(MakSearchParams));
    dispatch(searchFlights(MakSearchParams));
  };

  useEffect(() => {
    handleSearch();
  }, []);

  if (isLoading) {
    return (
      <PageTransition className="min-h-screen bg-gray-50 flex items-center justify-center">
        <SearchingAnimation />
      </PageTransition>
    );
  }

  return (
    <PageTransition className="min-h-screen bg-gray-50">
      {/* Search Header */}
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
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
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
                  <div className="relative">
                    {/* <MapPin className="absolute right-3 top-3 w-4 h-4 text-gray-400" /> */}
                    <Select
                      onValueChange={(value) =>
                        setFromTo((prev) => ({ ...prev, from: value }))
                      }
                      value={fromTo.from}
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
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">To</label>
                  <div className="relative">
                    {/* <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" /> */}
                    <Select
                      onValueChange={(value) =>
                        setFromTo((prev) => ({ ...prev, to: value }))
                      }
                      value={fromTo.to}
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
                </div>
                {/* Toggle Button */}
                <motion.button
                  className="absolute top-8 left-[47%] transform -translate-x-[47%] w-8 h-8 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow z-10"
                  whileHover={{ scale: 1 }}
                  whileTap={{ scale: 1, rotate: 180 }}
                  onClick={() => {
                    setFromTo((prev) => ({
                      from: prev.to,
                      to: prev.from,
                    }));
                  }}
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

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <label className="block text-sm font-medium mb-2">
                Departing - Returning
              </label>
              <CustomDatePicker
                date={searchDates.departure || undefined}
                onChange={(date) =>
                  setSearchDates((pre) => {
                    return {
                      ...pre,
                      departure: date,
                    };
                  })
                }
                placeholder="Departing - Returning"
              />
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <label className="block text-sm font-medium mb-2">
                Travelers
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  readOnly
                  type="text"
                  value={totalPassengers || 1}
                  placeholder="Travelers"
                  className="pl-10"
                  disabled
                />
              </div>
            </motion.div>

            <motion.div
              className="mt-auto"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
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

          <motion.div
            className="flex items-center justify-between mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center space-x-6">
              {["Round-Trip", "One-Way", "Multi-City"].map((type, index) => (
                <motion.label
                  key={type}
                  className="flex items-center cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <input
                    type="radio"
                    name="trip"
                    className="mr-2"
                    defaultChecked={type === "One-Way"}
                  />
                  {type}
                </motion.label>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              {["Economy", "Business Class", "First Class"].map(
                (classType, index) => (
                  <motion.div
                    key={classType}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <Button
                      variant={
                        classType === "Business Class" ? "default" : "outline"
                      }
                      size="sm"
                      className={
                        classType === "Business Class"
                          ? "bg-blue-600 hover:bg-blue-700"
                          : ""
                      }
                    >
                      {classType}
                    </Button>
                  </motion.div>
                )
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* <SearchForm /> */}

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
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
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="link" className="text-blue-600 p-0">
                      Reset
                    </Button>
                  </motion.div>
                </div>

                {/* Filter Sections */}
                {filterSections?.map((section, index) => (
                  <motion.div
                    key={section.key}
                    className="mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{section.title}</h4>
                      {section.expandable && (
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleSection(section.key)}
                          >
                            {expandedSections[
                              section.key as keyof typeof expandedSections
                            ] ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </Button>
                        </motion.div>
                      )}
                    </div>
                    <AnimatePresence>{section.content}</AnimatePresence>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Results Section */}
          <motion.div
            className="lg:col-span-3"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Results Header */}
            <motion.div
              className="flex items-center justify-between mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-lg font-semibold">
                {flights.length} of 100 Result
              </h2>
              <div className="flex items-center space-x-4">
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

            {/* Flight Results */}
            <div className="space-y-4">
              <AnimatePresence>
                {flightsData?.map((flight, index) => (
                  <AnimatedFlightCard
                    key={index}
                    flight={flight}
                    onBook={handleBookFlight}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}

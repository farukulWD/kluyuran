/* eslint-disable @typescript-eslint/no-explicit-any */
// BookingPage.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { motion } from "framer-motion";
import {
  confirmBooking,
  updatePassengerInfo,
} from "@/store/features/bookingSlice";
import {
  PageTransition,
  ScaleIn,
} from "@/components/animations/page-transition";

import { generateTicketPDF } from "@/lib/utils/pdfGenerator";

import { BookingSteps } from "@/components/booking-page/booking-steps";
import { BookingReview } from "@/components/booking-page/booking-review";
import { PassengerForm } from "@/components/booking-page/passenger-form";

export default function BookingPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { selectedFlight, bookingDetails, isLoading } = useAppSelector(
    (state) => state.booking
  );
  const [currentStep, setCurrentStep] = useState(1);

  if (!selectedFlight || !bookingDetails) {
    return (
      <PageTransition className="min-h-screen bg-gray-50 flex items-center justify-center">
        <ScaleIn>
          <div className="text-center">
            <p className="mb-4">No flight selected</p>
            <Button onClick={() => router.push("/search")}>
              Back to Search
            </Button>
          </div>
        </ScaleIn>
      </PageTransition>
    );
  }

  const handlePassengerUpdate = (
    passengerId: string,
    field: string,
    value: string | Date | null
  ) => {
    dispatch(updatePassengerInfo({ passengerId, field, value }));
  };

  const handleNextStep = async () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      await dispatch(confirmBooking(bookingDetails));
      setCurrentStep(3);
    }
  };

  const downloadTicket = () => {
    const ticketData = {
      bookingReference: bookingDetails.bookingReference!,
      flight: selectedFlight,
      passengers: bookingDetails.passengers,
      totalPrice: bookingDetails.totalPrice,
      bookingDate: new Date().toISOString(),
    };

    const doc = generateTicketPDF(ticketData);
    doc.save(`kluyuran-ticket-${bookingDetails.bookingReference}.pdf`);
  };

  if (currentStep === 3 && bookingDetails.status === "confirmed") {
    return (
      <PageTransition className="min-h-screen bg-gray-50 flex items-center justify-center">
        <ScaleIn>
          <Card className="w-full max-w-2xl">
            <CardContent className="p-8 text-center">
              <h1 className="text-3xl font-bold text-green-600 mb-4">
                Booking Confirmed!
              </h1>
              <p className="text-lg mb-6">
                Your booking reference:{" "}
                <strong>{bookingDetails.bookingReference}</strong>
              </p>
              <Button onClick={downloadTicket} className="mr-4">
                Download Ticket
              </Button>
              <Button variant="outline" onClick={() => router.push("/")}>
                Back to Home
              </Button>
            </CardContent>
          </Card>
        </ScaleIn>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <BookingSteps currentStep={currentStep} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <AnimatePresence>
                {bookingDetails.passengers.map((passenger, index) => (
                  <PassengerForm
                    key={passenger.id}
                    passenger={passenger}
                    index={index}
                    onChange={handlePassengerUpdate}
                  />
                ))}
                <div className="text-right mt-4">
                  <Button onClick={handleNextStep}>Continue to Review</Button>
                </div>
              </AnimatePresence>
            )}

            {currentStep === 2 && (
              <BookingReview
                passengers={bookingDetails.passengers}
                flight={selectedFlight}
                totalPrice={bookingDetails.totalPrice}
                onEdit={() => setCurrentStep(1)}
                onConfirm={handleNextStep}
                isLoading={isLoading}
              />
            )}
          </div>

          <motion.div
            className="lg:col-span-1"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Booking Summary</h3>
                {/* Summary items */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Flight</span>
                    <span>{selectedFlight.airline_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Passengers</span>
                    <span>{bookingDetails.passengers.length}</span>
                  </div>
                  <div className="flex justify-between font-bold border-t pt-3">
                    <span>Total</span>
                    <span>${bookingDetails.totalPrice}</span>
                  </div>
                </div>

                {/* Button stays in sidebar */}
                {currentStep === 1 && (
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={handleNextStep}
                    disabled={isLoading}
                  >
                    {isLoading ? "Processing..." : "Confirm Booking"}
                  </Button>
                )}
                {currentStep === 2 && (
                  <>
                    <Button
                      variant="outline"
                      className="w-full mb-2"
                      onClick={() => setCurrentStep(1)}
                      disabled={isLoading}
                    >
                      Edit Details
                    </Button>
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={handleNextStep}
                      disabled={isLoading}
                    >
                      {isLoading ? "Processing..." : "Finalize Booking"}
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}

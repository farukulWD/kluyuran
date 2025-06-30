/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  PageTransition,
  ScaleIn,
} from "@/components/animations/page-transition";
import {
  confirmBooking,
  updatePassengerInfo,
} from "@/store/features/bookingSlice";
import { generateTicketPDF } from "@/lib/utils/pdfGenerator";
import { useBookingSteps } from "@/hooks/useBookingSteps";
import { BookingSteps } from "@/components/booking-page/booking-steps";
import { BookingReview } from "@/components/booking-page/booking-review";
import { PassengerForm } from "@/components/booking-page/passenger-form";

export default function BookingPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { selectedFlight, bookingDetails, isLoading } = useAppSelector(
    (state) => state.booking
  );

  const steps = useBookingSteps();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Initialize formData & formErrors from passengers
  const [formData, setFormData] = useState(() => {
    if (!bookingDetails) return {};
    return bookingDetails.passengers.reduce((acc: any, p: any) => {
      acc[p.id] = {
        title: "",
        firstname: "",
        lastname: "",
        gender: "",
        dateOfBirth: null,
        nationality: "",
        passportNumber: "",
      };
      return acc;
    }, {});
  });

  const [formErrors, setFormErrors] = useState(() => {
    if (!bookingDetails) return {};
    return bookingDetails.passengers.reduce((acc: any, p: any) => {
      acc[p.id] = {};
      return acc;
    }, {});
  });

  useEffect(() => {
    // Sync formData with bookingDetails if they change (optional)
    if (!bookingDetails) return;
    const newData = { ...formData };
    bookingDetails.passengers.forEach((p) => {
      if (!newData[p.id]) {
        newData[p.id] = {
          title: "",
          firstname: "",
          lastname: "",
          gender: "",
          dateOfBirth: null,
          nationality: "",
          passportNumber: "",
        };
      }
    });
    setFormData(newData);
  }, [bookingDetails]);

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

  const currentStepItem = steps[currentStepIndex];
  const passenger = bookingDetails.passengers.find(
    (p) => p.id === currentStepItem.id
  );

  const handleChange = (
    passengerId: string,
    field: string,
    value: string | Date | null
  ) => {
    // Update form data
    setFormData((prev: any) => ({
      ...prev,
      [passengerId]: {
        ...prev[passengerId],
        [field]: value,
      },
    }));

    // Validate field live
    setFormErrors((prev: any) => {
      const isEmpty =
        !value || (typeof value === "string" && value.trim() === "");
      return {
        ...prev,
        [passengerId]: {
          ...prev[passengerId],
          [field]: isEmpty ? `${field} is required` : "",
        },
      };
    });

    // Update Redux store as well
    dispatch(updatePassengerInfo({ passengerId, field, value }));
  };

  // Validation helper for current step passenger
  const validateCurrentStep = (): boolean => {
    if (!passenger) return false;
    const currentData = formData[passenger.id];
    if (!currentData) return false;

    const requiredFields = [
      "title",
      "firstname",
      "lastname",
      "gender",
      "dateOfBirth",
      "nationality",
    ];

    if (passenger.type === "adult") requiredFields.push("passportNumber");

    let valid = true;
    const newErrors: Record<string, string> = {};

    requiredFields.forEach((field) => {
      const value = currentData[field];
      if (
        value === null ||
        value === undefined ||
        (typeof value === "string" && value.trim() === "")
      ) {
        newErrors[field] = `${field} is required`;
        valid = false;
      } else {
        newErrors[field] = "";
      }
    });

    setFormErrors((prev: any) => ({
      ...prev,
      [passenger.id]: {
        ...prev[passenger.id],
        ...newErrors,
      },
    }));

    return valid;
  };

  const handleNext = async () => {
    // Validate current passenger step if passenger step
    if (passenger) {
      const isValid = validateCurrentStep();
      if (!isValid) {
        alert("Please fill all required fields correctly before continuing.");
        return;
      }
    }

    if (currentStepItem.id === "review") {
      await dispatch(confirmBooking(bookingDetails));
    }

    setCurrentStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
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

  if (
    currentStepItem.id === "confirmation" &&
    bookingDetails.status === "confirmed"
  ) {
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
        <BookingSteps currentStep={currentStepIndex + 1} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AnimatePresence>
              {passenger && (
                <PassengerForm
                  passenger={passenger}
                  index={currentStepIndex}
                  onChange={handleChange}
                  formData={formData[passenger.id]}
                  formErrors={formErrors[passenger.id]}
                />
              )}

              {currentStepItem.id === "review" && (
                <BookingReview
                  passengers={bookingDetails.passengers}
                  flight={selectedFlight}
                  totalPrice={bookingDetails.totalPrice}
                  onEdit={() => setCurrentStepIndex(0)}
                  onConfirm={handleNext}
                  isLoading={isLoading}
                />
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            {currentStepItem.id !== "review" && passenger && (
              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStepIndex === 0}
                >
                  Previous
                </Button>
                <Button onClick={handleNext}>
                  {currentStepIndex === steps.length - 2
                    ? isLoading
                      ? "Processing..."
                      : "Continue to Review"
                    : "Next"}
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar Summary */}
          <motion.div
            className="lg:col-span-1"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Booking Summary</h3>
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
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}

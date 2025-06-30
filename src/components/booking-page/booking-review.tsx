/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/page-transition";
import { Flight } from "@/lib/convertToIFlight";
import { PassengerInfo } from "@/store/features/bookingSlice";

export function BookingReview({
  passengers,
  flight,
  totalPrice,
  onEdit,
  onConfirm,
  isLoading,
}: {
  passengers: PassengerInfo[];
  flight: Flight;
  totalPrice: number;
  onEdit: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}) {
  return (
    <FadeIn delay={0.1}>
      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Review Your Booking</h2>

          <div className="mb-4">
            <h4 className="font-semibold mb-2">Passengers</h4>
            {passengers.map((p) => (
              <div key={p.id} className="text-sm border p-3 rounded mb-2">
                <p>
                  <strong>
                    {p.title} {p.firstName} {p.lastName}
                  </strong>
                </p>
                <p>Type: {p.type}</p>
                <p>Gender: {p.gender}</p>
                {/* <p>DOB: {p.dateOfBirth}</p> */}
                <p>Nationality: {p.nationality}</p>
                {p.passportNumber && <p>Passport: {p.passportNumber}</p>}
              </div>
            ))}
          </div>

          <div className="mb-4">
            <h4 className="font-semibold mb-2">Flight</h4>
            <p>
              {flight.departure.airport} ({flight.departure.time}) →{" "}
              {flight.arrival.airport} ({flight.arrival.time})
            </p>
            <p>
              {flight.airline_name} • {flight.flightNumber}
            </p>
          </div>

          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${totalPrice}</span>
          </div>

          <div className="mt-6 flex justify-between">
            <Button variant="outline" onClick={onEdit}>
              Edit Passenger Info
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={onConfirm}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Confirm Booking"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </FadeIn>
  );
}

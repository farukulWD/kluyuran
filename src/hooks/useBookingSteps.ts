import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface StepItem {
  step: number;
  label: string;
  id: string;
}

export const useBookingSteps = (): StepItem[] => {
  const passengers = useSelector(
    (state: RootState) => state.booking.bookingDetails?.passengers ?? []
  );

  const steps = useMemo(() => {
    const typeCounters = {
      adult: 0,
      child: 0,
      infant: 0,
    };

    const passengerSteps: StepItem[] = passengers.map((item, index) => {
      typeCounters[item.type] += 1;

      const capitalizedType =
        item.type.charAt(0).toUpperCase() + item.type.slice(1);

      return {
        step: index + 1,
        label: `${capitalizedType} ${typeCounters[item.type]} Details`,
        id: item.id,
      };
    });

    return [
      ...passengerSteps,
      {
        step: passengers.length + 1,
        label: "Review",
        id: "review",
      },
      {
        step: passengers.length + 2,
        label: "Confirmation",
        id: "confirmation",
      },
    ];
  }, [passengers]);

  return steps;
};

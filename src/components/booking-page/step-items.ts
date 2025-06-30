import { store } from "@/store/store";

interface StepItem {
  step: number;
  label: string;
  id: string;
}

const typeCounters = {
  adult: 0,
  child: 0,
  infant: 0,
};

const passengers = store.getState().booking.bookingDetails?.passengers ?? [];

const passengersSteps = passengers?.map((item, index) => {
  typeCounters[item.type] += 1;

  const capitalizedType =
    item.type.charAt(0).toUpperCase() + item.type.slice(1);

  return {
    step: index + 1,
    label: `${capitalizedType} ${typeCounters[item.type]} Details`,
    id: item.id,
  };
});

export const stepsItem: StepItem[] = [
  ...passengersSteps,
  { step: passengers.length + 1, label: "Review", id: "review" },
  { step: passengers.length + 2, label: "Confirmation", id: "confirmation" },
];

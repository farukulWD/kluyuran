"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useBookingSteps } from "@/hooks/useBookingSteps";

export function BookingSteps({ currentStep }: { currentStep: number }) {
  const stepsItem = useBookingSteps();
  return (
    <Card className="mb-6">
      <CardContent className="p-6 flex items-center space-x-4 overflow-x-auto">
        {stepsItem?.map((item, index) => {
          const isActive = currentStep === item.step;
          const isCompleted = currentStep > item.step;

          return (
            <motion.div
              key={item.step}
              className="flex items-center"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm text-white ${
                  isCompleted
                    ? "bg-green-500"
                    : isActive
                    ? "bg-blue-600"
                    : "bg-gray-300"
                }`}
              >
                {item.step}
              </div>
              <span
                className={`ml-2 font-medium ${
                  isCompleted || isActive ? "text-blue-600" : "text-gray-500"
                }`}
              >
                {item.label}
              </span>
              {index < stepsItem.length - 1 && (
                <div className="w-8 h-1 bg-gray-300 mx-3">
                  <div
                    className={`h-1 ${
                      currentStep > item.step
                        ? "bg-blue-600 w-full"
                        : "bg-gray-300 w-0"
                    }`}
                  ></div>
                </div>
              )}
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
}

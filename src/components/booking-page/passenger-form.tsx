/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/page-transition";
import CustomDatePicker from "../common/custom-date-picker";

interface PassengerFormProps {
  passenger: any;
  index: number;
  onChange: (id: string, field: string, value: string | Date | null) => void;
}

export function PassengerForm({
  passenger,
  index,
  onChange,
}: PassengerFormProps) {
  const badgeColor =
    passenger.type === "adult" ? "bg-blue-600" : "bg-green-600";

  return (
    <motion.div
      key={passenger.id}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Card className="mb-6">
        <CardContent className="p-6">
          <motion.div
            className="flex items-center justify-between mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            <div className="flex items-center space-x-3">
              <h3 className="text-lg font-semibold">Passenger Info</h3>
              <motion.span
                className={`${badgeColor} text-white px-3 py-1 rounded text-sm capitalize`}
                whileHover={{ scale: 1.05 }}
              >
                {passenger.type} {passenger.id.split("_")[1]}
              </motion.span>
            </div>
          </motion.div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {[
              { label: "Title", type: "select" },
              { label: "First Name", type: "input" },
              { label: "Last Name", type: "input" },
              { label: "Gender", type: "select" },
            ].map((field, fieldIndex) => (
              <StaggerItem key={fieldIndex}>
                <label className="block text-sm font-medium mb-2">
                  {field.label}
                  <span className="text-red-500">*</span>
                </label>
                {field.type === "select" ? (
                  <Select
                    onValueChange={(value) =>
                      onChange(passenger.id, field.label.toLowerCase(), value)
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={`Select ${field.label}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.label === "Title" ? (
                        <>
                          <SelectItem value="mr">Mr.</SelectItem>
                          <SelectItem value="mrs">Mrs.</SelectItem>
                          <SelectItem value="ms">Ms.</SelectItem>
                          <SelectItem value="dr">Dr.</SelectItem>
                        </>
                      ) : (
                        <>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    required
                    placeholder={field.label}
                    onChange={(e) =>
                      onChange(
                        passenger.id,
                        field.label.toLowerCase().replace(" ", ""),
                        e.target.value
                      )
                    }
                  />
                )}
              </StaggerItem>
            ))}
          </StaggerContainer>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StaggerItem>
              <label className="block text-sm font-medium mb-2">
                Date of Birth<span className="text-red-500">*</span>
              </label>

              <CustomDatePicker
                className="w-full"
                onChange={(date) => {
                  onChange(passenger.id, "dateOfBirth", date as Date);
                }}
                date={passenger.dateOfBirth}
                placeholder="Date Of Birth"
                isPreDisable={false}
              />
            </StaggerItem>

            {passenger.type === "adult" && (
              <StaggerItem>
                <label className="block text-sm font-medium mb-2">
                  Passport Number<span className="text-red-500">*</span>
                </label>
                <Input
                  required
                  placeholder="Passport Number"
                  onChange={(e) =>
                    onChange(passenger.id, "passportNumber", e.target.value)
                  }
                />
              </StaggerItem>
            )}

            <StaggerItem>
              <label className="block text-sm font-medium mb-2">
                Nationality<span className="text-red-500">*</span>
              </label>
              <Select
                required
                onValueChange={(value) =>
                  onChange(passenger.id, "nationality", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bd">Bangladesh</SelectItem>
                  <SelectItem value="in">India</SelectItem>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                </SelectContent>
              </Select>
            </StaggerItem>
          </StaggerContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}

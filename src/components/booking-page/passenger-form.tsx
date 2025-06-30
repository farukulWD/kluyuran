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
  formData: any;
  formErrors: Record<string, string>;
}

export function PassengerForm({
  passenger,
  index,
  onChange,
  formData,
  formErrors,
}: PassengerFormProps) {
  const badgeColor =
    passenger.type === "adult" ? "bg-blue-600" : "bg-green-600";

  const getError = (field: string) => formErrors?.[field];

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
            {/* Title */}
            <StaggerItem>
              <label className="block text-sm font-medium mb-2">
                Title<span className="text-red-500">*</span>
              </label>
              <Select
                required
                onValueChange={(value) =>
                  onChange(passenger.id, "title", value)
                }
                value={formData.title}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Title" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mr">Mr.</SelectItem>
                  <SelectItem value="mrs">Mrs.</SelectItem>
                  <SelectItem value="ms">Ms.</SelectItem>
                  <SelectItem value="dr">Dr.</SelectItem>
                </SelectContent>
              </Select>
              {getError("title") && (
                <p className="text-sm text-red-500 mt-1">{getError("title")}</p>
              )}
            </StaggerItem>

            {/* First Name */}
            <StaggerItem>
              <label className="block text-sm font-medium mb-2">
                First Name<span className="text-red-500">*</span>
              </label>
              <Input
                required
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) =>
                  onChange(passenger.id, "firstname", e.target.value)
                }
              />
              {getError("firstName") && (
                <p className="text-sm text-red-500 mt-1">
                  {getError("firstName")}
                </p>
              )}
            </StaggerItem>

            {/* Last Name */}
            <StaggerItem>
              <label className="block text-sm font-medium mb-2">
                Last Name<span className="text-red-500">*</span>
              </label>
              <Input
                required
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) =>
                  onChange(passenger.id, "lastname", e.target.value)
                }
              />
              {getError("lastName") && (
                <p className="text-sm text-red-500 mt-1">
                  {getError("lastName")}
                </p>
              )}
            </StaggerItem>

            {/* Gender */}
            <StaggerItem>
              <label className="block text-sm font-medium mb-2">
                Gender<span className="text-red-500">*</span>
              </label>
              <Select
                required
                onValueChange={(value) =>
                  onChange(passenger.id, "gender", value)
                }
                value={formData.gender}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
              {getError("gender") && (
                <p className="text-sm text-red-500 mt-1">
                  {getError("gender")}
                </p>
              )}
            </StaggerItem>
          </StaggerContainer>

          {/* DOB, Passport (Adult only), Nationality */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* DOB */}
            <StaggerItem>
              <label className="block text-sm font-medium mb-2">
                Date of Birth<span className="text-red-500">*</span>
              </label>
              <CustomDatePicker
                className="w-full"
                onChange={(date) => {
                  onChange(passenger.id, "dateOfBirth", date as Date);
                }}
                date={formData.dateOfBirth}
                placeholder="Date Of Birth"
                isPreDisable={false}
              />
              {getError("dateOfBirth") && (
                <p className="text-sm text-red-500 mt-1">
                  {getError("dateOfBirth")}
                </p>
              )}
            </StaggerItem>

            {/* Passport Number (Adult only) */}
            {passenger.type === "adult" && (
              <StaggerItem>
                <label className="block text-sm font-medium mb-2">
                  Passport Number<span className="text-red-500">*</span>
                </label>
                <Input
                  required
                  placeholder="Passport Number"
                  value={formData.passportNumber}
                  onChange={(e) =>
                    onChange(passenger.id, "passportNumber", e.target.value)
                  }
                />
                {getError("passportNumber") && (
                  <p className="text-sm text-red-500 mt-1">
                    {getError("passportNumber")}
                  </p>
                )}
              </StaggerItem>
            )}

            {/* Nationality */}
            <StaggerItem>
              <label className="block text-sm font-medium mb-2">
                Nationality<span className="text-red-500">*</span>
              </label>
              <Select
                required
                onValueChange={(value) =>
                  onChange(passenger.id, "nationality", value)
                }
                value={formData.nationality}
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
              {getError("nationality") && (
                <p className="text-sm text-red-500 mt-1">
                  {getError("nationality")}
                </p>
              )}
            </StaggerItem>
          </StaggerContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}

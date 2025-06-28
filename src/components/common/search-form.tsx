"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

import { useAppDispatch } from "@/store/hooks";
import { searchFlights, setSearchParams } from "@/store/features/searchSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { SearchFormSchema, searchSchema } from "@/lib/search-schema";
import CustomDatePicker from "./custom-date-picker";

const airportOptions = [
  { value: "DAC", label: "Dhaka (DAC)" },
  { value: "DXB", label: "Dubai (DXB)" },
  { value: "SIN", label: "Singapore (SIN)" },
  { value: "KUL", label: "Kuala Lumpur (KUL)" },
];

export default function SearchForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const form = useForm<SearchFormSchema>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      origin: "",
      destination: "",
      departureDate: new Date(),
      returnDate: undefined,
      passenger: {
        adult: 1,
        children: 0,
        infant: 0,
      },
    },
  });

  const onSubmit = (data: SearchFormSchema) => {
    dispatch(setSearchParams(data));
    dispatch(searchFlights(data));
    router.push("/search");
  };

  return (
    <motion.section
      className="bg-white shadow-lg -mt-20 relative z-10 mx-4 md:mx-8 rounded-lg"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 py-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Origin */}
              <FormField
                control={form.control}
                name="origin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Origin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {airportOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Destination */}
              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>To</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Destination" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {airportOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Departure Date */}
              <FormField
                control={form.control}
                name="departureDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Departure Date</FormLabel>
                    <FormControl>
                      <CustomDatePicker
                        date={field.value}
                        onChange={field.onChange}
                        placeholder="Pick departure date"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Return Date */}
              <FormField
                control={form.control}
                name="returnDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Return Date (Optional)</FormLabel>
                    <FormControl>
                      <CustomDatePicker
                        date={field.value}
                        onChange={field.onChange}
                        placeholder="Pick return date"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Passenger */}
              <FormItem>
                <div className="grid grid-cols-3 gap-2">
                  {(["adult", "children", "infant"] as const).map((key) => (
                    <FormField
                      key={key}
                      control={form.control}
                      name={`passenger.${key}`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm capitalize">
                            {key}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={key === "adult" ? 1 : 0}
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </FormItem>
            </div>

            {/* Submit */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.2, duration: 0.5 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full"
                >
                  <Search className="w-4 h-4 mr-2" /> Search Flights
                </Button>
              </motion.div>
            </motion.div>
          </form>
        </Form>
      </div>
    </motion.section>
  );
}

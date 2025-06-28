import { z } from "zod";

export const searchSchema = z.object({
  origin: z.string().min(1, "Origin is required"),
  destination: z.string().min(1, "Destination is required"),
  departureDate: z.date({ required_error: "Departure date is required" }),
  returnDate: z.date().optional(),
  passenger: z.object({
    adult: z.number().min(1, "At least one adult required"),
    children: z.number().min(0),
    infant: z.number().min(0),
  }),
});

export type SearchFormSchema = z.infer<typeof searchSchema>;

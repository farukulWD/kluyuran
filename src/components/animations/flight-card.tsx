/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
// TODO: fix the type
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plane } from "lucide-react"

interface FlightCardProps {
  flight: any
  onBook: (flight: any) => void
  index: number
}

export const AnimatedFlightCard = ({ flight, onBook, index }: FlightCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 },
      }}
      className="w-full"
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center space-x-4"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              <motion.div
                className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                ✈️
              </motion.div>
              <div>
                <motion.h3
                  className="font-semibold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {flight.airline}
                </motion.h3>
                <motion.p
                  className="text-sm text-gray-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                >
                  {flight.flightNumber}
                </motion.p>
                <motion.p
                  className="text-sm text-green-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  {flight.refundable ? "Refundable" : "Non-refundable"}
                </motion.p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center space-x-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <div className="text-center">
                <motion.div className="text-xl font-bold" whileHover={{ scale: 1.05 }}>
                  {flight.departure.time}
                </motion.div>
                <div className="text-sm text-gray-600">{flight.departure.airport}</div>
                <div className="text-xs text-gray-500">{flight.departure.date}</div>
              </div>

              <div className="flex flex-col items-center">
                <div className="text-sm text-gray-600">{flight.duration}</div>
                <motion.div
                  className="flex items-center"
                  animate={{
                    x: [0, 10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <div className="w-8 h-px bg-gray-300"></div>
                  <Plane className="w-4 h-4 text-gray-400 mx-2" />
                  <div className="w-8 h-px bg-gray-300"></div>
                </motion.div>
                <div className="text-sm text-gray-600">{flight.stops}</div>
              </div>

              <div className="text-center">
                <motion.div className="text-xl font-bold" whileHover={{ scale: 1.05 }}>
                  {flight.arrival.time}
                </motion.div>
                <div className="text-sm text-gray-600">{flight.arrival.airport}</div>
                <div className="text-xs text-gray-500">{flight.arrival.date}</div>
              </div>
            </motion.div>

            <motion.div
              className="text-right"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.4 }}
            >
              <motion.div
                className="text-2xl font-bold"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                ${flight.price}
              </motion.div>
              <div className="text-sm text-gray-600 mb-3">{flight.class}</div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => onBook(flight)}>
                  Book Now
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

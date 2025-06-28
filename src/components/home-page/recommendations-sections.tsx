"use client";
import { motion } from "framer-motion";

import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "../animations/page-transition";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import Image from "next/image";
// TODO:Data load from the api or storage
const recommendationsData = [
  {
    name: "Wales Beach",
    rating: 4.9,
    price: 122.23,
    image: "/images/recommendation/wales_beach.jpg",
    description:
      "Tour package 3 days 2 nights with a good and friendly tour guide",
  },
  {
    name: "Nglayur Beach",
    rating: 4.7,
    price: 132.65,
    image: "/images/recommendation/Nglayur_Beach.jpg",
    description:
      "Tour package 3 days 2 nights with a good and friendly tour guide",
  },
  {
    name: "Megah Asri",
    rating: 4.6,
    price: 148.43,
    image: "/images/recommendation/wales_beach.jpg",
    description:
      "Tour package 3 days 2 nights with a good and friendly tour guide",
  },
  {
    name: "Karangjahe",
    rating: 4.6,
    price: 119.23,
    image: "/images/recommendation/wales_beach.jpg",
    description:
      "Tour package 3 days 2 nights with a good and friendly tour guide",
  },
  {
    name: "Caruban Beach",
    rating: 4.7,
    price: 128.29,
    image: "/images/recommendation/wales_beach.jpg",
    description:
      "Tour package 3 days 2 nights with a good and friendly tour guide",
  },
  {
    name: "Mbrumbung",
    rating: 4.5,
    price: 182.33,
    image: "/images/recommendation/wales_beach.jpg",
    description:
      "Tour package 3 days 2 nights with a good and friendly tour guide",
  },
];

function RecommendationsSections() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <FadeIn delay={0.2}>
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                Travel Recommendations
              </h2>
              <p className="text-gray-600">
                The best travel recommendations from around the world for you
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-pink-500 hover:bg-pink-600 text-white px-6 rounded-full">
                Explore more
              </Button>
            </motion.div>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendationsData?.map((destination, index) => (
            <StaggerItem key={index}>
              <motion.div
                whileHover={{
                  y: -5,
                  transition: { duration: 0.3 },
                }}
              >
                <Card className="overflow-hidden group cursor-pointer bg-white shadow-sm hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.name}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold">
                        {destination.name}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <span className="text-yellow-400">⭐</span>
                        </motion.div>
                        <span className="text-sm font-medium">
                          {destination.rating}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {destination.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-xl font-bold text-gray-900">
                        ${destination.price}
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full text-sm">
                          Book Now
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

export default RecommendationsSections;

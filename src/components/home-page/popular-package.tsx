import { motion } from "framer-motion";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "../animations/page-transition";

const destinations = [
  {
    name: "Boracay",
    country: "Philippines",
    image: "/images/philippines.jpg?height=300&width=250",
  },
  {
    name: "Annapurna",
    country: "Nepal",
    image: "/images/nepal.jpg?height=300&width=250",
  },
  {
    name: "Lofoten",
    country: "Norway",
    image: "/images/norway.jpg?height=300&width=250",
  },
  {
    name: "Navagio",
    country: "Greece",
    image: "/images/greece.jpg?height=300&width=250",
  },
];

export default function PopularPackage() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <FadeIn delay={0.2}>
          <h2 className="text-3xl font-bold text-center mb-12">
            Popular Package
          </h2>
        </FadeIn>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {destinations.map((destination, index) => (
            <StaggerItem key={index}>
              <motion.div
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden group cursor-pointer">
                  <div className="relative h-64">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={destination.image}
                        alt={destination.name}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <motion.div
                      className="absolute bottom-4 left-4 text-white"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <h3 className="text-xl font-bold">{destination.name}</h3>
                      <p className="text-sm opacity-90">
                        {destination.country}
                      </p>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
        <FadeIn delay={0.6} className="text-center mt-8">
          <motion.div
            className="max-w-fit mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="bg-red-500 hover:bg-red-600 text-white px-8">
              Explore more
            </Button>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}

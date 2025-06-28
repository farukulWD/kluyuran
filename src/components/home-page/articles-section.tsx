"use client";

import Image from "next/image";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "../animations/page-transition";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
const blogs = [
  {
    title: "A Group Travel Itinerary For A 7-Day Trip To France",
    image: "/images/philippines.jpg?height=250&width=400",
    category: "Europe Travel",
  },
  {
    title: "The Best Kept Secrets Of Traveling To Asia",
    image: "/images/nepal.jpg?height=250&width=400",
    category: "Asia Travel",
  },
  {
    title: "Traveling On A Budget In Southeast Asia",
    image: "/images/norway.jpg?height=250&width=400",
    category: "Budget Travel",
  },
];

function ArticlesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <FadeIn delay={0.2}>
          <h2 className="text-3xl font-bold text-center mb-12">
            Our latest articles about travel
          </h2>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {blogs?.map((article, index) => (
            <StaggerItem key={index}>
              <motion.div
                whileHover={{
                  y: -5,
                  transition: { duration: 0.3 },
                }}
                className="cursor-pointer"
              >
                <Card className="overflow-hidden group bg-white shadow-sm hover:shadow-lg transition-shadow">
                  <div className="relative h-64">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <motion.div
                      className="absolute bottom-4 left-4 right-4 text-white"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="text-xs font-medium bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full mb-2 inline-block">
                        {article.category}
                      </span>
                      <h3 className="text-lg font-bold leading-tight">
                        {article.title}
                      </h3>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.6} className="text-center">
          <motion.div
            className="max-w-fit mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full">
              View all
            </Button>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}

export default ArticlesSection;

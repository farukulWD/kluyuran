import { motion } from "framer-motion";
import { Navigation, Users, CreditCard } from "lucide-react";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "../animations/page-transition";

const valueItems = [
  {
    icon: Navigation,
    title: "Lot Of Choices",
    description: "Total 460+ destinations that we work with",
    color: "text-blue-600",
  },
  {
    icon: Users,
    title: "Best Tour Guide",
    description: "Our tour guide with 15+ years of experience",
    color: "text-blue-600",
  },
  {
    icon: CreditCard,
    title: "Easy Booking",
    description: "With an easy and fast ticket purchase process",
    color: "text-blue-600",
  },
];

export default function TopValueSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <FadeIn delay={0.2} className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Top Value From Us For you</h2>
          <p className="text-gray-600">
            Try a variety of benefits when using our services
          </p>
        </FadeIn>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {valueItems.map((item, index) => (
            <StaggerItem key={index}>
              <motion.div
                className="text-center"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <item.icon className={`w-8 h-8 ${item.color}`} />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

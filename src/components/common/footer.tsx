"use client";
import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem } from "../animations/page-transition";

const footerLinks = [
  {
    title: "About",
    links: ["About Us", "Features", "News", "Careers"],
  },
  {
    title: "Support",
    links: ["Help Center", "Contact Us", "Privacy Policy", "Terms of Service"],
  },
  {
    title: "Services",
    links: [
      "Flight Booking",
      "Hotel Booking",
      "Car Rental",
      "Travel Insurance",
    ],
  },
  {
    title: "Contact",
    links: [
      "+1-202-555-0174",
      "support@khuyendu.com",
      "123 Travel Street",
      "New York, NY 10001",
    ],
  },
];

export default function Footer() {
  return (
    <motion.footer
      className="bg-white py-12 border-t"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <StaggerItem>
            <h3 className="text-xl font-bold mb-4">Khuyendu</h3>
            <p className="text-gray-600 mb-4">
              Your trusted travel partner for amazing journeys around the world.
            </p>
          </StaggerItem>
          {footerLinks.map((section, index) => (
            <StaggerItem key={index}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2 text-gray-600">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={linkIndex}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link}
                  </motion.li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </motion.footer>
  );
}

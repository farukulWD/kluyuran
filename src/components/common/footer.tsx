"use client";
import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem } from "../animations/page-transition";
import BottomBar from "./bottom-bar";
import { Button } from "../ui/button";

export default function Footer() {
  return (
    <motion.footer
      className="bg-gray-50 py-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-6 gap-8 mb-8">
          <StaggerItem className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-6">Kluyuran</h3>
            <div className="flex space-x-3">
              {[
                { icon: "facebook", color: "bg-pink-500" },
                { icon: "twitter", color: "bg-pink-500" },
                { icon: "instagram", color: "bg-pink-500" },
                { icon: "youtube", color: "bg-pink-500" },
              ].map((social, index) => (
                <motion.div
                  key={social.icon}
                  className={`w-8 h-8 ${social.color} rounded-full flex items-center justify-center text-white cursor-pointer`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="text-xs font-bold">
                    {social.icon === "facebook" && "F"}
                    {social.icon === "twitter" && "T"}
                    {social.icon === "instagram" && "In"}
                    {social.icon === "youtube" && "Y"}
                  </span>
                </motion.div>
              ))}
            </div>
          </StaggerItem>

          <StaggerItem>
            <h4 className="font-semibold mb-4 text-gray-900">About</h4>
            <ul className="space-y-3 text-gray-600 text-sm">
              {[
                "About us",
                "Destination",
                "News & articles",
                "Testimonials",
              ].map((link, index) => (
                <motion.li
                  key={index}
                  className="cursor-pointer hover:text-pink-500 transition-colors"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {link}
                </motion.li>
              ))}
            </ul>
          </StaggerItem>

          <StaggerItem>
            <h4 className="font-semibold mb-4 text-gray-900">Features</h4>
            <ul className="space-y-3 text-gray-600 text-sm">
              {["Payments", "Virtual Account", "Refund Bonus", "Go Pay"].map(
                (link, index) => (
                  <motion.li
                    key={index}
                    className="cursor-pointer hover:text-pink-500 transition-colors"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link}
                  </motion.li>
                )
              )}
            </ul>
          </StaggerItem>

          <StaggerItem>
            <h4 className="font-semibold mb-4 text-gray-900">Company</h4>
            <ul className="space-y-3 text-gray-600 text-sm">
              {["Careers", "Privacy & Policy", "FAQ", "Partners"].map(
                (link, index) => (
                  <motion.li
                    key={index}
                    className="cursor-pointer hover:text-pink-500 transition-colors"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link}
                  </motion.li>
                )
              )}
            </ul>
          </StaggerItem>

          <StaggerItem>
            <h4 className="font-semibold mb-4 text-gray-900">Contact Us</h4>
            <p className="text-muted-foreground mb-3 text-sm">
              kluyuran@gmail.com
            </p>
            <div className="mb-6">
              <p className="text-gray-600 text-sm mb-4">Get the App</p>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full text-sm w-full">
                  Download app
                </Button>
              </motion.div>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>

      {/* Bottom Bar */}
      <BottomBar />
    </motion.footer>
  );
}

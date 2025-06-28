"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const navItems = ["Home", "About Us", "Features", "Company", "Contact Us"];

export default function Navbar() {
  return (
    <motion.header
      className="bg-gradient-to-r from-blue-500 to-blue-600 text-white"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div
          className="text-2xl font-bold"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Khuyendu
        </motion.div>
        <motion.nav
          className="hidden md:flex items-center space-x-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {navItems.map((item, index) => (
            <motion.a
              key={item}
              href="#"
              className="hover:text-blue-200 transition-colors"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              {item}
            </motion.a>
          ))}
        </motion.nav>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button className="bg-red-500 hover:bg-red-600 text-white px-6">
            Book Now
          </Button>
        </motion.div>
      </div>
    </motion.header>
  );
}

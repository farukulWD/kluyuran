"use client";
import { motion } from "framer-motion";

function BottomBar() {
  return (
    <div className="bg-black text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center text-sm">
        <motion.span
          className="cursor-pointer hover:text-gray-300 transition-colors"
          whileHover={{ x: 2 }}
        >
          Privacy and policy
        </motion.span>
        <span className="text-gray-400">
          All rights reserved | Kluyuran.com
        </span>
      </div>
    </div>
  );
}

export default BottomBar;

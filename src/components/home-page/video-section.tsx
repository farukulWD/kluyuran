import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function VideoSection() {
  return (
    <section className="pt-16">
      <div className="container mx-auto px-4">
        <motion.div
          className="relative h-96 rounded-2xl overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src="/images/surfing.jpg?height=400&width=800"
            alt="People kayaking in turquoise water"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Button className="w-16 h-16 rounded-full bg-white/90 hover:bg-white">
                <svg
                  className="w-6 h-6 text-gray-800 ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

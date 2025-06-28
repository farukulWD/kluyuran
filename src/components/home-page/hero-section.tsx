import { motion } from "framer-motion";
import Image from "next/image";
export default function HeroSection() {
  return (
    <section className="relative h-[600px] bg-gradient-to-r from-blue-500 to-blue-600 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Image
          src="/images/mountain-hero.jpeg"
          alt="Stunning mountain landscape with dramatic peaks"
          fill
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-blue-600/20"></div>
      </motion.div>
      <div className="relative container mx-auto px-4 py-20 text-center text-white">
        <motion.h1
          className="text-5xl md:text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
        >
          Explore The World Around You
        </motion.h1>
        <motion.p
          className="text-xl mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
        >
          Here&apos;s a travel from the stories of each trip, the plan trip and
          explore
        </motion.p>
      </div>
    </section>
  );
}

"use client";
import { motion } from "framer-motion";
import { FadeIn } from "../animations/page-transition";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Mail } from "lucide-react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const SubscriptionSchema = z.object({
  email: z.string().email({ message: "Please provide valid email address" }),
});

function NewsletterSection() {
  type TSubscription = z.infer<typeof SubscriptionSchema>;

  const form = useForm<TSubscription>({
    resolver: zodResolver(SubscriptionSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (data: TSubscription) => {
    console.log(data);
    form.reset();
  };

  return (
    <section className="py-16 bg-gradient-to-br from-pink-50 to-red-50 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {/* Top left area */}
        <div className="absolute w-1 h-1 bg-pink-400 rounded-full top-8 left-12"></div>
        <div className="absolute w-2 h-2 bg-pink-500 rounded-full top-16 left-24"></div>

        {/* Top right area */}
        <div className="absolute w-1.5 h-1.5 bg-pink-400 rounded-full top-6 right-16"></div>
        <div className="absolute w-1 h-1 bg-pink-500 rounded-full top-20 right-8"></div>

        {/* Left side */}
        <div className="absolute w-2 h-2 bg-pink-500 rounded-full top-1/3 left-8"></div>
        <div className="absolute w-1 h-1 bg-pink-400 rounded-full top-1/2 left-16"></div>
        <div className="absolute w-1.5 h-1.5 bg-pink-500 rounded-full bottom-24 left-12"></div>

        {/* Right side */}
        <div className="absolute w-1 h-1 bg-pink-400 rounded-full top-1/4 right-12"></div>
        <div className="absolute w-2 h-2 bg-pink-500 rounded-full top-1/2 right-20"></div>
        <div className="absolute w-1.5 h-1.5 bg-pink-400 rounded-full bottom-32 right-8"></div>

        {/* Bottom area */}
        <div className="absolute w-1 h-1 bg-pink-500 rounded-full bottom-16 left-1/4"></div>
        <div className="absolute w-1.5 h-1.5 bg-pink-400 rounded-full bottom-12 right-1/3"></div>

        {/* Center area scattered */}
        <div className="absolute w-1 h-1 bg-pink-400 rounded-full top-12 left-1/3"></div>
        <div className="absolute w-1 h-1 bg-pink-500 rounded-full top-24 right-1/2"></div>
        <div className="absolute w-1.5 h-1.5 bg-pink-400 rounded-full bottom-20 left-1/2"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <FadeIn delay={0.2}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">
              Subscribe To Get The Latest News About Us
            </h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Stay updated with our latest travel deals, destinations, and
              exclusive offers
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="max-w-lg mx-auto"
            >
              <div className="flex w-full gap-3">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="email"
                            {...field}
                            placeholder="Enter your email address"
                            className="h-12  px-4 border-gray-200 focus:border-pink-400 focus:ring-pink-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="submit"
                    className="bg-pink-500 hover:bg-pink-600 text-white px-6 h-12 rounded-lg"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Subscribe
                  </Button>
                </motion.div>
              </div>
            </form>
          </Form>
        </FadeIn>
      </div>
    </section>
  );
}

export default NewsletterSection;

import { useEffect } from "react";
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import Features from "../components/Features";
import ChatBot from "../components/ChatBot";
import { motion, useScroll, useSpring } from "framer-motion";

const Index = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="relative">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-50"
        style={{ scaleX }}
      />
      <Navigation />
      <main>
        <Hero />
        <Features />
        <ChatBot />
      </main>
    </div>
  );
};

export default Index;
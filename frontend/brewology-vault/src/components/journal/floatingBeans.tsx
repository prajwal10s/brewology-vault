import React from "react";
import { motion } from "framer-motion";

const FloatingBeans: React.FC = () => {
  const beans = [...Array(15)]; // Number of floating beans

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {beans.map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-yellow-700 w-3 h-5 rounded-full"
          style={{
            top: `${Math.random() * 100}%`, // Random vertical position
            left: `${Math.random() * 100}%`, // Random horizontal position
            transform: `rotate(${Math.random() * 360}deg)`, // Random rotation
          }}
          animate={{
            y: ["0%", "-30%", "0%"], // Moves up and down
            opacity: [0.2, 0.6, 0.2], // Fades in and out
          }}
          transition={{
            duration: Math.random() * 4 + 3, // Varying animation duration
            repeat: Infinity, // Continuous movement
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingBeans;

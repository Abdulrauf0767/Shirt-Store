// components/AnimatedPageWrapper.js
import { motion } from "framer-motion";

const animations = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4 },
};

const AnimatedPageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={animations.initial}
      animate={animations.animate}
      exit={animations.exit}
      transition={animations.transition}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPageWrapper;

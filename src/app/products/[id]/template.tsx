'use client';

import { motion } from 'framer-motion';

// constants and functions
import { PRODUCT_PAGE_VARIANTS } from '@/lib/framerMotions';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={PRODUCT_PAGE_VARIANTS}
      initial="hidden"
      animate="enter"
      transition={{ duration: 0.2 }} // Adjust the transition as needed
    >
      {children}
    </motion.div>
  );
}

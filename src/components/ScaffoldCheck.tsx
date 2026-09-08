import { motion } from 'framer-motion';
import { Slot } from 'radix-ui';

export default function ScaffoldCheck() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Slot.Root>
        <span>Scaffold check: React, Framer Motion, and Radix UI wired.</span>
      </Slot.Root>
    </motion.div>
  );
}

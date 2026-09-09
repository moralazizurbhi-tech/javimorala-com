import { motion } from 'framer-motion';
import { Separator } from 'radix-ui';

export default function IntegrationCheck() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <p>React island hydrated; Framer Motion and Radix UI loaded.</p>
      <Separator.Root decorative />
    </motion.div>
  );
}

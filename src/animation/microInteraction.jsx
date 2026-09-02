import { motion } from 'framer-motion';
import { useMotionMode } from './motionMode.js';

const RESTRAINED_SCALE = 1.04;
const RESTRAINED_OPACITY = 0.85;
const RESTRAINED_DURATION = 0.2;
const RESTRAINED_EASE = [0.4, 0, 0.2, 1];

const restrainedVariants = {
  rest: { scale: 1, opacity: 1 },
  active: { scale: RESTRAINED_SCALE, opacity: RESTRAINED_OPACITY },
};

const reducedVariants = {
  rest: { scale: 1, opacity: 1 },
  active: { scale: 1, opacity: 1 },
};

export function MicroInteraction({ as = 'div', children, ...rest }) {
  const motionMode = useMotionMode();
  const reduced = motionMode === 'reduced';
  const Component = motion[as];
  const variants = reduced ? reducedVariants : restrainedVariants;
  const transition = reduced
    ? { duration: 0 }
    : { duration: RESTRAINED_DURATION, ease: RESTRAINED_EASE };

  return (
    <Component
      variants={variants}
      initial="rest"
      animate="rest"
      whileHover="active"
      whileFocus="active"
      whileTap="active"
      transition={transition}
      {...rest}
    >
      {children}
    </Component>
  );
}

import { AnimatePresence, motion } from 'framer-motion';
import { useMotionMode } from './motionMode.js';

const BOLD_RISE_DISTANCE = 24;
const BOLD_DURATION = 0.6;
const BOLD_EASE = [0.16, 1, 0.3, 1];

const boldVariants = {
  hidden: { opacity: 0, y: BOLD_RISE_DISTANCE },
  visible: { opacity: 1, y: 0 },
};

const reducedVariants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};

function useBoldTreatment() {
  const motionMode = useMotionMode();
  const reduced = motionMode === 'reduced';

  return {
    variants: reduced ? reducedVariants : boldVariants,
    transition: reduced ? { duration: 0 } : { duration: BOLD_DURATION, ease: BOLD_EASE },
  };
}

export function SectionEntry({ as = 'div', children, ...rest }) {
  const { variants, transition } = useBoldTreatment();
  const Component = motion[as];

  return (
    <Component
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={transition}
      {...rest}
    >
      {children}
    </Component>
  );
}

export function OverlayTransition({ isOpen, as = 'div', children, ...rest }) {
  const { variants, transition } = useBoldTreatment();
  const Component = motion[as];

  return (
    <AnimatePresence>
      {isOpen && (
        <Component
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={transition}
          {...rest}
        >
          {children}
        </Component>
      )}
    </AnimatePresence>
  );
}

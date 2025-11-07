import { Variants } from 'framer-motion';

export const fadeIn: Variants = {
  hidden: { transform: 'translateY(1vh)', opacity: 0 },
  visible: {
    transform: 'translateY(0)',
    opacity: 1
  }
};

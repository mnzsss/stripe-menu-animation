import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    background: #fff;
    top: -6.5px;
    left: -8px;
    transform: rotate(45deg);
    border-radius: 4px 0 0 0;
  }
`;

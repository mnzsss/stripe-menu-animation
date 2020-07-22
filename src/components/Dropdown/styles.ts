import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  z-index: 10;
  position: absolute;
`;

export const DropdownContainer = styled(motion.div)`
  position: absolute;
  overflow: hidden;
  box-shadow: 0 50px 100px -20px rgba(50, 50, 93, 0.25),
    0 30px 60px -30px rgba(0, 0, 0, 0.3),
    0 -18px 60px -10px rgba(0, 0, 0, 0.025);
  background: #fff;
  border-radius: 4px;
`;

export const DropdownContainerAnimated = styled(motion.div)``;

export const WrapperPerspective = styled.div`
  perspective: 2000;
`;

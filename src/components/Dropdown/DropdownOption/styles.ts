import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.button)`
  padding: 20px 25px;
  outline: 0;
  color: #fff;
  font-size: 18px;
  transition: opacity 0.2s;

  &:hover,
  &:focus {
    opacity: 0.55;
  }
`;

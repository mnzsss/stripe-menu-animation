import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
 * {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
 }

 html{
   min-height: 100%;
 }

 body {
  background: #100f12;
  color: #ffff;
  -webkit-font-smoothing: antialiased;
 }

 body, input, button, table {
  font-size: 14px;
  font-family: 'Roboto', --apple-system, sans-serif;
 }

 button {
  border: 0;
  background: none;
 }

 ul {
   list-style: none;
   padding-left: 0;
 }

 #root {
  margin: 0;
  padding: 0;
  max-width: 100%;
 }

 button {
  cursor: pointer;
 }
`;

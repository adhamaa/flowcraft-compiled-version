import * as React from 'react';

const Rectangle = ({ width = 60, height = 50 }) => (
  <svg width={width} height={height} viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="50" rx="10" fill="#2DD4BF" />
  </svg>

);

export default Rectangle;

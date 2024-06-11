import * as React from 'react';

const Circle = ({ width = 60, height = 60 }) => (
  <svg width={width} height={height} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="30" r="30" fill="#FB7185" />
  </svg>

);

export default Circle;

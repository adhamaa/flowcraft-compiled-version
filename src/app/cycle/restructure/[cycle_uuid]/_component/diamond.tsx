import * as React from 'react';

const Diamond = ({ width = 60, height = 50 }) => (
  <svg width={width} height={height} viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M28.0794 0.695336C29.192 -0.231779 30.808 -0.231779 31.9206 0.695336L58.9206 22.6953C60.3598 23.8947 60.3598 26.1053 58.9206 27.3047L31.9206 49.3047C30.808 50.2318 29.192 50.2318 28.0794 49.3047L1.07945 27.3047C-0.359817 26.1053 -0.359814 23.8947 1.07945 22.6953L28.0794 0.695336Z" fill="#FFD700" />
  </svg>

);

export default Diamond;

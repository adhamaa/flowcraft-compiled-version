import { encode } from 'blurhash';

// Function to load an image from a given source with CORS handling
const loadImage = (src: string, crossOrigin: 'anonymous' | '' = 'anonymous'): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = crossOrigin; // Set cross-origin attribute
    img.onload = () => resolve(img);
    img.onerror = (...args: any[]) => reject(args);
    img.src = src;
  });

// Function to get image data from an HTMLImageElement
const getImageData = (image: HTMLImageElement): ImageData => {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('Failed to get canvas context');
  }
  context.drawImage(image, 0, 0);
  return context.getImageData(0, 0, image.width, image.height);
};

// Function to encode an image to a blurhash
export const encodeImageToBlurhash = async (imageUrl: string): Promise<string> => {
  const image = await loadImage(imageUrl);
  const imageData = getImageData(image);
  return encode(imageData.data, imageData.width, imageData.height, 4, 4);
};

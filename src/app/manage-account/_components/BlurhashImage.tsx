import * as React from 'react';
import { Blurhash } from 'react-blurhash';
import { encode } from 'blurhash';

interface BlurhashImageProps {
  src: string;
  width: number;
  height: number;
  alt?: string;
  children?: React.ReactNode | ((props: { blurhash: string | null, loaded: boolean, src: string }) => React.ReactNode);
}

const BlurhashImage = ({ src, width, height, alt = '', children }: BlurhashImageProps) => {
  const [blurhash, setBlurhash] = React.useState<string | null>(null);
  const [loaded, setLoaded] = React.useState<boolean>(false);

  React.useEffect(() => {
    const loadImageAndGenerateBlurhash = async () => {
      const proxyUrl = `/api/proxyImage?imageUrl=${encodeURIComponent(src)}`;
      const img = new Image();
      img.src = proxyUrl;
      img.crossOrigin = "Anonymous";

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const imageData = ctx.getImageData(0, 0, width, height);
          const hash = encode(imageData.data, width, height, 4, 4);
          setBlurhash(hash);
        }
      };
    };

    loadImageAndGenerateBlurhash();
  }, [src, width, height]);

  return (
    <div style={{ width, height, position: 'relative' }}>
      {!loaded && blurhash && (
        <Blurhash
          hash={blurhash}
          width={width}
          height={height}
          resolutionX={32}
          resolutionY={32}
          punch={1}
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
      )}
      {children ?
        typeof children === 'function' ?
          children({
            blurhash,
            loaded,
            src,
          }) :
          children :
        (
          <img
            src={src}
            alt={alt}
            onLoad={() => setLoaded(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: loaded ? 1 : 0,
              transition: 'opacity 0.5s ease',
              position: loaded ? 'relative' : 'absolute',
              top: 0,
              left: 0,
            }}
          />
        )
      }
    </div>
  );
};

export default BlurhashImage;


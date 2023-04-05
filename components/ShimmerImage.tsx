import Image, { ImageLoader } from 'next/image';

interface Props {
  src: string;
  alt?: string;
  className?: string;
  lazy?: boolean;
  w: number;
  h: number;
}

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

const imgSrcLoader: ImageLoader = ({ src, width }) => {
  //media.graphassets.com/resize=fit:clip,height:700,width:800/8EOpOQgRJeWhwbZpSilQ
  const x = src.split('/');
  x.splice(-1, 0, `resize=fit:crop,width:${width}`);
  return x.join('/');
};

export default function ({ alt, src, h, w, className, lazy }: Props) {
  return (
    <Image
      className={className}
      src={src}
      loader={imgSrcLoader}
      loading={lazy ? 'lazy' : 'eager'}
      alt={alt || ''}
      width={w}
      height={h}
      placeholder="blur"
      unoptimized
      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`}
    />
  );
}

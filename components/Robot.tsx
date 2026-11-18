/* eslint-disable @next/next/no-img-element */
export default function Robot({ src, alt, className = "", ...rest }: { src: string; alt: string; className?: string } & React.HTMLAttributes<HTMLImageElement>) {
  // Plain <img>: assets are exported PNGs from Figma placed in /public/images.
  return <img src={src} alt={alt} draggable={false} className={className} {...rest} />;
}

import { cva } from "class-variance-authority";
import type { ImageProps as NextImageProps } from "next/image";
import NextImage from "next/image";
import { twMerge } from "tailwind-merge";

type AspectRatios = "auto" | "landscape" | "square";
type BorderRadius = 24 | 8;

interface ImageProps extends NextImageProps {
  aspectRatio?: AspectRatios;
  borderRadius?: BorderRadius;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

const variants = cva(
  "relative w-full overflow-hidden object-contain overflow-hidden",
  {
    variants: {
      aspectRatio: {
        landscape: "aspect-video",
        square: "aspect-square",
        auto: "aspect-auto",
      },
      borderRadius: {
        8: "rounded-8",
        24: "rounded-24",
      },
    },
  },
);

const imageStyles = cva("", {
  variants: {
    objectFit: {
      contain: "object-contain",
      cover: "object-cover",
      fill: "object-fill",
      none: "object-none",
      "scale-down": "object-scale-down",
    },
  },
});

export const Image = ({
  aspectRatio,
  borderRadius,
  className,
  objectFit = "cover",
  width,
  height,
  ...props
}: ImageProps) => {
  const hasWidthAndHeightDefined = Boolean(width && height);
  return (
    <div
      className={twMerge(variants({ aspectRatio, borderRadius, className }))}
    >
      <NextImage
        fill={hasWidthAndHeightDefined ? false : true}
        width={width}
        height={height}
        {...props}
        className={imageStyles({ objectFit })}
      />
    </div>
  );
};

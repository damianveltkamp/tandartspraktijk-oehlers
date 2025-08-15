import { Image } from "@/components/Image/Image";

interface LogoProps {
  scale: number;
}

export const KRTLogo = ({ scale }: LogoProps) => {
  const height = 30;
  const width = 37;

  return (
    <Image
      width={scale ? width * scale : width}
      height={scale ? height * scale : height}
      src="/krt-logo.png"
      alt="Afbeelding van het logo van het KRT"
      aspectRatio="auto"
      objectFit="contain"
    />
  );
};

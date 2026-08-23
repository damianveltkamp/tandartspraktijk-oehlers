import { Image } from "@/components/Image/Image";

interface LogoProps {
  scale: number;
}

export const BevlogenTandartsenLogo = ({ scale }: LogoProps) => {
  const height = 60;
  const width = 175;

  return (
    <Image
      width={scale ? width * scale : width}
      height={scale ? height * scale : height}
      src="/bevlogen-tandartsen-logo.png"
      alt="Afbeelding van het logo van Bevlogen Tandartsen"
      aspectRatio="auto"
      objectFit="contain"
    />
  );
};

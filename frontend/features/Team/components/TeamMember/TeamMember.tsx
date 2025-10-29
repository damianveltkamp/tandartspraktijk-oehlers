import { Image } from "@/components/Image/Image";
import type { TeamMemberProps } from "./TeamMember.types";
import clsx from "clsx";

export const TeamMember = ({
  jobTitle,
  jobDescription,
  name,
  shouldBePlacedInTheMiddle,
  image,
}: TeamMemberProps) => {
  const styles = clsx(
    "flex flex-col items-center gap-10 text-center lg:text-left lg:items-start",
    {
      "col-[1/-1] m-auto w-[50%] md:col-auto md:m-0 md:w-full":
        shouldBePlacedInTheMiddle,
    },
  );

  return (
    <div className={styles}>
      <Image
        src={image.src}
        alt={image.alt}
        aspectRatio="square"
        borderRadius={8}
        className="elevation-shadow"
      />
      <h3 className="typography-headline-3">{name}</h3>
      <p className="typography-body flex flex-col">
        <span>{jobTitle}</span>
        {jobDescription && <span>{jobDescription}</span>}
      </p>
    </div>
  );
};

import { LinkButton } from "@/components/Button/Button";
import { Image } from "@/components/Image/Image";
import { CircleCheck } from "lucide-react";
import type { HeroProps } from "./Hero.types";

export const Hero = ({
  title,
  description,
  uspItems,
  linkButtons,
}: HeroProps) => {
  return (
    <>
      <div className="full-width-section subgrid bg-primary gap-y-25 pt-40 pb-150 md:p-0">
        <div className="content-section md:rounded-tr-50 md:rounded-br-50 md:bg-primary flex flex-col gap-25 md:relative md:z-10 md:row-start-1 md:w-[50%] md:gap-30 md:py-40 md:pr-40 lg:py-60 lg:pr-60 2xl:py-150 2xl:pr-110">
          <div className="content-section flex flex-col items-center gap-20 text-center md:items-start md:text-left">
            <div className="flex flex-col gap-15 md:items-start">
              <h1 className="typography-headline-1 lg:typography-hero-large text-black">
                {title}
              </h1>
              <p className="typography-body text-black">{description}</p>
            </div>
            {uspItems.length && (
              <ul className="flex flex-col gap-15">
                {uspItems.map((content) => (
                  <li
                    key={content}
                    className="typography-body flex items-center gap-15 text-black"
                  >
                    <CircleCheck className="text-red-black" />
                    {content}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {linkButtons && (
            <div className="content-section m-auto flex w-max flex-col gap-10 md:m-0">
              {/* TODO: refactor key here to the ID we will be getting from CMS. */}
              {linkButtons.map((props, index) => (
                <LinkButton key={index} {...props} className="w-full" />
              ))}
            </div>
          )}
        </div>
        <Image
          src="/hero.png"
          alt="Afbeelding van de paktijk"
          className="full-width-section hidden md:row-start-1 md:ml-auto md:block md:w-[55%]"
        />
      </div>
      <Image
        src="/hero.png"
        alt="Afbeelding van de paktijk"
        aspectRatio="landscape"
        className="content-section elevation-shadow mt-[-140px] md:hidden"
        borderRadius={24}
      />
    </>
  );
};

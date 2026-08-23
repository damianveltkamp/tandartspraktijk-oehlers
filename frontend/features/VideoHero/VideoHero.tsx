import { LinkButton } from "@/components/Button/Button";
import { Image } from "@/components/Image/Image";
import type { VideoHeroProps } from "./VideoHero.types";

export const VideoHero = ({
  title,
  description,
  uspItems,
  linkButtons,
  poster,
  videoUrl,
}: VideoHeroProps) => {
  return (
    <section className="full-width-section subgrid relative -mt-[var(--header-height)] min-h-[max(640px,100svh)] grid-rows-[1fr_auto] lg:min-h-[max(720px,100svh)]">
      {videoUrl ? (
        <video
          aria-hidden="true"
          autoPlay
          className="absolute inset-0 size-full object-cover object-[62%_38%] lg:object-[60%_45%]"
          loop
          muted
          playsInline
          poster={poster.src}
          preload="auto"
          src={videoUrl}
          tabIndex={-1}
        />
      ) : (
        <Image
          src={poster.src}
          alt={poster.alt}
          className="absolute inset-0 size-full object-[62%_38%] lg:object-[60%_45%]"
          loading="eager"
          fetchPriority="high"
        />
      )}

      <div className="hero-scrim absolute inset-0" aria-hidden="true" />
      <div className="hero-scrim-edges absolute inset-0" aria-hidden="true" />

      <div className="content-section relative z-10 flex items-end pt-[var(--header-height)] pb-[60px] lg:items-center lg:pb-0">
        <div className="max-w-[620px] text-white">
          <h1 className="typography-hero-xl mb-[18px] text-balance">{title}</h1>
          <p className="mb-[32px] max-w-[470px] text-[16px] leading-[1.6] text-white/80 lg:text-[19px]">
            {description}
          </p>

          {linkButtons?.length && (
            <div className="mb-[26px] flex flex-col items-stretch gap-10 sm:flex-row sm:items-center sm:gap-15 lg:mb-[32px]">
              {linkButtons.map((props, index) => (
                <LinkButton
                  key={props.href}
                  {...props}
                  className="text-center"
                  shape="pill"
                  variant={index === 0 ? "secondary" : "whiteGhost"}
                />
              ))}
            </div>
          )}

          {!!uspItems.length && (
            <ul className="flex flex-col gap-10 lg:gap-15">
              {uspItems.map((content) => (
                <li
                  key={content}
                  className="flex items-center gap-[11px] text-[14px] text-white/85 lg:text-[15px]"
                >
                  <span
                    aria-hidden="true"
                    className="bg-primary flex size-20 shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold text-black"
                  >
                    ✓
                  </span>
                  {content}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <span className="content-section relative z-10 mb-[34px] hidden items-center gap-10 text-[12px] font-semibold tracking-[0.18em] text-white/60 uppercase before:block before:h-[26px] before:w-px before:bg-white/40 md:flex">
        Scroll
      </span>
    </section>
  );
};

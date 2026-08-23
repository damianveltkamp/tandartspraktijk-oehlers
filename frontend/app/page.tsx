import { getHomepageQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";

import { Image } from "@/components/Image/Image";
import { VideoHero } from "@/features/VideoHero/VideoHero";
import { Team } from "@/features/Team/Team";
import { Services } from "@/features/Services/Services";
import { AccordionBlock } from "@/features/AccordionBlock/AccordionBlock";
import { Contact } from "@/features/Contact/Contact";
import { videoHeroAdapter } from "@/adapters/objects/videoHero";
import { teamAdapter } from "@/adapters/objects/team";
import { servicesAdapter } from "@/adapters/objects/services";
import { accordionBlockAdapter } from "@/adapters/objects/accordion";
import { contactAdapter } from "@/adapters/objects/contact";
import { imageAdapter } from "@/adapters/objects/image";

export default async function Home() {
  const [{ data: page }] = await Promise.all([
    sanityFetch({ query: getHomepageQuery }),
  ]);

  const hero = videoHeroAdapter(page?.hero);
  const team = teamAdapter(page?.team);
  const services = servicesAdapter(page?.services);
  const faq = accordionBlockAdapter(page?.faq);
  const treatments = accordionBlockAdapter(page?.treatments);
  const contact = contactAdapter(page?.contact);
  const emergencyContact = contactAdapter(page?.emergencyService);
  const image = imageAdapter(page?.image);

  return (
    <div className="main-grid">
      {hero && <VideoHero {...hero} />}
      <div className="subgrid full-width-section gap-y-40 lg:gap-y-60">
        {team && <Team className="content-section" {...team} />}
        {services && <Services className="content-section" {...services} />}
        {treatments && (
          <AccordionBlock
            id="feature-treatments"
            className="content-section"
            {...treatments}
          />
        )}
        {image && (
          <Image
            src={image.src}
            alt={image.alt}
            aspectRatio="landscape"
            borderRadius={24}
            className="content-section hidden lg:block"
          />
        )}
        {/* Full-bleed blue band behind the FAQ on small screens only; the
            extra bottom padding leaves room for the image that pulls itself up
            over it. Stays a subgrid at every breakpoint so the FAQ's own
            `content-section` keeps resolving against the page grid -- switching
            this to `display: block` at lg detached it from the grid and let it
            run the full viewport width. */}
        <div className="subgrid full-width-section bg-primary py-40 pb-[150px] lg:bg-transparent lg:p-0">
          {faq && (
            <AccordionBlock
              id="feature-faq"
              className="content-section"
              {...faq}
            />
          )}
        </div>
        {image && (
          <Image
            src={image.src}
            alt={image.alt}
            aspectRatio="landscape"
            borderRadius={24}
            className="content-section mt-[-140px] lg:hidden"
          />
        )}
        {contact && (
          <Contact id="contact" className="content-section" {...contact} />
        )}
        {emergencyContact && (
          <Contact
            id="emergency-contact"
            className="content-section"
            {...emergencyContact}
          />
        )}
      </div>
    </div>
  );
}

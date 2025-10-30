import { getHomepageQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";

import { Image } from "@/components/Image/Image";
import { Hero } from "@/features/Hero/Hero";
import { Team } from "@/features/Team/Team";
import { AsideSectionNavigation } from "@/features/AsideSectionNavigation/AsideSectionNavigation";
import { Services } from "@/features/Services/Services";
import { AccordionBlock } from "@/features/AccordionBlock/AccordionBlock";
import { Contact } from "@/features/Contact/Contact";
import { heroAdapter } from "@/adapters/objects/hero";
import { teamAdapter } from "@/adapters/objects/team";
import { servicesAdapter } from "@/adapters/objects/services";
import { accordionBlockAdapter } from "@/adapters/objects/accordion";
import { contactAdapter } from "@/adapters/objects/contact";
import { imageAdapter } from "@/adapters/objects/image";

export default async function Home() {
  const [{ data: page }] = await Promise.all([
    sanityFetch({ query: getHomepageQuery }),
  ]);

  const hero = heroAdapter(page?.hero);
  const team = teamAdapter(page?.team);
  const services = servicesAdapter(page?.services);
  const faq = accordionBlockAdapter(page?.faq);
  const treatments = accordionBlockAdapter(page?.treatments);
  const contact = contactAdapter(page?.contact);
  const emergencyContact = contactAdapter(page?.emergencyService);
  const image = imageAdapter(page?.image);

  return (
    <div className="main-grid">
      {hero && <Hero {...hero} />}
      <div className="subgrid full-width-section lg:content-section lg:flex lg:gap-60">
        <AsideSectionNavigation
          title="Op deze pagina"
          navigationItems={[
            { text: "Ons team", slug: "#feature-team" },
            { text: "Onze diensten", slug: "#feature-services" },
            { text: "Onze behandelingen", slug: "#feature-treatments" },
            { text: "Veelgestelde vragen", slug: "#feature-faq" },
            { text: "Contact", slug: "#contact" },
            { text: "Spoeddienst", slug: "#emergency-contact" },
          ]}
        />
        <div className="subgrid full-width-section gap-y-40 lg:flex lg:flex-1 lg:flex-col lg:gap-y-60">
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
          <div className="subgrid full-width-section bg-primary py-40 pb-[150px] lg:block lg:bg-transparent lg:p-0">
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
    </div>
  );
}

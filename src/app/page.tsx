import { Image } from "@/components/Image/Image";
import { Hero } from "@/features/Hero/Hero";
import { Team } from "@/features/Team/Team";
import { AsideSectionNavigation } from "@/features/AsideSectionNavigation/AsideSectionNavigation";
import { Services } from "@/features/Services/Services";
import { Treatments } from "@/features/Treatments/Treatments";
import { FAQ } from "@/features/FAQ/FAQ";
import { Contact } from "@/features/Contact/Contact";

export default function Home() {
  return (
    <div className="main-grid">
      <Hero
        title="Uw gebit, is onze passie."
        description="wij bieden persoonlijke, deskundige zorg voor jong en oud."
        uspItems={[{ content: "Hoge kwaliteit" }, { content: "Snel geholpen" }]}
      />
      <div className="subgrid full-width-section lg:content-section lg:flex lg:gap-60">
        <AsideSectionNavigation
          title="Op deze pagina"
          navigationItems={[
            { text: "Ons team", slug: "#feature-team" },
            { text: "Onze diensten", slug: "#feature-services" },
            { text: "Veelgestelde vragen", slug: "#feature-faq" },
            { text: "Contact", slug: "#contact" },
            { text: "Spoeddienst", slug: "#emergency-contact" },
          ]}
        />
        <div className="subgrid full-width-section gap-y-40 lg:flex lg:flex-1 lg:flex-col lg:gap-y-60">
          <Team
            className="content-section"
            title="Ons team"
            description="Ons kleine, toegewijde team staat elke dag met passie en persoonlijke aandacht voor u klaar. Uw comfort en tevredenheid staan bij ons voorop!"
            teamMembers={[
              {
                name: "Ryan Oehlers",
                jobtitle: "Tandarts BIG nr. 99046523802",
              },
              {
                name: "Isabel Hartog",
                jobtitle: "Praktijkmanager / tandartsassistente",
              },
              {
                name: "Judith Engel",
                jobtitle: "Tandartsassistente",
              },
            ]}
          />
          <Services
            className="content-section"
            title="Onze diensten"
            description="Vanuit het keurmerk KNMT communiceren alle aangesloten tandartsen een
            lijst van eventueel bijkomende tarieven. Hiermee hopen wij onze
            dienstverlening transparant te houden voor onze patiënten."
            buttonText="Indicatie kosten overzicht"
          />
          <Treatments
            className="content-section"
            title="Behandelingen"
            treatments={[
              {
                title: "Wortelkanaal behandeling",
                description: "CONTENT GOES HERE",
              },
              {
                title: "Bleken",
                description: "CONTENT GOES HERE",
              },
              {
                title: "Reguliere controle",
                description:
                  "CONTENT GOES HERE CONTENT GOES HERE CONTENT GOES HERE CONTENT GOES HERE CONTENT GOES HERE CONTENT GOES HERE  CONTENT GOES HERE CONTENT GOES HERE CONTENT GOES HERECONTENT GOES HERE CONTENT GOES HERE CONTENT GOES HERE CONTENT GOES HERE CONTENT GOES HERE CONTENT GOES HERE",
              },
            ]}
          />
          <Image
            src="/hero.png"
            alt="Afbeelding van de paktijk"
            aspectRatio="landscape"
            borderRadius={24}
            className="content-section hidden lg:block"
          />
          <div className="subgrid full-width-section bg-primary py-40 pb-[150px] lg:block lg:bg-transparent lg:p-0">
            <FAQ
              className="content-section"
              title="Vragen? Wij helpen je graag op weg!"
              faqItems={[
                {
                  title: "Is er parkeergelegenheid voor de deur?",
                  description: "Ja",
                },
                {
                  title: "Bij pijn klachten wie moet ik bellen?",
                  description:
                    "Maandag tot en met donderdag zijn wij bereikbaar van 08:00 tot 12:00 en van 13:00 tot 17:00. In het weekend kan je bellen naar de mondzorgpolie 088-2632727",
                },
              ]}
            />
          </div>
          <Image
            src="/hero.png"
            alt="Afbeelding van de paktijk"
            aspectRatio="landscape"
            borderRadius={24}
            className="content-section mt-[-140px] lg:hidden"
          />
          <Contact
            id="contact"
            className="content-section"
            title="Contact"
            description="Onze praktijk is geopend tussen 08:00 en 17:00 op maandag tot en met donerdag."
            contactDetails={{
              phoneNumber: {
                title: "020 482 3573",
                url: "020 482 3573",
              },
              email: {
                title: "info@tandartsoehlers.nl",
                url: "info@tandartsoehlers.nl",
              },
            }}
          />
          <Contact
            id="emergency-contact"
            className="content-section"
            title="Spoeddienst"
            description="In geval van pijnklachten die niet kunnen wachten en nabloedingen, kunt u telefonisch contact opnemen met de mondzorgpoli. De mondzorgpoli is 24/7 telefonisch bereikbaar."
            contactDetails={{
              phoneNumber: {
                title: "020 482 3573",
                url: "020 482 3573",
              },
              location: {
                title: "Louwesweg 6, 1066 EC Amsterdam",
                url: "https://www.google.com/maps/place/Louwesweg+6,+1066+EC+Amsterdam/@52.3482414,4.8239776,19z/data=!3m1!4b1!4m6!3m5!1s0x47c5e22801e05031:0x503c1e32110c8b6c!8m2!3d52.3482414!4d4.8246213!16s%2Fg%2F11vx4548_t?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
              },
              website: {
                title: "mondzorgpoli.nl",
                url: "https://www.mondzorgpoli.nl/",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

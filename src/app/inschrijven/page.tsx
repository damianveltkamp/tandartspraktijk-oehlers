import { EnrollForm } from "@/features/EnrollForm/EnrollForm";
import { Hero } from "@/features/Hero/Hero";

export default async function Home() {
  return (
    <div className="main-grid">
      <Hero
        title="Word patiënt bij Oehlers - uw gebit, is onze passie."
        description="Gebruik onderstaand formulier om u in te schrijven bij onze praktijk. Zodra wij de inschrijving ontvangen hebben, zullen wij deze verwerken. Wij nemen dan spoedig contact met u op om de eerste afspraak in te plannen."
        uspItems={[{ content: "Hoge kwaliteit" }, { content: "Snel geholpen" }]}
        linkButtons={[
          {
            isExternal: false,
            href: "/#contact",
            children: "Kom in contact met ons",
            variant: "blackGhost",
          },
        ]}
      />
      <EnrollForm className="content-section" />
    </div>
  );
}

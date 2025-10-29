import { Link } from "@/components/Link/Link";
import { Logo } from "@/components/Logo/Logo";

export const Header = () => {
  return (
    <header className="main-grid relative py-20">
      <div className="content-section flex items-center justify-between">
        <Link
          isExternal={false}
          href="/"
          aria-label="Ga naar de homepagina van Tandartspraktijk Oehlers."
        >
          <Logo />
        </Link>
      </div>
    </header>
  );
};

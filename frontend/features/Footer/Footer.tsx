import { Link } from "@/components/Link/Link";
import { LEGAL_PAGES } from "@/constants/legal";

export const Footer = () => {
  return (
    <footer className="bg-primary mt-40 flex flex-col items-center gap-15 p-20 text-center lg:mt-60">
      <nav aria-label="Juridische informatie">
        <ul className="flex flex-wrap justify-center gap-x-20 gap-y-5">
          {Object.values(LEGAL_PAGES).map(({ href, label }) => (
            <li key={href}>
              <Link
                isExternal={false}
                href={href}
                className="typography-body-small hocus:no-underline underline"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <p>© Copyright - Tandartspraktijk Oehlers</p>
    </footer>
  );
};

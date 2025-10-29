import { ArrowRight } from "lucide-react";

interface NavigationItem {
  slug: string;
  text: string;
}

interface AsideSectionNavigationProps {
  navigationItems: NavigationItem[];
  title: string;
}

export const AsideSectionNavigation = ({
  title,
  navigationItems,
}: AsideSectionNavigationProps) => {
  return (
    <aside className="lg:rounded-8 hidden lg:sticky lg:top-40 lg:flex lg:h-fit lg:w-[370px] lg:flex-col lg:gap-20 lg:bg-gray-100 lg:p-40">
      <h2 className="typography-headline-2">{title}</h2>
      {navigationItems.length && (
        <ul className="flex flex-col gap-20">
          {navigationItems.map(({ text, slug }) => (
            <li key={slug} className="border-b-1 border-b-black">
              <a href={slug} className="typography-body flex justify-between">
                {text}
                <ArrowRight />
              </a>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

import { Menu } from "lucide-react";
import { Logo } from "../Logo/Logo";

export const Header = () => {
  return (
    <header className="main-grid py-20">
      <div className="content-section flex justify-between items-center">
        <Logo />
        {/* TODO: add click functionality + create the mobile menu */}
        <Menu />
      </div>
    </header>
  );
};

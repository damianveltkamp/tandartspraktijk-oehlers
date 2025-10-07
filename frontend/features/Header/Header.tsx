import { Logo } from "@/components/Logo/Logo";

export const Header = () => {
  return (
    <header className="main-grid relative py-20">
      <div className="content-section flex items-center justify-between">
        <Logo />
      </div>
    </header>
  );
};

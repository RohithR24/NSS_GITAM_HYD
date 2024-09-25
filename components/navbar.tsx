import { hamburger } from "../public/icons/index";
import { navLinks } from "../constants/index";
import { logo } from "../public/images/index";
import Image from "next/image";

const NavBar = () => {
  return (
    <header className="absolute z-10 w-full container mx-auto px-4 py-8 flex justify-center items-center">
      <nav className="flex justify-between items-center max-container text-white">
        <a href="/">
          <Image
            src={logo}
            alt="NSS Logo"
            height={40}
            width={40}
            className="m-0 w-[40px] h-[40px]"
          />
        </a>
        <ul className="relative flex-1 flex justify-center items-center pl-10 gap-16 max-lg:hidden">
          {navLinks.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="font-montserrat leading-normal text-lg text-slate-gray"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden max-lg:block">
          <img src={hamburger} alt="hamburger icon" width={25} height={25} />
        </div>
      </nav>
    </header>
  );
};

export default NavBar;

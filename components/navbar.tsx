import { hamburger } from "../public/icons/index";
import { navLinks } from "../constants/index";
import Image from "next/image";

const NavBar = () => {
  return (
    <header className="py-8 absolute z-10 w-full">
      <nav className="flex justify-between items-center max-container">
        <a href="/">
          {/* <img src={headerLogo} alt="Nike Logo" height={10} width={120} /> */}
        </a>
          <ul className=" flex justify-between items-center gap-16  max-lg:hidden">
            {navLinks.map((item) => (
              <li key={item.label} className="font-montserrat leading-normal text-lg text-slate-600">{item.label}</li>
            ))}
          </ul>
          <div className="flex gap-2 text-lg leading-normal font-medium font-montserrat max-lg:hidden wide:mr-24">
          </div>
          <div className=" hidden max-lg:block">
            <Image src={hamburger} alt="hamburger" height={10} width={20}/>
          </div>
      </nav>
    </header>
  );
};

export default NavBar;

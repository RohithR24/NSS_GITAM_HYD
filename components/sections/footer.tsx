import { footerLinks, socialMedia } from "@/constants/index";
import { copyrightSign } from "@/public/icons";
import { logo, NSSLogo } from "@/public/images";
import Image from "next/image"; 


const footer = () => {
  return (
    <footer className="max-container">
      {/* Nike logo and content */}
      <div className="flex justify-between items-start gap-20 max-lg:flex-col flex-wrap">
        <div className="flex flex-col items-start">
          <a href="/">
            <Image
              src={logo}
              alt="logo"
              width={150}
              height={46}
              className="m-0"
            />
          </a>
          <p className="info-text max-w-sm mt-10 sm:max-w-sm text-white">
          NSS GITAM Deemed To Be University
          </p>

          {/* Social logos */}
          <div className="flex items-center gap-5 mt-8">
            {socialMedia.map((logo, index) => (
              <a href="/" key={index} className=" bg-white rounded-full p-2">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={25}
                  height={25}
                  className="m-0"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Product links */}
        <div className="flex flex-1 flex-wrap justify-between gap-10 text-white ">
          {footerLinks.map((link, index) => (
            <div key={index}>
              <h4 className="text-xl mb-3">{link.title}</h4>
              <ul className="info-text">
                {link.links.map((item, index) => (
                  <li key={index}>
                    <a href="/">{item.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright section */}
      <div className="flex justify-between py-10 info-text max-sm:flex-col max-sm:items-center ">
        <p className="flex gap-2 justify-start items-center cursor-pointer text-white">
          <a href="/" className=" ">
            <Image
              src={copyrightSign}
              alt={"copyrightSign"}
              width={20}
              height={20}
              className="m-0 rounded-full"
            />
          </a>
          Copyright. All rights reserved.
        </p>
        <p className=" cursor-pointer">Terms & Conditions</p>
      </div>
    </footer>
  );
};

export default footer;
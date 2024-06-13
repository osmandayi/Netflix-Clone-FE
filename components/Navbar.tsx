import React, { useCallback, useEffect, useState } from "react";
import {
  BellIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import NavItem from "./NavItem";
import MobileMenu from "./MobileMenu";
import AccountMenu from "./AccountMenu";

const navbarItems = [
  {
    id: 1,
    name: "Home",
    isActive: true,
  },
  {
    id: 2,
    name: "Movies",
    isActive: false,
  },
  {
    id: 3,
    name: "Series",
    isActive: false,
  },
  {
    id: 4,
    name: "New & Popular",
    isActive: false,
  },
  {
    id: 5,
    name: "My List",
    isActive: false,
  },
  {
    id: 6,
    name: "Brows My Languages",
    isActive: false,
  },
];
const ImagesUserProfile = ["blue", "green", "red", "slate"];

const Navbar = () => {
  const [mobilMenu, setMobilMenu] = useState(false);
  const [accountMenu, setAccountMenu] = useState(false);
  const [ImgSrc, setImgSrc] = useState("red");

  const [showBack, setShowBack] = useState(false);
  const topOffset = 65;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= topOffset) {
        setShowBack(true);
      } else {
        setShowBack(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const ToggleMobileMenu = useCallback(() => {
    setMobilMenu((current) => !current);
  }, []);
  const ToggleAccountMenu = useCallback(() => {
    setAccountMenu((current) => !current);
  }, []);

  const trySomething = useCallback(() => {
    const src =
      localStorage.getItem("activeProfile") ??
      ImagesUserProfile[Math.floor(Math.random() * 4)];
    setImgSrc(src);
  }, []);

  useEffect(() => {
    trySomething();
  }, []);

  return (
    <nav className="w-full fixed z-20">
      <div
        className={`px-4 py-6 flex flex-row transition ${
          showBack && "bg-zinc-950 bg-opacity-90"
        }`}
      >
        <img src="/images/logo.png" alt="" className="h-6 lg:h-8" />
        <div className="lg:flex flex-row hidden gap-7 ml-12">
          {navbarItems?.map((item) => (
            <NavItem key={item.id} name={item.name} active={item.isActive} />
          ))}
        </div>
        <div
          onClick={ToggleMobileMenu}
          className="relative lg:hidden flex flex-row items-center gap-2 ml-6 cursor-pointer"
        >
          <p className="text-white">Browse</p>
          <ChevronDownIcon className="w-5 text-white" />
          <MobileMenu visible={mobilMenu} items={navbarItems} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="cursor-pointer">
            <MagnifyingGlassIcon className="w-5 text-white" />
          </div>
          <div className="cursor-pointer">
            <BellIcon className="w-5 text-white" />
          </div>
          <div
            onClick={ToggleAccountMenu}
            className="relative flex flex-row ml-auto gap-2 items-center"
          >
            <div className="rounded-lg overflow-hidden cursor-pointer">
              <img
                src={`/images/default-${ImgSrc}.png`}
                alt=""
                className="w-6 h-6 lg:w-8 lg:h-8"
              />
            </div>
            <ChevronDownIcon className="w-5 text-white cursor-pointer" />
            <AccountMenu visible={accountMenu} ImgSrc={ImgSrc} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

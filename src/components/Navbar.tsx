import { useCallback, useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";

import {
  Navbar as ResizableNavbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "./ui/resizable-navbar";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

import { useLoading } from "../context/LoadingProvider";
import sandeshPortrait from "../assets/sandesh_portrait.png";


const Navbar = () => {
  const { isLoading } = useLoading();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleVisibilityChange = useCallback((visible: boolean) => {
    setIsScrolled(visible);
  }, []);


  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    
    if (isLoading) {
      smoother.paused(true);
    } else {
      smoother.paused(false);
      document.body.style.overflowY = "auto";
      document.getElementsByTagName("main")[0]?.classList.add("main-active");
    }

    const handleResize = () => {
      ScrollSmoother.refresh(true);
    };
    
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      if (smoother) {
        smoother.kill();
      }
    };
  }, [isLoading]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, section: string) => {
    // Handle route-based links (like /about)
    if (section.startsWith("/")) {
      e.preventDefault();
      window.location.href = section;
      return;
    }
    if (window.innerWidth > 1024) {
      e.preventDefault();
      if (smoother) {
        smoother.scrollTo(section, true, "top top");
      }
    }
  };

  const navItems = [
    { name: "About", link: "/about" },
    { name: "Experience", link: "#experience" },
    { name: "Work", link: "#work" },
  ];

  return (
    <>
      <ResizableNavbar onVisibilityChange={handleVisibilityChange}>
        {/* Desktop Navigation */}
        <NavBody>
          {!isScrolled ? (
            <>
              {/* Left: Portrait with green availability dot */}
              <div className="relative z-20 flex-shrink-0">
                <img
                  src={sandeshPortrait}
                  alt="Sandesh Gadakh"
                  className="w-10 h-10 rounded-full object-cover border-2 border-white/10"
                />
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-lime-400 border-[2.5px] border-neutral-950 shadow-[0_0_8px_rgba(163,230,53,0.4)]" />
              </div>

              {/* Center: Nav links */}
              <NavItems items={navItems} onItemClick={handleScroll} />

              {/* Right: White Contact button */}
              <a
                href="#contact"
                onClick={(e) => handleScroll(e, "#contact")}
                className="relative z-20 flex-shrink-0 px-6 py-2 bg-white text-black rounded-full font-semibold text-sm hover:bg-neutral-200 transition duration-200 cursor-pointer"
                data-cursor="disable"
              >
                Contact
              </a>
            </>
          ) : (
            <div className="flex items-center justify-center w-full">
              <a
                href="#contact"
                onClick={(e) => handleScroll(e, "#contact")}
                className="flex items-center gap-3 group py-1"
                data-cursor="disable"
              >
                <img
                  src={sandeshPortrait}
                  alt="Sandesh Gadakh"
                  className="w-7 h-7 rounded-full object-cover border border-white/20 shadow-md group-hover:scale-105 transition-all duration-300"
                />
                <span className="text-[13px] font-medium tracking-wide text-neutral-200 group-hover:text-white transition duration-200">
                  Available for work
                </span>
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
                </span>
              </a>
            </div>
          )}
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          {!isScrolled ? (
            <>
              <MobileNavHeader>
                <div className="relative flex-shrink-0">
                  <img
                    src={sandeshPortrait}
                    alt="Sandesh Gadakh"
                    className="w-9 h-9 rounded-full object-cover border-2 border-white/10"
                  />
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-lime-400 border-2 border-neutral-950" />
                </div>
                <MobileNavToggle
                  isOpen={isMobileMenuOpen}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                />
              </MobileNavHeader>

              <MobileNavMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
              >
                {navItems.map((item, idx) => (
                  <a
                    key={`mobile-link-${idx}`}
                    href={item.link}
                    onClick={(e) => {
                      setIsMobileMenuOpen(false);
                      handleScroll(e, item.link);
                    }}
                    className="relative text-lg font-medium text-neutral-300 hover:text-white transition duration-200"
                  >
                    <span className="block">{item.name}</span>
                  </a>
                ))}
                <div className="flex w-full flex-col gap-4 mt-4">
                  <a
                    href="#contact"
                    className="w-full py-2.5 bg-white text-black rounded-full font-semibold text-sm text-center hover:bg-neutral-200 transition duration-200"
                    onClick={(e) => {
                      setIsMobileMenuOpen(false);
                      handleScroll(e, "#contact");
                    }}
                    data-cursor="disable"
                  >
                    Contact
                  </a>
                </div>
              </MobileNavMenu>
            </>
          ) : (
            <div className="flex items-center justify-center w-full">
              <a
                href="#contact"
                onClick={(e) => handleScroll(e, "#contact")}
                className="flex items-center gap-3 group py-1"
                data-cursor="disable"
              >
                <img
                  src={sandeshPortrait}
                  alt="Sandesh Gadakh"
                  className="w-7 h-7 rounded-full object-cover border border-white/20 shadow-md group-hover:scale-105 transition-all duration-300"
                />
                <span className="text-[13px] font-medium tracking-wide text-neutral-200 group-hover:text-white transition duration-200">
                  Available for work
                </span>
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
                </span>
              </a>
            </div>
          )}
        </MobileNav>
      </ResizableNavbar>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;


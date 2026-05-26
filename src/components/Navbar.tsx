import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { motion, AnimatePresence } from "framer-motion";
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

import { useLoading } from "../context/LoadingProvider";
import sandeshPortrait from "../assets/sandesh_portrait.png";

const Navbar = () => {
  const { isLoading } = useLoading();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const smoother = ScrollSmoother.get();

  useEffect(() => {
    if (!smoother) return;

    if (isLoading) {
      smoother.paused(true);
    } else {
      smoother.paused(false);
      document.body.style.overflowY = "auto";
      document.getElementsByTagName("main")[0]?.classList.add("main-active");
    }
  }, [isLoading, smoother]);

  // Track active section on the home page for dynamic navbar highlighting
  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection(null);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === "landingDiv") {
              setActiveSection("/");
            } else if (entry.target.id === "work") {
              setActiveSection("#work");
            }
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px -40% 0px" }
    );

    // Wait a tick for elements to be available
    const timeout = setTimeout(() => {
      const landing = document.getElementById("landingDiv");
      const work = document.getElementById("work");

      if (landing) observer.observe(landing);
      if (work) observer.observe(work);
    }, 100);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [location.pathname]);

  /**
   * Universal nav handler.
   * - `/route` links → react-router navigate (SPA, no page reload)
   * - `#hash` links → if on home, smooth-scroll; if on another page, route to "/" then scroll
   */
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
      e.preventDefault();
      setIsMobileMenuOpen(false);

      // Route link
      if (target.startsWith("/")) {
        if (location.pathname !== target) navigate(target);
        return;
      }

      // Hash link
      if (target.startsWith("#")) {
        if (location.pathname !== "/") {
          // Navigate to home, then scroll once mounted
          navigate("/", { state: { scrollTo: target } });
          return;
        }
        // On home: prefer ScrollSmoother on desktop, native on mobile
        if (window.innerWidth > 1024 && smoother) {
          smoother.scrollTo(target, true, "top top");
        } else {
          const el = document.querySelector(target);
          el?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    },
    [location.pathname, navigate, smoother]
  );

  // Handle deferred hash-scroll after cross-page navigation (e.g. /about → / → #experience)
  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo && location.pathname === "/") {
      const target = state.scrollTo;
      // Wait for the home page to mount and smoother to be ready
      const t = setTimeout(() => {
        if (window.innerWidth > 1024 && smoother) {
          smoother.scrollTo(target, true, "top top");
        } else {
          document.querySelector(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        // Clear state so refresh doesn't re-trigger
        window.history.replaceState({}, "");
      }, 500);
      return () => clearTimeout(t);
    }
  }, [location, smoother]);

  const navItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Work", link: "/work" },
    { name: "Blogs", link: "/blogs" },
  ];

  // Determine active link for highlighting
  const activeLink = activeSection || location.pathname;

  return (
    <>
      <ResizableNavbar>
        {/* ════════════ DESKTOP ════════════ */}
        <NavBody>
          {/* ── Left: Portrait (always visible, smoothly resizes) ── */}
          <motion.div
            className="relative flex-shrink-0 z-20"
          >
            <motion.img
              src={sandeshPortrait}
              alt="Sandesh Gadakh"
              style={{
                width: 38,
                height: 38,
              }}
              className="rounded-full object-cover ring-2 ring-[var(--border)] shadow-lg shadow-black/30"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[var(--accent)] border-2 border-[#0a0e17] shadow-[0_0_8px_var(--shadow-glow)]" />
          </motion.div>

          {/* ── Center: Nav links (always visible, no absolute positioning) ── */}
          <NavItems
            items={navItems}
            activeLink={activeLink}
            onItemClick={handleNavClick}
          />

          {/* ── Right: Simple Contact CTA ── */}
          <div className="flex-shrink-0 relative">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="btn-primary py-1.5 px-5 h-8 text-[13px]"
              data-cursor="disable"
            >
              Contact
            </a>
          </div>
        </NavBody>

        {/* ════════════ MOBILE ════════════ */}
        <MobileNav>
          <MobileNavHeader>
            {/* Portrait */}
            <motion.div className="relative flex-shrink-0">
              <motion.img
                src={sandeshPortrait}
                alt="Sandesh Gadakh"
                style={{
                  width: 36,
                  height: 36,
                }}
                className="rounded-full object-cover ring-2 ring-white/10 shadow-md"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[var(--accent)] border-2 border-neutral-950" />
            </motion.div>

            {/* Center: Name */}
            <div className="flex-1 flex items-center justify-center min-w-0 px-2">
              <span className="text-[13px] font-semibold tracking-wide text-white truncate">
                Sandesh
              </span>
            </div>

            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          {/* Mobile menu */}
          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => {
              const isActive =
                activeLink === item.link ||
                (item.link.startsWith("/") && activeLink === item.link);
              return (
                <a
                  key={`mobile-link-${idx}`}
                  href={item.link}
                  onClick={(e) => handleNavClick(e, item.link)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-base font-medium transition-colors ${isActive
                    ? "bg-white/[0.08] text-white"
                    : "text-neutral-300 hover:bg-white/[0.05]"
                    }`}
                >
                  <span>{item.name}</span>
                  <span className="text-neutral-400 dark:text-neutral-500 text-sm">↗</span>
                </a>
              );
            })}

            {/* Contact CTA */}
            <a
              href="#contact"
              className="w-full py-2.5 mt-2 btn-primary"
              onClick={(e) => handleNavClick(e, "#contact")}
              data-cursor="disable"
            >
              Let's Talk →
            </a>
          </MobileNavMenu>
        </MobileNav>
      </ResizableNavbar>
    </>
  );
};

export default Navbar;

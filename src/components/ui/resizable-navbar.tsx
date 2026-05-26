"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";

import React, { useRef, useState } from "react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
  onVisibilityChange?: (visible: boolean) => void;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  activeLink?: string;
  onItemClick?: (e: React.MouseEvent<HTMLAnchorElement>, link: string) => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

/* ════════════════════════════════════════════════
   ROOT NAVBAR — scroll-tracked container
   ════════════════════════════════════════════════ */
export const Navbar = ({ children, className, onVisibilityChange }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Hysteresis: enter compact at 80px, exit at 40px — prevents threshold flicker
    const next = visible ? latest > 40 : latest > 80;
    if (next !== visible) {
      setVisible(next);
      onVisibilityChange?.(next);
    }
  });

  return (
    <motion.div
      ref={ref}
      className={cn("fixed inset-x-0 top-0 z-40 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </motion.div>
  );
};

/* ════════════════════════════════════════════════
   DESKTOP NAV BODY — smooth resize, no width jumps
   ════════════════════════════════════════════════ */
export const NavBody = ({ children, className }: NavBodyProps) => {
  return (
    <div
      className={cn(
        "relative z-[60] mx-auto hidden lg:flex flex-row items-center justify-between gap-3",
        "rounded-full px-3 py-2 w-full max-w-[680px]",
        "bg-[#0a0e17]/85 backdrop-blur-xl saturate-150 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
        "mt-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

/* ════════════════════════════════════════════════
   NAV ITEMS — flex-layout (NOT absolute), active state
   ════════════════════════════════════════════════ */
export const NavItems = ({ items, className, activeLink, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "flex flex-row items-center justify-center gap-1 text-sm font-medium",
        className,
      )}
    >
      {items.map((item, idx) => {
        const isActive = activeLink && (activeLink === item.link || activeLink.startsWith(item.link + "/"));
        return (
          <a
            onMouseEnter={() => setHovered(idx)}
            onClick={(e) => onItemClick?.(e, item.link)}
            className={cn(
              "relative px-4 py-1.5 rounded-full transition-colors duration-200",
              isActive
                ? "text-[var(--text-primary)]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
            )}
            key={`link-${idx}`}
            href={item.link}
          >
            {hovered === idx && (
              <motion.div
                layoutId="nav-hovered"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                className="absolute inset-0 h-full w-full rounded-full bg-white/5"
              />
            )}
            {isActive && hovered !== idx && (
              <motion.div
                layoutId="nav-active"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                className="absolute inset-0 h-full w-full rounded-full bg-white/10"
              />
            )}
            <span className="relative z-20 whitespace-nowrap">{item.name}</span>
            {isActive && (
              <motion.div 
                layoutId="nav-active-dot" 
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--accent)]" 
              />
            )}
          </a>
        );
      })}
    </motion.div>
  );
};

/* ════════════════════════════════════════════════
   MOBILE NAV
   ════════════════════════════════════════════════ */
export const MobileNav = ({ children, className }: MobileNavProps) => {
  return (
    <div
      className={cn(
        "relative z-50 mx-auto flex flex-col items-stretch justify-between lg:hidden",
        "px-4 py-2 mt-4 rounded-full w-[calc(100%-32px)]",
        "bg-[#0a0e17]/85 backdrop-blur-xl saturate-150 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between gap-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
          className={cn(
            "absolute inset-x-2 top-[calc(100%+8px)] z-50 flex w-auto flex-col items-stretch justify-start gap-2 rounded-2xl px-4 py-5",
            "bg-[#0a0e17]/95 backdrop-blur-xl border border-white/10",
            "shadow-[0_20px_60px_rgba(0,0,0,0.4)]",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-100 transition-colors hover:bg-white/10"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isOpen ? (
          <motion.span
            key="x"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute"
          >
            <IconX size={18} />
          </motion.span>
        ) : (
          <motion.span
            key="m"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute"
          >
            <IconMenu2 size={18} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};

export const NavbarLogo = () => {
  return (
    <a
      href="#"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
    >
      <img
        src="https://assets.aceternity.com/logo-dark.png"
        alt="logo"
        width={30}
        height={30}
      />
      <span className="font-medium text-black dark:text-white">Startup</span>
    </a>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
    | React.ComponentPropsWithoutRef<"a">
    | React.ComponentPropsWithoutRef<"button">
  )) => {
  const baseStyles =
    "px-4 py-2 rounded-md bg-white button bg-white text-black text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

  const variantStyles = {
    primary:
      "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    secondary: "bg-transparent shadow-none dark:text-white",
    dark: "bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    gradient:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};

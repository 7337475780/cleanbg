"use client";

import Link, { LinkProps } from "next/link";
import React from "react";

interface ScrollLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>, LinkProps {
  children: React.ReactNode;
}

export function ScrollLink({ href, children, className, onClick, ...props }: ScrollLinkProps) {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const hrefStr = href.toString();
    if (hrefStr.startsWith("/#") || hrefStr.startsWith("#")) {
      e.preventDefault();
      const targetId = hrefStr.replace(/.*#/, "");
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
      if (onClick) onClick(e);
    }
  };

  return (
    <Link href={href} onClick={handleScroll} className={className} {...props}>
      {children}
    </Link>
  );
}

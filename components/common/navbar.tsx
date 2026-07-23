"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../../app/css/navbar.css";
import { Oswald } from "next/font/google";
import { MENU } from "../../types";

const oswald = Oswald({
    weight:"700",
    subsets:["latin"]
});

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();

    const navItems = MENU.map(({ label, href }) => {
        const isActive = pathname === href;
        return (
            <Link
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={isActive ? "active" : ""}
            >
                <span className={`${oswald.className} text-[18px] hover:text-[#01e044]`}>{label}</span>
            </Link>
        );
    });

    return (
        <header className="navbar">
            <div className="logo">
                <Link href="/">
                    <img src="/images/logo.png" className="text-white" alt="Lencar" />
                </Link>
            </div>

            <nav className="desktop-nav">
                {navItems}
                <Link href="/contact-us">
                    <button className="contact">CONTACT US</button>
                </Link>
            </nav>

            <button
                className="hamburger"
                onClick={()=>setMobileOpen(!mobileOpen)}
            >
                ☰
            </button>

            <nav className={`mobile-nav ${mobileOpen?"open":""}`}>
                <button className="close-btn" onClick={()=>setMobileOpen(false)}>✕</button>
                {navItems}
                <Link href="/contact-us" onClick={() => setMobileOpen(false)}>
                    <button className={`${oswald.className} text-[18px] hover:text-[#01e044]`}>CONTACT US</button>
                </Link>
            </nav>

            {mobileOpen && (
                <div className="nav-overlay" onClick={()=>setMobileOpen(false)} />
            )}
        </header>
    );
}
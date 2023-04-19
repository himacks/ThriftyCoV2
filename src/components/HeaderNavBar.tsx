// HeaderNavBar.tsx
import React from "react";
import "../styling/headernavbar.css";
import AdminLogin from "./AdminLogin";
import AppDrawer from "./AppDrawer";
import useMediaQuery from "@mui/material/useMediaQuery";

interface HeaderNavBarProps {
    bannerImage: string;
    shopElName: string;
    aboutUsLink?: string;
    partnersLink?: string;
    verify: () => void;
    isVerified: boolean;
}

export default function HeaderNavBar({
    bannerImage,
    shopElName,
    aboutUsLink,
    partnersLink,
    verify,
    isVerified
}: HeaderNavBarProps) {
    const scrollToShop = () => {
        const shopElement = document.getElementById(shopElName);
        if (shopElement) {
            shopElement.scrollIntoView({behavior: "smooth"});
        }
    };

    const isMobileDevice = useMediaQuery("(max-width:480px)");

    return (
        <header className="header-nav-bar">
            <div className="icon-nav-cont">
                <img src={bannerImage} alt="Banner" className="banner-image" />
                {!isMobileDevice && (
                    <div className="nav-cont">
                        <a onClick={scrollToShop} className="nav-link">
                            Shop
                        </a>
                        <a href={aboutUsLink} className="nav-link">
                            About Us
                        </a>
                        <a href={partnersLink} className="nav-link">
                            Partners
                        </a>
                        {isVerified && (
                            <>
                                <a href="/post" className="nav-link">
                                    Post
                                </a>
                                <a href="/scan" className="nav-link">
                                    Scan
                                </a>
                            </>
                        )}
                    </div>
                )}
            </div>
            <div className="search-profile-cont">
                <AdminLogin verify={verify} />
                {isMobileDevice && (
                    <AppDrawer scrollToShop={scrollToShop} isVerified={isVerified} />
                )}
            </div>
        </header>
    );
}

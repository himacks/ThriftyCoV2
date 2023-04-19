import React, {useState} from "react";
import DehazeIcon from "@mui/icons-material/Dehaze";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";

import "../styling/AppDrawer.css";

function AppDrawer({scrollToShop, isVerified}) {
    const [openSideBar, setOpenSideBar] = useState(false);

    const handleShopClick = () => {
        setOpenSideBar(false);
        setTimeout(() => {
            scrollToShop();
        }, 100);
    };

    return (
        <div className="headerNavCont">
            <IconButton
                aria-label="admin login"
                component="label"
                onClick={() => setOpenSideBar(true)}
            >
                <DehazeIcon fontSize="medium" className="profile-icon" />
            </IconButton>
            <Drawer
                open={openSideBar}
                className="drawerCont"
                anchor="right"
                onClose={() => {
                    setOpenSideBar(false);
                }}
            >
                <a href="/" className="nav-link">
                    <div className="navCont">
                        <div className="navText">Home</div>
                    </div>
                </a>
                <a onClick={handleShopClick} className="nav-link">
                    <div className="navCont">
                        <div className="navText">Shop</div>
                    </div>
                </a>
                <a href="/" className="nav-link">
                    <div className="navCont">
                        <div className="navText">About Us</div>
                    </div>
                </a>
                <a href="/" className="nav-link">
                    <div className="navCont">
                        <div className="navText">Partners</div>
                    </div>
                </a>
                {isVerified && (
                    <>
                        <a href="/post" className="nav-link">
                            <div className="navCont">
                                <div className="navText">Post</div>
                            </div>
                        </a>
                        <a href="/scan" className="nav-link">
                            <div className="navCont">
                                <div className="navText">Scan</div>
                            </div>
                        </a>{" "}
                    </>
                )}
            </Drawer>
        </div>
    );
}

export default AppDrawer;

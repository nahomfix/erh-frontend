import React, { useEffect, useState } from "react";
import Topbar from "../components/topbar/Topbar.jsx";
import Sidebar from "../components/sidebar/Sidebar.jsx";
import MainContainer from "../components/shared/MainContainer.jsx";

function MainLayout({ children, fullWidth }) {
    const [sidebarIsOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);
    const [mobileView, setMobileView] = useState(false);

    useEffect(() => {
        const { innerWidth: width } = window;
        if (width < 500) {
            setMobileView(true);
        }
    }, []);

    useEffect(() => {
        function handleResize() {
            const { innerWidth: width } = window;
            if (width < 700) {
                setMobileView(true);
            } else {
                setMobileView(false);
            }
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (mobileView) {
            setSidebarOpen(false);
        } else {
            setSidebarOpen(true);
        }
    }, [mobileView]);

    return (
        <>
            <Sidebar toggle={toggleSidebar} isOpen={sidebarIsOpen} />
            <div
                style={{
                    transition: "0.5s",
                }}
                className={sidebarIsOpen ? "content is-open" : "content"}
            >
                <Topbar toggleSidebar={toggleSidebar} />
                {fullWidth ? (
                    <>{children}</>
                ) : (
                    <MainContainer>{children}</MainContainer>
                )}
            </div>
        </>
    );
}

export default MainLayout;

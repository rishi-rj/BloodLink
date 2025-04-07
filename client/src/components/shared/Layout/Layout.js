import React from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import LandingHeader from "./LandingHeader";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  const user = auth?.user;

  return (
    <div className="min-h-screen flex flex-col">
      {user ? (
        // Authenticated Layout
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 p-4">
              {children}
            </main>
          </div>
        </div>
      ) : (
        // Unauthenticated Layout
        <div className="flex flex-col min-h-screen">
          <LandingHeader />
          <main className="flex-1">
            {children}
          </main>
        </div>
      )}
    </div>
  );
};

export default Layout;

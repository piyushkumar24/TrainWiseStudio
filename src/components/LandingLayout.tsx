
import React from 'react';
import NavbarLanding from './NavbarLanding';

interface LandingLayoutProps {
  children: React.ReactNode;
}

const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <div className="min-h-screen">
      <NavbarLanding />
      <main className="relative">
        {children}
      </main>
    </div>
  );
};

export default LandingLayout;

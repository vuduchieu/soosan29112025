import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import { CompareProvider } from '../contexts/CompareContextAstro';
import { Toaster } from './ui/toaster';
import './blog/BlogStyles.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <CompareProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <ScrollToTop />
        <Toaster />
      </div>
    </CompareProvider>
  );
};

export default Layout;

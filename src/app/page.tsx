import React from 'react';
import Header from './components/header';
import MainSection from './components/main-section';
import Footer from './components/footer';

export default function HomePage() {
  return (
    
    <div className="min-h-screen bg-[#eeeeff] text-black flex flex-col">

      {/* HEADER */}
      <Header />
          

      {/* Main Section */}
      <MainSection />
      

      {/* Footer */}
      <Footer />
      
    </div>
  );
}

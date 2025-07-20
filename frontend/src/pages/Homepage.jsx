import React from 'react';
import Navbar from '../components/Navbar';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-amber-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-4xl font-bold text-amber-800 mb-3 font-playfair">
          Welcome to <span className="text-amber-600">DineWise</span>
        </h1>
        
        {/* Cozy restaurant message */}
        <p className="text-lg text-amber-900 max-w-md mb-8">
          Where every meal feels like coming home
        </p>
        
        {/* Simplified food icons (only 2 remaining) */}
        <div className="flex justify-center gap-8 w-full px-4">
          <img
            src="https://img.icons8.com/plasticine/100/olive.png"
            alt="Fresh ingredients"
            className="w-20 h-20 hover:rotate-12 transition-transform"
          />
          <img
            src="https://img.icons8.com/plasticine/100/cheese.png"
            alt="Quality food"
            className="w-20 h-20 hover:rotate-12 transition-transform"
          />
        </div>
      </main>

      <footer className="bg-amber-100 p-3 text-center border-t-2 border-amber-200">
        <p className="text-sm text-amber-800">
          © 2023 DineWise | Icons by <a href="https://icons8.com" className="text-amber-600 hover:underline">Icons8</a>
        </p>
      </footer>
    </div>
  );
};


export default Homepage;
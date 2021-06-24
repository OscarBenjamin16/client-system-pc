import React from 'react';

export default function Waiting() {
  return (
    <>
    <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center" style={{background: 'rgba(0, 0, 0, 0.3)'}}>
    <div className="bg-white border py-2 px-5 rounded-lg flex items-center">
      <div className="text-gray-500 text-md font-semibold text-center">
        Activando la cuenta 
      </div>
      <div className="loader-dots block relative w-32 h-5 ml-8">
        <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-indigo-500"></div>
        <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-indigo-500"></div>
        <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-indigo-500"></div>
        <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-indigo-500"></div>
      </div>
    </div>
    </div>
    </>
  );
}

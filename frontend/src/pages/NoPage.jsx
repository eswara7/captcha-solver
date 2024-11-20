import React from 'react';
import { useNavigate } from 'react-router-dom';
const NoPage = () => {
  const navigate = useNavigate();

  return (
    <div className=" flex items-center justify-center h-screen bg-slate-400 dark:bg-slate-700">
      <div className="text-center  items-center justify-cente ">
        <h1 className="text-4xl  font-bold text-gray-800 dark:text-gray-200">404</h1>
        <p className="text-lg text-gray-600 mb-4 dark:text-gray-300">Oops! Not found </p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-800 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default NoPage;
import React, { useState } from 'react';

const CookiesBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    // You can also set a cookie here to remember the user's preference
  };

  return (
    <div
      className={`${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      } fixed inset-x-0 bottom-0 bg-gray-800 p-4 text-white transition-transform duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-between">
        <p className="mr-4">This website uses cookies to enhance your experience.</p>
        <button
          onClick={handleClose}
          className="rounded bg-gray-600 px-4 py-2 text-white focus:outline-none"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CookiesBanner;

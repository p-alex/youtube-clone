import { useEffect, useState } from 'react';

const useMobileSize = () => {
  const [isMobileSize, setIsMobileSize] = useState(false);

  const handleCheckWindowSize = () => {
    if (window.innerWidth <= 980) {
      setIsMobileSize(true);
      return;
    }
    setIsMobileSize(false);
  };

  useEffect(() => {
    window.addEventListener('resize', handleCheckWindowSize);
    return () => window.removeEventListener('resize', handleCheckWindowSize);
  }, []);

  return isMobileSize;
};

export default useMobileSize;

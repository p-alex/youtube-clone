import { useEffect, useState } from 'react';
import { MOBILE_BREAK_POINT } from '../../layout/style';

const useMobileSize = () => {
  const [isMobileSize, setIsMobileSize] = useState(false);

  const handleCheckWindowSize = () => {
    if (window.innerWidth <= MOBILE_BREAK_POINT) {
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

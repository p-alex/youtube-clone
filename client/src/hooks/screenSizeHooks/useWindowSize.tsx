import { useEffect, useState } from "react";

const useWindowSize = ({ width }: { width: number }) => {
  const [isWindowWidthUnder, setIsWindowWidthUnder] = useState(false);
  const [count, setCount] = useState(0);

  const handleCheckWindowSize = () => {
    if (window.innerWidth <= width) {
      setIsWindowWidthUnder(true);
      return;
    }
    setIsWindowWidthUnder(false);
  };

  useEffect(() => {
    if (count < 1) {
      setIsWindowWidthUnder(window.innerWidth <= width);
      setCount((prevState) => prevState++);
    }
    window.addEventListener("resize", handleCheckWindowSize);
    return () => window.removeEventListener("resize", handleCheckWindowSize);
  }, []);

  return isWindowWidthUnder;
};

export default useWindowSize;

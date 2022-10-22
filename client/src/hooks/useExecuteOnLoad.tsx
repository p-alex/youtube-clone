import { useEffect, useRef } from "react";

function useExecuteOnLoad<Dep>(func: () => void, dependencies?: Dep[]) {
  const effectRan = useRef(false);
  useEffect(() => {
    if (effectRan.current) return;
    func();
    return () => {
      effectRan.current = true;
    };
  }, dependencies);
  return null;
}

export default useExecuteOnLoad;

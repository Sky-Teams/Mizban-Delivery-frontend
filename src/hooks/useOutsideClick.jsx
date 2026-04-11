import { useEffect } from "react";

export const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
       if (target === document.body || target === document.documentElement)  return;
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]); 
};

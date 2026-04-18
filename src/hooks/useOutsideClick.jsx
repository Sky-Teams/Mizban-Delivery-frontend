import { useEffect } from "react";
import i18next from "i18next";
import { isRTL } from "../utils/IsRTLDirection";

export const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      const el = ref.current;
      if (!el || el.contains(event.target)) return;

      if (event.target === document.documentElement || event.target === document.body) {
        return; 
      }
      const rect = event.target.getBoundingClientRect();

      //detects the scrollbar
      const isLeftScroll = event.clientX < rect.left + (event.target.offsetWidth - event.target.clientWidth);
      const isRightScroll = event.clientX > rect.left + event.target.clientWidth;

      if (isRTL() ? isLeftScroll : isRightScroll) {
        return; 
      }

      callback();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, callback]); 
};
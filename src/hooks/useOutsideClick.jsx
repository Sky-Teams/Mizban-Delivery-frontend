import { useEffect } from 'react';
import i18next from 'i18next';
import { isRTL } from '../utils/IsRTLDirection';
// Custom hook to detect clicks outside a referenced element.
// Accepts a ref and a callback, and runs the callback when a click occurs outside the element.
export const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      // check if there is no ref or the click is on the element itself
      const el = ref.current;
      if (!el || el.contains(event.target)) return;
      // get the position and size of the clicked element
      const rect = event.target.getBoundingClientRect();
      //detects the scrollbar to prevent the callback from running on scrollbar click
      const isLeftScroll =
        event.clientX < rect.left + (event.target.offsetWidth - event.target.clientWidth);
      const isRightScroll = event.clientX > rect.left + event.target.clientWidth;

      if (isRTL() ? isLeftScroll : isRightScroll) {
        return;
      }

      callback();
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref, callback]);
};

import { useEffect, useRef } from 'react';

export const useLiveAnnouncer = () => {
  const regionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const region = document.createElement('div');
    region.setAttribute('aria-live', 'polite');
    region.setAttribute('aria-atomic', 'true');
    region.className = 'sr-only';
    region.style.position = 'absolute';
    region.style.width = '1px';
    region.style.height = '1px';
    region.style.margin = '-1px';
    region.style.border = '0';
    region.style.padding = '0';
    region.style.overflow = 'hidden';
    document.body.appendChild(region);
    regionRef.current = region;

    return () => {
      document.body.removeChild(region);
      regionRef.current = null;
    };
  }, []);

  return (message: string) => {
    if (!regionRef.current) return;
    const region = regionRef.current;
    region.textContent = '';
    window.requestAnimationFrame(() => {
      region.textContent = message;
    });
  };
};

import { useEffect, useState } from 'react';

export default function useProductScrollLock(
  rootRef: React.RefObject<HTMLDivElement | null>
): boolean {
  const [canScrollProducts, setCanScrollProducts] = useState(false);

  useEffect(() => {
    const host =
      (rootRef.current?.closest('.mobile-demo-scroll') as HTMLElement | null) ?? document.body;

    if (!host) {
      setCanScrollProducts(true);
      return;
    }

    const updateScrollLock = (): void => {
      const scrollHeight = host.scrollHeight;
      const clientHeight = host.clientHeight;
      const reachedBottom = Math.ceil(host.scrollTop + clientHeight) >= scrollHeight;
      const cannotScroll = scrollHeight <= clientHeight + 1;
      setCanScrollProducts(reachedBottom || cannotScroll);
    };

    updateScrollLock();
    host.addEventListener('scroll', updateScrollLock, { passive: true });
    window.addEventListener('resize', updateScrollLock);

    return () => {
      host.removeEventListener('scroll', updateScrollLock);
      window.removeEventListener('resize', updateScrollLock);
    };
  }, [rootRef]);

  return canScrollProducts;
}

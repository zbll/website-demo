import { useEffect, useRef, useState } from 'react';

type UseInViewOptions = {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  once?: boolean;
};

export function useInView<T extends Element>(
  options: UseInViewOptions = {}
): { ref: React.RefObject<T | null>; isVisible: boolean } {
  const { threshold = 0.2, root = null, rootMargin = '0px', once = true } = options;
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    if (isVisible && once) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, root, rootMargin, once, isVisible]);

  return { ref, isVisible };
}

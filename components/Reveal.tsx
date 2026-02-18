"use client";

import { PropsWithChildren, useEffect, useRef, useState } from "react";

export default function Reveal({ children }: PropsWithChildren) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={visible ? "animate-fadeUp" : "opacity-0 translate-y-3"}>
      {children}
    </div>
  );
}

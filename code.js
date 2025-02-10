const glowcardJsx = `
"use client";
import { useEffect, useRef } from "react";

const withOpacity = (color, opacity) => {
  if (color.startsWith('#')) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return \`rgba(\${r}, \${g}, \${b}, \${opacity})\`;
  }
  if (color.startsWith('rgb')) {
    const parts = color.match(/\\d+/g);
    return \`rgba(\${parts[0]}, \${parts[1]}, \${parts[2]}, \${opacity})\`;
  }
  return color;
};

export default function GlowCard({ children, className, color = '#ffffff' }) {
  const container = useRef(null);
  const glowElements = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!container.current) return;

      const rect = container.current.getBoundingClientRect();
      const x = e.clientX - rect.left - 120;
      const y = e.clientY - rect.top - 120;

      const updatePosition = () => {
        glowElements.current.forEach((glow) => {
          if (glow) {
            glow.style.transform = \`translate3d(\${x}px, \${y}px, 0)\`;
          }
        });
      };
      requestAnimationFrame(updatePosition);
    };

    const currentContainer = container.current;
    if (!currentContainer) return;

    glowElements.current = [
      ...currentContainer.parentElement.querySelectorAll('.glow'),
      ...currentContainer.querySelectorAll('.glow')
    ];

    currentContainer.addEventListener('mousemove', handleMouseMove);
    return () => currentContainer.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className={\`w-fit h-fit p-1 group relative bg-zinc-900 rounded-[11px] !overflow-hidden\`}>
        {/* Outer glow */}
        <div
          className="glow w-[15em] h-[15em] rounded-full blur-3xl absolute opacity-0 transition-opacity duration-200 group-hover:opacity-50"
          style={{
            backgroundColor: color,
            transform: "translate3d(50%, 50%, 0)",
            willChange: "transform",
            transition: "opacity 0.4s ease",
          }}
        ></div>

        <div
          ref={container}
          className={\`w-[20em] group h-fit min-h-[5em] \${className} bg-zinc-950 !relative overflow-hidden rounded-[10px]\`}
        >
          {/* Inner glow */}
          <div
            className="glow w-[15em] z-[1] h-[15em] rounded-full blur-2xl absolute opacity-0 transition-opacity duration-200 group-hover:opacity-20"
            style={{
              backgroundColor: withOpacity(color, 0.3),
              transform: "translate3d(50%, 50%, 0)",
              willChange: "transform",
              transition: "opacity 0.2s ease",
            }}
          ></div>

          <div className="w-full h-full p-4 relative !z-[2]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
`;
const glowcardTsx = `
"use client";
import { useEffect, useRef, ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  color?: string;
}

const withOpacity = (color: string, opacity: number): string => {
  if (color.startsWith('#')) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return \`rgba(\${r}, \${g}, \${b}, \${opacity})\`;
  }
  if (color.startsWith('rgb')) {
    const parts = color.match(/\\d+/g);
    return parts ? \`rgba(\${parts[0]}, \${parts[1]}, \${parts[2]}, \${opacity})\` : color;
  }
  return color;
};

export default function GlowCard({ children, className = "", color = "#ffffff" }: GlowCardProps) {
  const container = useRef<HTMLDivElement>(null);
  const glowElements = useRef<NodeListOf<HTMLDivElement> | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!container.current) return;

      const rect = container.current.getBoundingClientRect();
      const x = e.clientX - rect.left - 120;
      const y = e.clientY - rect.top - 120;

      const updatePosition = () => {
        glowElements.current?.forEach((glow) => {
          if (glow) {
            glow.style.transform = \`translate3d(\${x}px, \${y}px, 0)\`;
          }
        });
      };
      requestAnimationFrame(updatePosition);
    };

    const currentContainer = container.current;
    if (!currentContainer) return;

    glowElements.current = currentContainer.querySelectorAll('.glow');

    currentContainer.addEventListener('mousemove', handleMouseMove);
    return () => currentContainer.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className={\`w-fit h-fit p-1 group relative bg-zinc-900 rounded-[11px] !overflow-hidden\`}>
        {/* Outer glow */}
        <div
          className="glow w-[15em] h-[15em] rounded-full blur-3xl absolute opacity-0 transition-opacity duration-200 group-hover:opacity-50"
          style={{
            backgroundColor: color,
            transform: "translate3d(50%, 50%, 0)",
            willChange: "transform",
            transition: "opacity 0.4s ease",
          }}
        ></div>

        <div
          ref={container}
          className={\`w-[20em] group h-fit min-h-[5em] \${className} bg-zinc-950 !relative overflow-hidden rounded-[10px]\`}
        >
          {/* Inner glow */}
          <div
            className="glow w-[15em] z-[1] h-[15em] rounded-full blur-2xl absolute opacity-0 transition-opacity duration-200 group-hover:opacity-20"
            style={{
              backgroundColor: withOpacity(color, 0.3),
              transform: "translate3d(50%, 50%, 0)",
              willChange: "transform",
              transition: "opacity 0.2s ease",
            }}
          ></div>

          <div className="w-full h-full p-4 relative !z-[2]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}`;
const buttonJsx = ``;
const buttonTsx = ``;

module.exports = {
  glowcard: {
    jsx: glowcardJsx,
    tsx: glowcardTsx
  },
  button: {
    jsx: buttonJsx,
    tsx: buttonTsx,
  }
};
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

export function ConfettiBurst({ trigger }) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const update = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (!trigger) return null;

  return (
    <Confetti
      width={size.width}
      height={size.height}
      recycle={false}
      numberOfPieces={400}
      gravity={0.1}
      colors={["#8b5cf6", "#ec4899", "#3b82f6", "#10b981", "#f59e0b"]}
    />
  );
}

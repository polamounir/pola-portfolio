import { useState, useEffect } from "react";

export const useTypewriter = (text: string, speed = 150): string => {
  const [displayText, setDisplayText] = useState<string>("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayText;
};

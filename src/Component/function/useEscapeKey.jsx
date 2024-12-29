import { useEffect } from "react";

/** ESC 누르면 callback()가 실행되는 함수 */
const useEscapeKey = (callback) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        callback();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [callback]);
};

export default useEscapeKey;

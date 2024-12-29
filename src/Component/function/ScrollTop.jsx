import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** 페이지 랜더링 될 때마다 스크롤 최상위로 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/** 스크롤 최상위로 부드럽게 */
export function ScrollToTop_smooth() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

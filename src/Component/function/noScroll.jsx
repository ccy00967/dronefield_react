import { useEffect } from "react";

const preventScroll = () => {
  const currentScrollY = window.scrollY;
  document.body.style.position = "fixed";
  document.body.style.width = "100%";
  document.body.style.top = `-${currentScrollY}px`; // 현재 스크롤 위치
  document.body.style.overflowY = "scroll";
  return currentScrollY;
};

const allowScroll = (prevScrollY) => {
  document.body.style.position = "";
  document.body.style.width = "";
  document.body.style.top = "";
  document.body.style.overflowY = "";
  window.scrollTo(0, prevScrollY);
};

/** 모달 open 시 스크롤 막음 */
const useNoScroll = (modalOpen) => {
  useEffect(() => {
    if (modalOpen) {
      const prevScrollY = preventScroll();
      return () => {
        allowScroll(prevScrollY);
      };
    }
  }, [modalOpen]);
};

export default useNoScroll;
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { server } from "../url";

const NicePassPopUp = () => {
  const location = useLocation();

  useEffect(() => {
    // 쿼리 파라미터 추출
    const queryParams = new URLSearchParams(location.search);
    const token_version_id = queryParams.get("token_version_id");
    const enc_data = queryParams.get("enc_data");
    const integrity_value = queryParams.get("integrity_value");
    console.log("Received Params:", token_version_id, enc_data, integrity_value);

    // 필요한 파라미터가 모두 있는 경우 요청 실행
    if (token_version_id && enc_data && integrity_value) {
      fetch(server + "/user/nice-callback/", {
        method: "GET",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            window.opener.postMessage("no", window.location.origin + "/signUp");
            window.close();
            return; // 오류 처리 후 종료
          }
          return response.json();
        })
        .then((data) => {
          if (data) {
            window.opener.postMessage("ok", window.location.origin + "/signUp");
            window.close();
          }
        })
        .catch((error) => {
          console.error("본인인증 요청 에러:", error);
          window.close();
        });
    } else {
      console.error("필요한 인증 데이터가 누락되었습니다.");
      window.close(); // 필요한 데이터가 없으면 창을 닫음
    }
  }, [location.search]); // location.search가 변경될 때 실행

  return <div></div>;
};

export default NicePassPopUp;

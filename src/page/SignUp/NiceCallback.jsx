import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { server } from "../url";

const NiceCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const enc_data = queryParams.get("enc_data");
    const token_version_id = queryParams.get("token_version_id");
    const integrity_value = queryParams.get("integrity_value");

    const fetchCallback = async () => {
      try {
        if (!enc_data || !token_version_id || !integrity_value) {
          console.error("필수 파라미터 누락");
          window.opener.postMessage("no", window.location.origin);
          window.close();
          return;
        }

        const response = await fetch(
          `${server}/user/nice-callback/?enc_data=${enc_data}&token_version_id=${token_version_id}&integrity_value=${integrity_value}`
        );

        if (!response.ok) {
          window.opener.postMessage("no", window.location.origin);
          window.close();
          return;
        }

        const data = await response.json();
        console.log("콜백 데이터:", data);

        // 부모 창에 인증 성공 메시지 전달
        window.opener.postMessage("ok", window.location.origin);
        window.close();
      } catch (error) {
        console.error("콜백 요청 실패:", error);
        window.opener.postMessage("no", window.location.origin);
        window.close();
      }
    };

    fetchCallback();
  }, []);

  return <div>본인인증 처리 중...</div>;
};

export default NiceCallback;

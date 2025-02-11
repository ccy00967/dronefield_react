import { useState } from "react";
import { server } from "../url";
import { PASSBtn } from "./css/NicePassBtnCss";

const NicePassBtn2 = ({ setTokenVersionId }) => {  // 부모로부터 setTokenVersionId 전달받음
  const [authResult, setAuthResult] = useState(null);

  const openNicePopup = async () => {
    try {
      const tokenResponse = await fetch(`${server}/user/nice-token/`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      if (!tokenResponse.ok) {
        throw new Error("Failed to fetch nice-token.");
      }

      const { token_version_id, enc_data, integrity_value, url } =
        await tokenResponse.json();

      // 부모 컴포넌트에 token_version_id 전달
      setTokenVersionId(token_version_id);

      const popup = window.open(
        "",
        "popupChk",
        "width=480,height=812,top=100,left=100,fullscreen=no,menubar=no,status=no,toolbar=no,titlebar=yes,location=no,scrollbar=no"
      );

      if (!popup) {
        alert("팝업이 차단되었습니다. 브라우저 설정을 확인하세요.");
        return;
      }

      popup.document.write(`
        <form name="form_chk" method="post" action="${url}">
          <input type="hidden" name="token_version_id" value="${token_version_id}" />
          <input type="hidden" name="enc_data" value="${enc_data}" />
          <input type="hidden" name="integrity_value" value="${integrity_value}" />
        </form>
        <script>
          document.forms['form_chk'].submit();
        </script>
      `);

      const receiveMessage = (event) => {
        if (event.origin !== window.location.origin) {
          console.warn("Message origin not trusted:", event.origin);
          return;
        }

        if (event.data === "ok") {
          setAuthResult("본인인증 성공");
        } else if (event.data === "no") {
          setAuthResult("본인인증 실패");
        } else {
          console.warn("Unknown message received:", event.data);
        }

        popup.close();
      };

      window.addEventListener("message", receiveMessage, { once: true });
    } catch (error) {
      console.error("인증 과정에서 오류 발생:", error);
      alert("본인인증 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <PASSBtn onClick={openNicePopup}>나이스 본인인증</PASSBtn>
      {authResult && <p>{authResult}</p>}
    </div>
  );
};

export default NicePassBtn2;

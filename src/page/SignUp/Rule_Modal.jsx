import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TermsBox, TOSbox } from "./css/Rule_ModalCss";
import { server } from "../url";

const Rule_Modal = () => {
  const { type } = useParams(); // URL 매개변수 (약관 ID)
  const [content, setContent] = useState(""); // 약관 내용 저장
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${server}/user/term/${type}`);
        if (!response.ok) {
          throw new Error("Failed to fetch content.");
        }
        const data = await response.text(); // HTML 데이터
        setContent(data);
      } catch (err) {
        setError("약관을 불러오는 데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [type]); // type 변경 시 다시 요청

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <TOSbox>
      {/* 서버에서 가져온 HTML 내용 렌더링 */}
      <div dangerouslySetInnerHTML={{ __html: content }}/>
    </TOSbox>
  );
};

export default Rule_Modal;

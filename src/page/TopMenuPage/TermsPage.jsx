import Common_Layout from "../../Component/common_Layout";
import React, { useState, useEffect } from "react";
import { TabButton, ContentArea, Container, TabContainer } from "./css/TermsPageCss";
import { server } from "../url";


const Terms = () => {
    const [activeTab, setActiveTab] = useState(1); // 현재 선택된 탭
    const [content, setContent] = useState(null); // 서버에서 가져온 데이터
    const [loading, setLoading] = useState(false); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태

    // API 요청 함수
    const fetchContent = async (tabId) => {
        const endpoint = `${server}/user/term/${tabId}`;
        setLoading(true); // 로딩 시작
        setError(null); // 에러 초기화
        setContent(null); // 이전 데이터 초기화

        try {
            const response = await fetch(endpoint); // fetch 요청
            if (!response.ok) {
                throw new Error("Failed to fetch data.");
            }
            const data = await response.text(); // 데이터를 텍스트로 가져옴 (HTML 데이터 가정)
            // console.log("Fetched Data:", data); // 서버 데이터 확인
            setContent(data); // HTML 텍스트 저장
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("Error loading content.");
        } finally {
            setLoading(false); // 로딩 종료
        }
    };

    // 탭 변경 시 데이터 로드
    useEffect(() => {
        fetchContent(activeTab);
    }, [activeTab]);
    return (
        <Common_Layout minWidth={1} topMenu={"이용약관"}>
            <Container>
                {/* 탭 버튼 */}
                <TabContainer>
                    <TabButton active={activeTab === 1} onClick={() => setActiveTab(1)}>
                        서비스 이용약관
                    </TabButton>
                    <TabButton active={activeTab === 2} onClick={() => setActiveTab(2)}>
                        개인정보 수집 및 이용약관
                    </TabButton>
                    <TabButton active={activeTab === 3} onClick={() => setActiveTab(3)}>
                        개인정보 제3자 제공동의
                    </TabButton>
                    <TabButton active={activeTab === 4} onClick={() => setActiveTab(4)}>
                        마케팅정보 및 SMS수신동의
                    </TabButton>
                </TabContainer>

                {/* 콘텐츠 영역 */}
                <ContentArea>
                    {loading ? (
                        "Loading..."
                    ) : error ? (
                        <span style={{ color: "red" }}>{error}</span>
                    ) : content ? (
                        <div
                            dangerouslySetInnerHTML={{ __html: content }} // HTML 데이터를 ContentArea 내부에 렌더링
                            style={{ width: "100%", height: "100%", overflow: "auto" }}
                        />
                    ) : (
                        "No content available."
                    )}
                </ContentArea>
            </Container>


        </Common_Layout>
    );
};

export default Terms;

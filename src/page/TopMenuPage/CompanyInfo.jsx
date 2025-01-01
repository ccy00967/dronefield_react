import Common_Layout from "../../Component/common_Layout";
import YouTube from "react-youtube";
import { YouTubeBox } from "./css/CompanyInfoCss";


const CompanyInfo = () => {
  return (
    <Common_Layout minWidth={1} topMenu={"회사소개"}>
      <YouTubeBox className="col">
        <div className="title">회사소개</div>
        <YouTube
          //videoId : https://www.youtube.com/watch?v={videoId} 유튜브 링크의 끝부분에 있는 고유한 아이디
          videoId={"eGLSPyGszjo"}
          opts={{
            width: "100%",
            height: "100%",
            playerVars: {
              autoplay: 1, //자동재생 O
              rel: 0, //관련 동영상 표시하지 않음
            },
          }}
          onEnd={(e) => e.target.stopVideo(0)}
        />

        <div className="title">광고영상</div>
        <YouTube
          videoId={"mw5VIEIvuMI"}
          opts={{
            width: "100%",
            height: "100%",
            playerVars: {
              autoplay: 1,
              rel: 0,
            },
          }}
          onEnd={(e) => e.target.stopVideo(0)}
        />
      </YouTubeBox>
    </Common_Layout>
  );
};

export default CompanyInfo;

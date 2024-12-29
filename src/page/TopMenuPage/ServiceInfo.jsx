import YouTube from "react-youtube";
import Common_Layout from "../../Component/common_Layout";
import { YouTubeBox } from "./CompanyInfo";

const ServiceInfo = () => {
  return (
    <Common_Layout minWidth={1} topMenu={"서비스 소개 및 이용방법"}>
      <YouTubeBox className="col">
        <div className="title">농업인 이용방법</div>
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

        <div className="title">드론 조종사 이용방법</div>
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

        <div className="title">농약상 이용방법</div>
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

export default ServiceInfo;

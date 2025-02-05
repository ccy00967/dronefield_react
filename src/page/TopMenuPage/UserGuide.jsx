import Common_Layout from "../../Component/common_Layout";
import YouTube from "react-youtube";
import { Guide } from "./css/UserGuideCss";


const UserGuide = () => {
  return (
    <Common_Layout minWidth={1} topMenu={"사용설명"}>

      <Guide src={require("../../img/userguide.png")} />

    </Common_Layout>
  );
};

export default UserGuide;

import { useRef, useState } from "react";
import Common_Layout from "../../Component/common_Layout";
import {
  Icon,
  RowView2
} from "../../Component/common_style";
import {
  ContentArea,
  InputBox,
  TextAreaBox,
  Btn,
  PicArea,
  PicBox,
  Pic,
  DeletBtn
} from "./css/CS_insertCss";


const CS_insert = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imgList, setImgList] = useState(new Array(5).fill(""));

  const setting_title = (e) => setTitle(e.target.value);
  const setting_content = (e) => setContent(e.target.value);

  const picRef = useRef();

  // 사진 등록 버튼
  const insert_pic = () => {
    const isEmpty = imgList.filter((img) => img !== "");

    if (isEmpty.length === 5) {
      alert("사진은 5장까지 등록가능합니다.");
    } else {
      if (picRef.current) return picRef.current.click();
    }
  };
  // 배열에 사진 셋팅
  const setting_pic = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const extension = file.name.split(".").pop()?.toLowerCase();
    if (extension !== "png" && extension !== "jpg" && extension !== "jpge") {
      alert("png, jpg, jpge 파일만 첨부가능합니다.");
    } else {
      // 뷰에 보여질 이미지 url 리스트
      const reader = new FileReader();
      reader.onloadend = () => {
        const copy_list = [...imgList];
        for (let i = 0; i < imgList.length; i++) {
          if (imgList[i] === "") {
            copy_list[i] = reader.result;
            break;
          }
        }
        setImgList(copy_list);
      };
      reader.readAsDataURL(file);
    }
  };
  const del_pic = (idx) => {
    const copy_array = [...imgList];
    const del_array = copy_array.filter((_, i) => i !== idx);
    if (del_array.length < 5) {
      while (del_array.length < 5) {
        del_array.push("");
      }
    }
    setImgList(del_array);
  };

  const insert_API = () => {
    console.log({
      제목: title,
      내용: content,
      사진: imgList,
    });
  };

  return (
    <Common_Layout minWidth={700} topMenu={"고객센터"}>
      <ContentArea>
        <div className="title">게시글 작성</div>

        <div className="subTitle">제목</div>
        <InputBox
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={setting_title}
        />

        <div className="subTitle">내용</div>
        <TextAreaBox
          placeholder="내용을 입력해주세요."
          value={content}
          onChange={setting_content}
        />

        <div className="subTitle">사진 등록</div>
        <PicArea>
          <PicBox className="btn" onClick={insert_pic}>
            <Icon src={require("../../img/icon_plus.png")} />
          </PicBox>

          {imgList.map((img, idx) => {
            return (
              <PicBox key={idx} className={img === "" ? "none" : ""}>
                <DeletBtn
                  src={require("../../img/icon_X.png")}
                  onClick={() => del_pic(idx)}
                />
                <Pic src={img} />
              </PicBox>
            );
          })}
        </PicArea>

        <RowView2 className="end">
          <Btn onClick={insert_API}>작성 완료</Btn>
        </RowView2>
      </ContentArea>

      <input
        type="file"
        style={{ display: "none" }}
        ref={picRef}
        onChange={setting_pic}
      />
    </Common_Layout>
  );
};

export default CS_insert;

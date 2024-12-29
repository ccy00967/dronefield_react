import { useRef, useState } from "react";
import styled from "styled-components";
import Common_Layout from "../../Component/common_Layout";
import {
  CenterView,
  GreenColor,
  hoverGreen,
  Icon,
  RowView2
} from "../../Component/common_style";

const ContentArea = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 70rem;
  padding: 5rem 1rem;
  margin: 0rem auto;
  div.title {
    margin-bottom: 2rem;
    font-size: 28px;
    font-family: var(--font-Pretendard-SemiBold);
  }
  div.subTitle {
    margin: 1rem 0 0.5rem 0;
    font-family: var(--font-Pretendard-Medium);
  }
  input,
  textarea {
    font-size: 16px;
    font-family: var(--font-Pretendard-Regular);
  }
`;
const InputBox = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 0.8rem 1rem;
  outline: 0;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  &:focus {
    border: 1px solid #454545;
  }
`;
const TextAreaBox = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  height: 20rem;
  padding: 1rem;
  resize: none;
  outline: 0;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  &:focus {
    border: 1px solid #454545;
  }
`;
const Btn = styled.div`
  padding: 1rem 3rem;
  margin-top: 1rem;
  text-align: center;
  font-family: var(--font-Pretendard-SemiBold);
  color: white;
  background-color: ${GreenColor};
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: ${hoverGreen};
  }
`;
const PicArea = styled(RowView2)`
  flex-wrap: wrap;
  width: 100%;
`;
const PicBox = styled(CenterView)`
  position: relative;
  width: 7rem;
  min-width: 7rem;
  height: 7rem;
  margin-right: 0.7rem;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  object-fit: cover;
  overflow: hidden;
  &.btn {
    background-color: #f2f2f2;
    border: 1px solid #e7e7e7;
    cursor: pointer;
  }
  &.none {
    display: none;
  }
`;
const Pic = styled(Icon)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const DeletBtn = styled(Icon)`
  position: absolute;
  top: 0%;
  right: 0%;
  margin: 0.5rem;
  cursor: pointer;
`;

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

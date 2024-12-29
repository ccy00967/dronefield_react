import { createSlice } from "@reduxjs/toolkit";

// reducer 와 reducers 구분 잘하기
// 리덕스에서 store는 한가지만 존재함
// 여러가지 store를 만들필요가 있음 -> store를 쪼갠것 같다고 해서 slice
// store는 slice들의 집합이다


const niceIsSuccessSlice = createSlice({
    name: 'niceSuccess',
    initialState: { isSuccess: "" },
    reducers: {
        nicePassSuccess: function (state, action) {
            state.isSuccess = "ok";
        },
        nicePassFail: function (state, action) {
            state.isSuccess = "no";
        },
    }
})

export default niceIsSuccessSlice

// 아래처럼 작성시 다른 파일에서 import 할때 함수명만 작성가능
// import {up} from [여기 파일위치/counterSlice]
// dispatch(counterSlice.actions.up()) -> dispatch(up()) 으로 사용 가능
export const { nicePassSuccess, nicePassFail } = niceIsSuccessSlice.actions
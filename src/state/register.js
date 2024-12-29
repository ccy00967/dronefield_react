import { createSlice } from "@reduxjs/toolkit";

// reducer 와 reducers 구분 잘하기
// 리덕스에서 store는 한가지만 존재함
// 여러가지 store를 만들필요가 있음 -> store를 쪼갠것 같다고 해서 slice
// store는 slice들의 집합이다

const UserSignUpData = {
    role: "",
    password: "",
    address: {
        roadaddress: "",
        jibunAddress: "",
        detailAddress: "",
    },
}

const registerSlice = createSlice({
    name: 'UserRegisterInfo',
    initialState: UserSignUpData,
    reducers: {
        setRole: function (state, action) {
            state.role = action.payload.role
        },
        setPassword: function (state, action) {
            state.password = action.payload.password
        },
        setAddress: function (state, action) {
            //console.log(action.payload)
            state.address.roadaddress = action.payload.roadaddress
            state.address.jibunAddress = action.payload.jibunAddress
            state.address.detailAddress = action.payload.detailAddress
        }
    }
})

export default registerSlice

export const { setRole, setPassword, setAddress } = registerSlice.actions

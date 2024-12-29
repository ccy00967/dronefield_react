import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from '@reduxjs/toolkit';
import niceIsSuccessSlice from './niceSuccessState';

// ****** 아래는 로컬 저장을 관리하는 코드 ********
// 이때 persistReducer와 store가 같은파일에 존재하면 에러가 생긴다 - 종속성에러라고 하는데 잘 모르겠음

// 여기서 persist로 저장할 리듀서들을 통합한다
const rootReducer = combineReducers({
    niceIsSuccess: niceIsSuccessSlice.reducer,
});

// config 작성
const persistConfig = {
    key: "root", // 저장될 이름
    storage, // 로컬 스토리지에 저장
};

export const persisted_reducer = persistReducer(persistConfig, rootReducer);
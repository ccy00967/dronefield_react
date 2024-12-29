import { configureStore } from '@reduxjs/toolkit';
import niceIsSuccessSlice from './niceSuccessState';
import { persisted_reducer } from './persist';
import registerSlice from './register';


// 이제 slice들을 store로 만들기 -> slice들의 reducer를 store에 모으기
// 각각의 slice들의 reducer들이 들어간다
// [이름]: [해당]slice.reducer
const store = configureStore({
    reducer: {
        niceSuccessState: niceIsSuccessSlice.reducer,
        registerState: registerSlice.reducer,
        //address: addressSlice.reducer,
        //request: requestSlice.reducer,
        // userInfo: userInfoSlice.reducer, // persistance로 새로고��으로 인한 데이터 ��제 방지
        persist: persisted_reducer, // 로컬에 저장될 데이터들을 persist로 불러올수 있게된다
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
    // middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
    // 미들웨어 이해하기
})

export default store

// 이제 다른 파일의 리액트 컴포넌트에서 useSelector로 사용가능
// const count = useSelector(state => { return state.counter.value })
// state의 counter -configureStore에서 정의한 이름- 으로 value에 접근가능
// 함수를 실행시키는 방법은 dispatch()함수로 사용가능
// dispatch({type:'counterSlice/up', step:2}) 이떼 up의 인자action에 step이름으로 값이 전달 - action.step
// dispatch(counterSlice.actions.up(2)); 이때 up의 인자actions에 payload로 전달 - action.payload
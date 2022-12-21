import {combineReducers} from "redux";
import userReducer from './user';
import postReducer from './post';

const reducer = combineReducers({
    user: userReducer,
    posts: postReducer,
});
export type RootState = ReturnType<typeof reducer>; // reducer 함수의 리턴값의 타입을 export

export default reducer;
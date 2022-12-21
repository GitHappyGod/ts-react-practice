import * as React from 'react';
import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logIn, logOut } from './actions/user';
import { RootState } from './reducers';
import { UserState } from './reducers/user';

const App: FC = () => {
    const { isLoggedIn, data } = useSelector<RootState, UserState>((state) => state.user);
    const dispatch = useDispatch();

    const onClick = () => {
        // @ts-ignore
        dispatch(logIn({
            id: 'winterlimit',
            password: "123123",
        }));
    }

    const onLogout = () => {
        dispatch(logOut());
    }

    return (
        <div>
            {isLoggedIn
                ? <div>로그인 중</div>
                : data
                    ? <div>{data.nickname}</div>
                    : '로그인 해주세요.'}
            {!data
                ? <button onClick={onClick}>로그인</button>
                : <button onClick={onLogout}>로그아웃</button>}
        </div>
    );
};

export default App;
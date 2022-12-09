import * as React from 'react';
import {useRef, useState} from "react";

const GuGuDan = () => {
    const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
    const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputEl = useRef<HTMLInputElement>(null);

    const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => { // 함수를 분리해서 사용하면 event 타입 정의해줘야됨
        e.preventDefault();
        const input = inputEl.current;
        if(parseInt(value) === first * second) {
            setResult('정답');
            setFirst(Math.ceil(Math.random() * 9));
            setSecond(Math.ceil(Math.random() * 9));
            setValue('');
            if (input) {
                input.focus(); // input이 null이 아니라는 것이 확실할땐 input!.focus(); 로 사용가능
            }
        } else {
            setResult('땡');
            setValue('');
            if (input) {
                input!.focus();
            }
        }
    }

    return (
        <>
            <div>{first} 곱하기 {second}는?</div>
            <form onSubmit={onSubmitForm}>
                <input
                    ref={inputEl}
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                    <div>{result}</div>
            </form>
        </>
    )
}

export default GuGuDan;
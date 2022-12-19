import * as React from 'react';
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import Ball from "./Ball";

function getWinNumbers() {
    const candidate = Array(45).fill(null).map((v, i) => i + 1);
    const shuffle = [];
    while(candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
}

const Lotto = () => {
    const lottoNumbers = useMemo(() => getWinNumbers(), []);
    // 리랜더링마다 getWinNumbers 함수가 실행되는걸 막기위해 useMemo 사용
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState<number[]>([]);     // ts에서는 빈 배열 사용시 타입정의를 generic으로 정확하게 해줘야함
    const [bonus, setBonus] = useState<number | null>(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef<number[]>([]);

    useEffect(() => {
        for(let i = 0; i < winNumbers.length - 1; i++) {
            timeouts.current[i] = window.setTimeout(() => {
                setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
            }, (i + 1) * 1000);
        }

        timeouts.current[6] = window.setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 7000);
        return () => {
            timeouts.current.forEach((v) => {
                clearTimeout(v);
            });
        };
    }, [timeouts.current]);


    const onClickRedo = useCallback(
        () => {
            setWinNumbers(getWinNumbers());
            setWinBalls([]);
            setBonus(null);
            setRedo(false);
            timeouts.current = [];
        }, [winNumbers],
    );


    return (
        <>
            <div>당첨 숫자</div>
            <div id="result">
                {winBalls.map((v) => <Ball key={v} number={v} />)}
            </div>
            <div>보너스 숫자</div>
            {bonus && <Ball number={bonus} />}
            {redo && <button onClick={onClickRedo}>한 번 더!</button>}
        </>
    )
}

export default Lotto;
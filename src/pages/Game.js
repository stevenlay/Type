import React, { useState, useEffect } from 'react';
import {
  StyledGame,
  StyledScore,
  StyledTimer,
  StyledCharacter
} from '../styled/Game';
import { Strong } from '../styled/Random';

export default function Game({ history }) {
  const MAX_SECONDS = 5;
  const [score, setScore] = useState(0);
  const [ms, setMs] = useState(0);
  const [seconds, setSeconds] = useState(MAX_SECONDS);

  useEffect(() => {
    const currentTime = new Date();
    const interval = setInterval(() => updateTime(currentTime), 105);
    return () => clearInterval(interval);
  }, []);

  const updateTime = startTime => {
    const endTime = new Date();
    const msPassedStr = (endTime.getTime() - startTime.getTime()).toString();
    const formattedMSString = ('0000' + msPassedStr).slice(-5);
    const updatedSeconds =
      MAX_SECONDS - parseInt(formattedMSString.substring(0, 2));

    const updatedMS =
      1000 -
      parseInt(formattedMSString.substring(formattedMSString.length - 3));
    setSeconds(addLeadingZeros(updatedSeconds, 2));
    setMs(addLeadingZeros(updatedMS, 2));
  };

  const addLeadingZeros = (num, length) => {
    let zeros = '';
    for (let i = 0; i < length; i++) {
      zeros += 0;
    }
    return (zeros + num).slice(-length);
  };

  useEffect(() => {
    if (seconds <= -1 && ms <= 1000) {
      history.push('/gameOver');
    }
  }, [seconds, ms, history]);

  return (
    <StyledGame>
      <StyledScore>
        Score: <Strong>{score}</Strong>
      </StyledScore>
      <StyledCharacter>A</StyledCharacter>
      <StyledTimer>
        Time: {seconds} : {ms}
      </StyledTimer>
    </StyledGame>
  );
}

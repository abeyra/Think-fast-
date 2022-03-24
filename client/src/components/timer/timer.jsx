import React, { useState, useEffect } from 'react';

export default function Timer({ hoursMinsSecs }) {
  const { hours, minutes, seconds} = hoursMinsSecs;
  const [[hrs, mins, secs], setTime] = useState([
    hours,
    minutes,
    seconds,
  ]);

  const tick = () => {
    if (hrs === 0 && mins === 0 && secs === 0) {
    //   reset();
    } else if (mins === 0 && secs === 0) {
      setTime([hrs - 1, 59, 59]);
    } else if (secs === 0) {
      setTime([hrs, mins - 1, 59]);
    } else {
      setTime([hrs, mins, secs - 1]);
    }
  };

  const reset = () => {
        alert('time has ran out!');
    }

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });

  if (hrs === 0 && mins === 0 && secs === 0){
    alert('time has ran out!');
  }

  return (
    <>
      <section className="timer">
        <h1 className="timer__title">Think Fast!</h1>
        <p>{`${hrs.toString().padStart(2, '0')}:${mins
            .toString()
            .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}</p>
      </section>
    </>
  );
}

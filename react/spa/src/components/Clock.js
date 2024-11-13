import React, { useState, useEffect } from 'react';

function Clock({ color, time }) {
  return <h1 style={{ color: color }}>{time}</h1>;
};

export default function ClockPanel() {
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
        <Clock color="red" time={time} />
        </div>
    );
};
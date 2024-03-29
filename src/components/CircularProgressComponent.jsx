import React, { useState, useEffect } from "react";

export default function CircularProgressComponent({ progressValue }) {
  const size = 70;

  const [offset, setOffset] = useState(0);

  const center = size / 2;
  const radius = size / 2 - 10;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const progressOffset = ((100 - progressValue) / 100) * circumference;
    setOffset(progressOffset);
  }, [progressValue, circumference]);

  return (
    <div>
      <svg className="mx-auto" width={size} height={size}>
        <circle
          className="stroke-current text-gray-100"
          strokeWidth="10"
          fill="transparent"
          r={radius}
          cx={center}
          cy={center}
        />
        <circle
          className="stroke-current text-green-400"
          strokeWidth="5"
          fill="transparent"
          r={radius}
          cx={center}
          cy={center}
          style={{
            strokeDasharray: `${circumference} ${circumference}`,
            strokeDashoffset: offset,
          }}
        />
        <text
          x={center}
          y={center}
          fontSize="15"
          fill="cyan"
          textAnchor="middle"
          dy=".3em"
        >
          {`${progressValue}%`}
        </text>
      </svg>
    </div>
  );
}

import React, { useState, useEffect } from "react";

export default function GeneralDashboardView() {
  const [progress, setProgress] = useState(20);
  const size = 80;

  const [offset, setOffset] = useState(0);

  const center = size / 2;
  const radius = size / 2 - 10;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const progressOffset = ((100 - progress) / 100) * circumference;
    setOffset(progressOffset);
  }, [progress, circumference]);

  const updateProgress = () => {
    setProgress((prevProgress) => (prevProgress < 100 ? prevProgress + 10 : 0));
  };

  return (
    <div>
      <div></div>
      <svg className="mx-auto" width={size} height={size}>
        <circle
          className="stroke-current text-gray-300"
          strokeWidth="10"
          fill="transparent"
          r={radius}
          cx={center}
          cy={center}
        />
        <circle
          className="stroke-current text-green-300"
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
          fontSize="20"
          fill="#000"
          textAnchor="middle"
          dy=".3em"
        >
          {`${progress}%`}
        </text>
      </svg>
    </div>
  );
}

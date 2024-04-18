import React, { useState, useEffect } from "react";

export default function CircularProgressComponent({
  taskData,
  userEmail,
  progressValue,
  progressValueSize,
  progressLineSize,
  circularLineSize,
  progressDiametroSize,
  forUserData,
}) {
  const size = progressDiametroSize;

  const [offset, setOffset] = useState(0);

  const center = size / 2;
  const radius = size / 2 - 10;
  const circumference = 2 * Math.PI * radius;

  let totalSubTasks = 0;
  let completedSubTasks = 0;

  taskData?.sub_tasks.forEach((subtask) => {
    if (subtask.user_created === userEmail) {
      totalSubTasks++;
      if (subtask.completed) {
        completedSubTasks++;
      }
    }
  });

  const percentageCompleted =
    totalSubTasks > 0 ? (completedSubTasks / totalSubTasks) * 100 : 0;

  useEffect(() => {
    const progressOffset =
      ((100 - (forUserData ? Math.ceil(percentageCompleted) : progressValue)) /
        100) *
      circumference;
    setOffset(progressOffset);
  }, [
    forUserData ? Math.ceil(percentageCompleted) : progressValue,
    circumference,
  ]);

  return (
    <div>
      <svg className="mx-auto" width={size} height={size}>
        <circle
          className="stroke-current text-gray-100"
          strokeWidth={circularLineSize}
          fill="transparent"
          r={radius}
          cx={center}
          cy={center}
        />
        <circle
          className="stroke-current text-green-400"
          strokeWidth={progressLineSize}
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
          fontSize={progressValueSize}
          fill="cyan"
          textAnchor="middle"
          dy=".3em"
        >
          {`${forUserData ? Math.ceil(percentageCompleted) : progressValue}%`}
        </text>
      </svg>
    </div>
  );
}

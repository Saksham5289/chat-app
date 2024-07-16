import React from "react";

interface IconProps {
  dim: string;
  count: number;
}

export const CircularCount = ({ dim, count }: IconProps) => {
  return (
    <div
      style={{ width: dim, height: dim }}
      className="flex items-center justify-center rounded-full overflow-hidden bg-green-500 text-white font-bold text-sm"
    >
      {count}
    </div>
  );
};

import React from "react";

interface Icon {
  dim: string;
  url: string;
}

export const CircularIcon = ({ dim, url }: Icon) => {
  return (
    <div
      style={{ width: dim, height: dim }}
      className="rounded-full overflow-hidden "
    >
      <img src={url} alt="icon" className="w-full h-full object-cover" />
    </div>
  );
};

export default CircularIcon;

interface TitleHeading {
  title: string;
  fontSize: string;
  fontWeight: number;
  color: string;
}

export const FontMono = ({
  title,
  fontSize,
  fontWeight,
  color,
}: TitleHeading) => {
  return (
    <div>
      <p style={{ fontSize, fontWeight, color }} className="font-mono">
        {title}
      </p>
    </div>
  );
};

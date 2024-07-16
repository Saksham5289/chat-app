interface TitleHeading {
  title: string;
  fontSize: string;
  fontWeight: number;
  color: string;
}

export const FontSans = ({
  title,
  fontSize,
  fontWeight,
  color,
}: TitleHeading) => {
  return (
    <div>
      <p style={{ fontSize, fontWeight, color }} className="font-sans">
        {title}
      </p>
    </div>
  );
};

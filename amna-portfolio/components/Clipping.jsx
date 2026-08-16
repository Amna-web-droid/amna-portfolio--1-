export default function Clipping({
  children,
  rotate = 0,
  tape = true,
  interactive = true,
  className = "",
}) {
  return (
    <div
      className={`clipping ${tape ? "" : "clipping-notape"} ${
        interactive ? "clipping-interactive" : ""
      } rounded-sm ${className}`}
      style={{ "--clip-rotate": `${rotate}deg` }}
    >
      {children}
    </div>
  );
}

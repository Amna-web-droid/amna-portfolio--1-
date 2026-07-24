export default function Clipping({
  children,
  rotate = 0,
  tape = true,
  className = "",
}) {
  return (
    <div
      className={`clipping ${tape ? "" : "clipping-notape"} rounded-sm ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </div>
  );
}

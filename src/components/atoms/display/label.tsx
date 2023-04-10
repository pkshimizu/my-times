import clsx from "clsx";

type LabelProps = {
  text: string
}
export default function Label({text}: LabelProps) {
  return (
    <div
      className={clsx(
        "text-base",
      )}
      style={{
        whiteSpace: "pre-wrap",
      }}
    >
      {text}
    </div>
  )
}
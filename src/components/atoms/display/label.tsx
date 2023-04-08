import clsx from "clsx";

type LabelProps = {
  text: string
}
export default function Label({text}: LabelProps) {
  return (
    <div className={clsx(
      "text-base"
    )}>
      {text}
    </div>
  )
}
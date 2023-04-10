import clsx from "clsx";
import dayjs from "dayjs";

type TimeLabelProps = {
  value: string
}
export default function TimeLabel({value}: TimeLabelProps) {
  return (
    <div className={clsx(
      "text-base"
    )}>
      {dayjs(value).format('HH:mm:ss')}
    </div>
  )
}
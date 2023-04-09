import clsx from "clsx";
import dayjs from "dayjs";

type DatetimeLabelProps = {
  value: string
}
export default function DatetimeLabel({value}: DatetimeLabelProps) {
  return (
    <div className={clsx(
      "text-base"
    )}>
      {dayjs(value).format('YYYY-MM-DD HH:mm:ssZ')}
    </div>
  )
}
import Datepicker from "react-tailwindcss-datepicker";
import {useCallback} from "react";
import {DateValueType} from "react-tailwindcss-datepicker/dist/types";

type DatePickerProps = {
  date?: string
  onChange: (date: string) => void
}

export default function DatePicker({date, onChange}: DatePickerProps) {
  const handleChange = useCallback((value: DateValueType) => {
    if (value === null) {
      return
    }
    if (typeof value.startDate === 'string') {
      onChange(value.startDate)
    }
  }, [onChange])
  return (
    <div style={{width: '160px'}}>
      <Datepicker
        value={date ? {startDate: date, endDate: date} : null}
        asSingle
        onChange={handleChange}
      />
    </div>
  )
}
import Datepicker from "react-tailwindcss-datepicker";
import {useState} from "react";
import {DateValueType} from "react-tailwindcss-datepicker/dist/types";

export default function DatePicker() {
  const [date, setDate] = useState<DateValueType>({startDate: new Date(), endDate: new Date()})
  return (
    <div style={{width: '160px'}}>
      <Datepicker
        value={date}
        asSingle
        onChange={setDate}
      />
    </div>
  )
}
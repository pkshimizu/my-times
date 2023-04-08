import clsx from "clsx";
import {ReactNode} from "react";

type FlexProps =  {
  row?: boolean
  column?: boolean
  align?: 'start' | 'end'	| 'center' | 'baseline' | 'stretch'
  children: ReactNode
}

export default function Flex({row, column, align, children}: FlexProps) {
  return (
    <div className={clsx("flex", {
      'flex-row': row,
      'flex-col': column,
      'items-start': align === 'start',
      'items-end': align === 'end',
      'items-center': align === 'center',
      'items-baseline': align === 'baseline'
    })}>
      {children}
    </div>
  )
}
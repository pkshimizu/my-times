import clsx from "clsx";
import {ReactNode} from "react";

type FlexProps =  {
  row?: boolean
  column?: boolean
  align?: 'start' | 'end'	| 'center' | 'baseline' | 'stretch'
  gap?: number
  children: ReactNode
}

export default function Flex({row, column, align, gap = 1, children}: FlexProps) {
  return (
    <div
      className={
        clsx(
          "flex",
          `gap-${gap}`,
          {
            'flex-row': row,
            'flex-col': column,
            'items-start': align === 'start',
            'items-end': align === 'end',
            'items-center': align === 'center',
            'items-baseline': align === 'baseline'
          }
        )}
      style={{
        gap: `${gap * 4}px`
      }}
    >
      {children}
    </div>
  )
}
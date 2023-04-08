import {ReactNode} from "react";
import clsx from "clsx";

type CardProps = {
  width: number
  children: ReactNode
}

export default function Card({width, children}: CardProps) {
  return (
    <div
      className={clsx(
        'shadow',
        'rounded-lg',
        'px-8',
        'py-4',
      )}
      style={{
        width: `${width}px`,
        backgroundColor: 'white'
    }}
    >
      {children}
    </div>
  )
}
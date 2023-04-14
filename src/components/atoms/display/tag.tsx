import {ReactNode} from "react";
import clsx from "clsx";

type TagColor = 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'gray' | 'white'

type TagProps = {
  color: TagColor
  children: ReactNode
}

export default function Tag({color, children}: TagProps) {
  return (
    <div className={
      clsx(
        "ml-4",
        "text-xs",
        "inline-flex",
        "items-center",
        "font-bold",
        "leading-sm",
        "uppercase",
        "px-3",
        "py-1",
        "rounded-full",
        "bg-white",
        "border",
        {"bg-blue-200": color === 'blue' as TagColor },
        {"bg-green-200": color === 'green' as TagColor },
        {"bg-orange-200": color === 'orange' as TagColor },
        {"bg-red-200": color === 'red' as TagColor },
        {"bg-purple-200": color === 'purple' as TagColor },
        {"bg-gray-200": color === 'gray' as TagColor },
        {"bg-white": color === 'white' as TagColor },
        {"text-blue-700": color === 'blue' as TagColor },
        {"text-green-700": color === 'green' as TagColor },
        {"text-orange-700": color === 'orange' as TagColor },
        {"text-red-700": color === 'red' as TagColor },
        {"text-purple-700": color === 'purple' as TagColor },
        {"text-gray-700": color === 'white' as TagColor },
        {"text-gray-700": color === 'white' as TagColor },
      )}
    >
      {children}
    </div>
  )
}
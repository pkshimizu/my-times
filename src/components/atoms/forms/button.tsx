import {ReactNode} from "react";

type ButtonProps = {
  children: ReactNode
  onClick: () => void
}

export default function Button({children, onClick}: ButtonProps) {
  return (
    <button
      className="bg-green-400 hover:bg-green-300 text-white rounded px-4 py-2"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
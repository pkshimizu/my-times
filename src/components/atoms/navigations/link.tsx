import {ReactNode} from "react";

type LinkProps = {
  href: string
  external?: boolean
  children: ReactNode
}

export default function Link({href, external, children}: LinkProps) {
  return (
    <a href={href} target={external ? "_blank" : "_self"}>
      {children}
    </a>
  )
}

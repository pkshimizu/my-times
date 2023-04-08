import clsx from "clsx";

type AvatarProps = {
  url: string
  alt: string
}

export default function Avatar({url, alt}: AvatarProps) {
  return (
    <img
      className={clsx(
        'rounded-full'
      )}
      src={url}
      alt={alt}
      width={24}
      height={24}
    />
  )
}

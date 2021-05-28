import NextLink from 'next/link'
import { ReactNode } from 'react'

const style = {
  primary: `flex justify-start items-center px-4 py-2 gap-2 font-bold rounded-lg transition-colors hover:bg-indigo-100 text-indigo-700`,
  danger: `flex justify-start items-center px-4 py-2 gap-2 font-bold rounded-lg transition-colors hover:bg-pink-100 text-pink-700`
}

const Button = ({
  children,
  click,
  kind = 'primary'
}: {
  children: ReactNode
  click?: () => void
  kind?: keyof typeof style
}) => {
  return (
    <button className={style[kind]} onClick={click}>
      {children}
    </button>
  )
}

const Link = ({
  children,
  href,
  kind = 'primary'
}: {
  children: ReactNode
  href: string
  kind?: keyof typeof style
}) => {
  return (
    <NextLink href={href}>
      <a className={style[kind]}>{children}</a>
    </NextLink>
  )
}

Button.Link = Link

export default Button

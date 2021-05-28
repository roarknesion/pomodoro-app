import { ReactNode } from 'react'

const Header = ({ children }: { children: ReactNode }) => (
  <header className='flex justify-start items-center w-full gap-4 py-2'>{children}</header>
)

const Show = ({ children }: { children: ReactNode }) => (
  <header className='flex justify-center items-center w-full'>{children}</header>
)

Header.Show = Show

export default Header

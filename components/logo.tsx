import Link from 'next/link'

const Logo = ({ title }: { title: string }) => {
  return (
    <Link href='/'>
      <a className='flex items-center justify-start mr-auto gap-2'>
        <span className='flex justify-start items-center font-bold uppercase tracking-widest rounded-lg'>
          Pomodoro
        </span>

        <hr className='block w-[2px] h-[0.5em] bg-indigo-900 rounded-lg border-none' />

        <span className='flex justify-start items-center py-2 gap-2 font-bold rounded-lg transition-colors'>
          <span>{title}</span>
        </span>
      </a>
    </Link>
  )
}

const Show = () => (
  <Link href='/'>
    <a className='flex justify-start items-center px-4 py-12 text-lg font-bold uppercase tracking-widest rounded-lg'>
      Pomodoro
    </a>
  </Link>
)

Logo.Show = Show

export default Logo

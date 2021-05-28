import { useRouter } from 'next/router'

import hook from '~/hooks'

import Link from 'next/link'
import Icon from '~/components/icon'
import Logo from '~/components/logo'
import Header from '~/components/header'

const Index = () => {
  const router = useRouter()
  const project = hook.project()

  return (
    <>
      <Header.Show>
        <Logo.Show />
      </Header.Show>

      <section className='grid grid-cols-3 w-full p-4 gap-4'>
        {project.all().map(({ id, title, session, stopover, playtime }) => (
          <Link href={`/${id}`} key={id}>
            <a className='flex flex-col justify-center items-center w-full p-8 gap-2 rounded-lg transition-colors hover:bg-indigo-100'>
              <span className='text-lg font-bold'>{title}</span>

              <span className='text-xs'>
                {session.time} · {stopover.time} · {playtime.time}
              </span>
            </a>
          </Link>
        ))}

        <button
          className='flex flex-col justify-center items-center w-full p-8 gap-2 h-[116px] rounded-lg transition-colors hover:bg-indigo-100'
          onClick={() => {
            const id = project.add()
            router.push(`/${id}/edit`)
          }}
        >
          <Icon name='plus' size='2em' />
        </button>
      </section>
    </>
  )
}

export default Index

import type { AppProps } from 'next/app'
import Head from 'next/head'

import '~/styles/font.css'
import '~/styles/base.css'
import '~/styles/main.css'

import Link from 'next/link'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Pomodoro App</title>
        <link rel='icon' type='image/svg+xml' href='/favicon.svg' />
      </Head>

      <Component {...pageProps} />

      <footer className='flex justify-center items-center w-full mt-auto pt-8 pb-2'>
        <Link href='https://github.com/roarknesion/pomodoro-app'>
          <a
            className='flex justify-start items-center p-2 text-sm font-bold rounded-lg opacity-50 transition-opacity hover:opacity-100'
            target='_blank'
          >
            Source Code
          </a>
        </Link>
      </footer>
    </>
  )
}

export default App

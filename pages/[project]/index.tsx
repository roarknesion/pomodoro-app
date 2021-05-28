import { useEffect } from 'react'
import { useState } from '@hookstate/core'

import Type from '~/types'

import Icon from '~/components/icon'
import Project from '~/components/project'
import Logo from '~/components/logo'
import Button from '~/components/button'
import Header from '~/components/header'

import Pomodoro from '~/plugins/pomodoro'
import format from '~/plugins/format'

const second = (value: number) => value * 60
let pomodoro = new Pomodoro()

const Component = ({
  project,
  state
}: {
  project: Type.Project.Item

  state: {
    project: Type.Project.StateWrap
    sound: Type.Sound.StateWrap
  }
}) => {
  const step = useState<'session' | 'stopover' | 'playtime'>('session')
  const time = useState(project.session.time)
  const working = useState(false)

  const history = ((s = useState(0)) => ({
    minus: () => !s.get(),
    set: s.set,
    get: () => [...Array(s.get()).keys()]
  }))()

  useEffect(() => {
    pomodoro.on.step = payload => step.set(payload)
    pomodoro.on.time = payload => time.set(payload)
    pomodoro.on.working = payload => working.set(payload)
    pomodoro.on.history = payload => history.set(payload)

    pomodoro.on.move.session = () => {
      state.sound.play(project.session.sound, project.session.repeat)
    }
    pomodoro.on.move.stopover = () => {
      state.sound.play(project.stopover.sound, project.stopover.repeat)
    }
    pomodoro.on.move.playtime = () => {
      state.sound.play(project.playtime.sound, project.playtime.repeat)
    }

    pomodoro.session.set(second(project.session.time))
    pomodoro.stopover.set(second(project.stopover.time))
    pomodoro.playtime.set(second(project.playtime.time))
    pomodoro.interval.set(project.interval)

    pomodoro.jump('session')

    return () => {
      pomodoro = new Pomodoro()
    }
  }, [])

  return (
    <>
      <Header>
        <Logo title={project.title} />

        <Button.Link href={`/${project.id}/edit`}>
          <Icon name='pencil' />

          <span>Edit</span>
        </Button.Link>
      </Header>

      <section className='flex flex-col items-center m-auto rounded-lg'>
        <div className='flex gap-2 w-full justify-evenly'>
          {['session', 'stopover', 'playtime'].map(i => (
            <button
              key={i}
              className={[
                'flex justify-start items-center p-2 font-bold capitalize rounded-lg text-indigo-900 cursor-pointer transition',
                step.value == i ? 'text-opacity-100' : 'text-opacity-50 hover:text-opacity-75'
              ].join(' ')}
              onClick={() => {
                pomodoro.jump(i as 'session' | 'stopover' | 'playtime')
              }}
            >
              <span>{i}</span>
            </button>
          ))}
        </div>

        <div className='flex items-center justify-center font-bold text-6xl tracking-widest px-4 py-8 select-none'>
          {format(time.value).map((char, index) => (
            <span
              key={index}
              className='flex items-center justify-center tracking-normal'
              style={{ width: '1.1ch' }}
            >
              {char}
            </span>
          ))}
        </div>

        <div className='flex w-full justify-evenly items-center'>
          <button
            className={[
              'flex items-center justify-center p-4 rounded-lg transition-colors',
              history.minus() ? 'opacity-50 cursor-default' : 'hover:bg-indigo-100'
            ].join(' ')}
            onClick={pomodoro.history.dec}
            disabled={history.minus()}
          >
            <Icon name='minus' />
          </button>

          <button
            className='flex justify-center items-center p-4 rounded-lg transition hover:bg-indigo-100'
            onClick={() => pomodoro.toggle()}
          >
            {working.value ? (
              <Icon name='player-pause' size='2em' width='2.5' />
            ) : (
              <Icon name='player-play' size='2em' width='2.5' />
            )}
          </button>

          <button
            className='flex items-center justify-center p-4 rounded-lg transition hover:bg-indigo-100'
            onClick={pomodoro.history.inc}
          >
            <Icon name='plus' />
          </button>
        </div>
      </section>

      <section className='flex flex-wrap justify-center items-center w-full gap-2 px-16 min-h-[16px]'>
        {history.get().map(i => (
          <div key={i} className='w-4 h-4 rounded-full bg-indigo-100' />
        ))}
      </section>
    </>
  )
}

const Index = () => <Project Component={Component} />

export default Index

import Type from '~/types'

import Icon from '~/components/icon'
import Project from '~/components/project'
import { ReactNode } from 'react'
import CNumber from '~/components/number'
import Logo from '~/components/logo'
import Button from '~/components/button'
import Header from '~/components/header'
import { useRouter } from 'next/router'
import { useState } from '@hookstate/core'

const Form = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className='flex flex-col w-full gap-4 max-w-xs mx-auto mt-12'>
    <h3 className='flex flex-col font-bold text-lg'>{title}</h3>

    {children}
  </div>
)

const FormItem = ({ title, children }: { title: string; children: ReactNode }) => (
  <label className='flex flex-col gap-1'>
    <span className='w-40 flex items-center font-bold pl-1 text-indigo-900 text-opacity-50'>
      {title}
    </span>

    {children}
  </label>
)

const Component = ({ project, state }: Type.Project.Component) => {
  const router = useRouter()
  const local = useState<Type.Project.Item>(JSON.parse(JSON.stringify(project)))

  return (
    <>
      <Header>
        <Logo title={project.title} />

        <Button
          click={() => {
            state.project.get(project.id).set(JSON.parse(JSON.stringify(local.get())))
            router.push(`/${local.id.get()}/edit`)
          }}
          kind='success'
        >
          <Icon name='check' />

          <span>Save</span>
        </Button>

        <Button
          click={() => {
            if (confirm('Are you sure?')) {
              router.push('/')
              state.project.del(project.id)
            }
          }}
          kind={'danger'}
        >
          <Icon name='trash' />

          <span>Delete</span>
        </Button>

        <Button.Link href={`/${project.id}`}>
          <Icon name='x' />

          <span>Cancel</span>
        </Button.Link>
      </Header>

      <Form title='General'>
        <FormItem title='Title'>
          <input
            className='p-2 w-full  border-2 border-indigo-100 rounded-lg appearance-none transition focus:border-indigo-300'
            value={local.title.get()}
            onChange={e => local.title.set(e.target.value)}
          />
        </FormItem>

        <FormItem title='Slug'>
          <input
            className='p-2 w-full  border-2 border-indigo-100 rounded-lg appearance-none transition focus:border-indigo-300'
            value={local.id.get()}
            onChange={e => local.id.set(e.target.value)}
          />
        </FormItem>

        <FormItem title='Playtime Interval'>
          <CNumber
            min={1}
            value={project.interval}
            change={value => state.project.get(project.id).interval.set(value)}
          />
        </FormItem>
      </Form>

      {[
        {
          title: 'Session',
          item: local.session
        },
        {
          title: 'Stopover',
          item: local.stopover
        },
        {
          title: 'Playtime',
          item: local.playtime
        }
      ].map(({ title, item }) => (
        <Form title={title} key={title}>
          <FormItem title='Time'>
            <CNumber
              min={1}
              max={1440}
              value={item.time.get()}
              change={value => item.time.set(value)}
            />
          </FormItem>

          <FormItem title='Sound'>
            <select
              className='p-2 w-full  border-2 border-indigo-100 rounded-lg appearance-none transition focus:border-indigo-300 capitalize'
              onChange={e => {
                const name = e.target.value as Type.Sound.Names

                state.sound.play(name)

                item.sound.set(name)
              }}
              value={item.sound.get()}
            >
              {state.sound.all().map(i => (
                <option value={i} key={i}>
                  {i.replace(/-/g, ' ')}
                </option>
              ))}
            </select>
          </FormItem>

          <FormItem title='Sound Repeat'>
            <CNumber
              min={1}
              value={item.repeat.get()}
              change={value => item.repeat.set(value)}
            />
          </FormItem>
        </Form>
      ))}
    </>
  )
}

const Edit = () => <Project Component={Component} />

export default Edit

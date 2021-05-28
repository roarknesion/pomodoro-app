import Type from '~/types'

import Icon from '~/components/icon'
import Project from '~/components/project'
import { ReactNode } from 'react'
import CNumber from '~/components/number'
import Logo from '~/components/logo'
import Button from '~/components/button'
import Header from '~/components/header'
import { useRouter } from 'next/router'

const Form = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className='flex flex-col w-full gap-4 max-w-xs mx-auto mt-8'>
    <h3 className='flex flex-col font-bold text-lg'>
      <span>{title}</span>
      <hr className='block w-full h-[2px] bg-indigo-100 rounded-lg border-none' />
    </h3>

    {children}
  </div>
)

const FormItem = ({ title, children }: { title: string; children: ReactNode }) => (
  <label className='flex flex-col gap-1'>
    <span className='w-40 flex items-center font-bold pl-1'>{title}</span>

    {children}
  </label>
)

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
  const router = useRouter()

  return (
    <>
      <Header>
        <Logo title={project.title} />

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
          <Icon name='eye' />

          <span>View</span>
        </Button.Link>
      </Header>

      <Form title='General'>
        <FormItem title='Title'>
          <input
            className='p-2 w-full  border-2 border-indigo-100 rounded-lg appearance-none transition focus:border-indigo-300'
            value={project.title}
            onChange={e => state.project.get(project.id).title.set(e.target.value)}
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
          item: project.session,
          method: state.project.get(project.id).session
        },
        {
          title: 'Stopover',
          item: project.stopover,
          method: state.project.get(project.id).stopover
        },
        {
          title: 'Playtime',
          item: project.playtime,
          method: state.project.get(project.id).playtime
        }
      ].map(({ title, item, method }) => (
        <Form title={title} key={title}>
          <FormItem title='Time'>
            <CNumber
              min={1}
              max={1440}
              value={item.time}
              change={value => method.time.set(value)}
            />
          </FormItem>

          <FormItem title='Sound'>
            <select
              className='p-2 w-full  border-2 border-indigo-100 rounded-lg appearance-none transition focus:border-indigo-300 capitalize'
              onChange={e => {
                const name = e.target.value as Type.Sound.Names

                state.sound.play(name)

                method.sound.set(name)
              }}
              value={item.sound}
            >
              {state.sound.all().map(i => (
                <option value={i} key={i}>
                  {i.replace(/-/g, ' ')}
                </option>
              ))}
            </select>
          </FormItem>

          <FormItem title='Sound Repeat'>
            <CNumber min={1} value={item.repeat} change={value => method.repeat.set(value)} />
          </FormItem>
        </Form>
      ))}
    </>
  )
}

const Edit = () => <Project Component={Component} />

export default Edit

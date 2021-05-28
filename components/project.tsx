import { FunctionComponent, useEffect } from 'react'
import { useRouter } from 'next/router'

import Type from '~/types'
import hook from '~/hooks'

import Link from 'next/link'

const False = () => (
  <Link href='/'>
    <a>Go Home</a>
  </Link>
)

type Prop = {
  project: Type.Project.Item

  state: {
    project: Type.Project.StateWrap
    sound: Type.Sound.StateWrap
  }
}

const Index = ({ Component }: { Component: FunctionComponent<Prop> }) => {
  const router = useRouter()
  const param = router.query.project
  const id = typeof param == 'string' ? param : ''

  const state = {
    project: hook.project(),
    sound: hook.sound()
  }

  const project = state.project.one(id)

  useEffect(() => () => state.sound.pause(), [])

  return project ? <Component project={project} state={state} /> : <False />
}

export default Index

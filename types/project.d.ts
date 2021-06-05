import Sound from '~/types/sound'
import { State } from '@hookstate/core'
import { wrap } from '~/hooks/project'

export type Item = {
  id: string
  title: string
  interval: number

  session: {
    time: number
    sound: Sound.Names
    repeat: number
  }

  stopover: {
    time: number
    sound: Sound.Names
    repeat: number
  }

  playtime: {
    time: number
    sound: Sound.Names
    repeat: number
  }
}

export type List = Item[]

export type StateList = State<List>
export type StateItem = State<Item>
export type StateWrap = ReturnType<typeof wrap>

export type Component = {
  project: Item

  state: {
    project: StateWrap
    sound: Sound.StateWrap
  }
}

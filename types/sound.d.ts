import { State } from '@hookstate/core'
import { wrap } from '~/hooks/sound'
import { names, list } from '~/values/sound'

export type Names = typeof names[number]
export type List = typeof list
export type StateList = State<List>
export type StateWrap = ReturnType<typeof wrap>

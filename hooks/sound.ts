import hookstate from '~/plugins/hookstate'

import Type from '~/types/sound'
import value from '~/values/sound'

let audio: HTMLAudioElement | undefined

const loop = (audio: HTMLAudioElement, repeat = 0) => {
  audio.onended = () => (--repeat ? audio.play().catch(() => {}) : audio.pause())

  audio.play().catch(() => {})
}

export const wrap = (state: Type.StateList) => {
  const method = {} as {
    all: () => Type.List
    play: (name: Type.Names, repeat?: number) => void
    pause: () => void
  }

  method.all = () => state.get()

  method.play = (name, repeat = 1) => {
    if (audio) {
      audio.pause()

      audio.src = `/sounds/${name}.ogg`

      loop(audio, repeat)
    }
  }

  method.pause = () => {
    if (audio) audio.pause()
  }

  return method
}

const state = hookstate.create([...value.list])

const setup = () => {
  const sound = wrap(hookstate.use(state))

  hookstate.effect(() => {
    audio = new Audio()
  }, [])

  return sound
}

export default setup

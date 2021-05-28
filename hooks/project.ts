import hookstate from '~/plugins/hookstate'

import Type from '~/types/project'
import value from '~/values/project'

const wrap = (state: Type.StateList) => {
  const method = {} as {
    all: () => Type.List
    one: (id: Type.Item['id']) => Type.Item | undefined
    get: (id: Type.Item['id']) => Type.StateItem
    add: () => Type.Item['id']
    del: (id: Type.Item['id']) => void
  }

  method.all = () => state.get()

  method.one = id => state.get().find(i => i.id == id)

  method.get = id => {
    const index = state.get().findIndex(i => i.id == id)

    return state[index]
  }

  method.add = () => {
    const item = value.create()

    state.set([...state.get(), item])

    return item.id
  }

  method.del = id => method.get(id).set(hookstate.none)

  return method
}

const state = hookstate.create(value.list)

const setup = () => {
  const project = wrap(hookstate.use(state))

  hookstate.effect(() => {
    state.attach(hookstate.persistence('projects'))
  }, [])

  return project
}

export { wrap }
export default setup

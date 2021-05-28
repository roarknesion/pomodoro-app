type Step = 'session' | 'stopover' | 'playtime'

const state = <T>(value: T, onset = (payload: T) => {}) => ({
  get: () => value,
  set: (payload: T) => {
    onset(payload)

    value = payload

    return payload
  }
})

const Pomodoro = class {
  readonly time = (() => {
    const s = state(0, payload => this.on.time(payload))

    const inc = () => s.set(s.get() + 1)
    const dec = () => s.set(s.get() - 1)

    return { ...s, inc, dec }
  })()

  readonly session = state(1)

  readonly stopover = state(1)

  readonly playtime = state(1)

  readonly interval = state(1)

  readonly history = (() => {
    const s = state(0, payload => this.on.history(payload))

    const inc = () => s.set(s.get() + 1)
    const dec = () => (s.get() ? s.set(s.get() - 1) : s.get())

    return { ...s, inc, dec }
  })()

  readonly step = state<Step>('session', payload => {
    this.on.step(payload)

    const time = () => {
      if (payload == 'stopover') return this.stopover.get()
      if (payload == 'playtime') return this.playtime.get()

      return this.session.get()
    }

    this.time.set(time())
  })

  readonly working = state(false, payload => {
    const { time, step, history, interval, move } = this

    if (payload) {
      const callback = () => {
        if (time.dec() > 0) return

        if (step.get() != 'session') {
          move('session')
        } else {
          history.inc() % interval.get() ? move('stopover') : move('playtime')
        }
      }

      this.timer.set(callback)
    } else {
      this.timer.del()
    }

    this.on.working(payload)
  })

  readonly start = () => this.working.set(true)

  readonly stop = () => this.working.set(false)

  readonly toggle = () => this.working.set(!this.working.get())

  readonly move = (step: Step) => {
    if (step == 'session') {
      this.step.set('session')
      this.on.move.session()
    } else if (step == 'stopover') {
      this.step.set('stopover')
      this.on.move.stopover()
    } else if (step == 'playtime') {
      this.step.set('playtime')
      this.on.move.playtime()
    }
  }

  readonly jump = (step: Step) => {
    if (step == 'session') {
      this.step.set('session')
      this.on.jump.session()
    } else if (step == 'stopover') {
      this.step.set('stopover')
      this.on.jump.stopover()
    } else if (step == 'playtime') {
      this.step.set('playtime')
      this.on.jump.playtime()
    }
  }

  readonly on = {
    time: (payload: number) => {},

    history: (payload: number) => {},

    step: (payload: Step) => {},

    working: (payload: boolean) => {},

    move: {
      session: () => {},
      stopover: () => {},
      playtime: () => {}
    },

    jump: {
      session: () => {},
      stopover: () => {},
      playtime: () => {}
    }
  }

  private timer = {
    id: 0,
    set: (callback: Function) => (this.timer.id = setInterval(callback, 1000)),
    del: () => clearInterval(this.timer.id)
  }
}

export default Pomodoro

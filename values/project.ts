import Project from '~/types/project'
import cuid from 'cuid'

export const create = (): Project.Item => ({
  id: cuid(),
  title: 'Title',
  interval: 4,

  session: {
    time: 25,
    sound: 'early-sunrise',
    repeat: 1
  },

  stopover: {
    time: 5,
    sound: 'good-morning',
    repeat: 1
  },

  playtime: {
    time: 15,
    sound: 'important-stuff',
    repeat: 1
  }
})

export const list: Project.List = [
  {
    id: 'simple',
    title: 'Simple',
    interval: 4,

    session: {
      time: 25,
      sound: 'remembers-me-of-asia',
      repeat: 1
    },

    stopover: {
      time: 5,
      sound: 'rush',
      repeat: 1
    },

    playtime: {
      time: 15,
      sound: 'swinging',
      repeat: 1
    }
  },

  {
    id: 'middle',
    title: 'Middle',
    interval: 4,

    session: {
      time: 50,
      sound: 'remembers-me-of-asia',
      repeat: 1
    },

    stopover: {
      time: 10,
      sound: 'rush',
      repeat: 1
    },

    playtime: {
      time: 30,
      sound: 'swinging',
      repeat: 1
    }
  },

  {
    id: 'hard',
    title: 'Hard',
    interval: 4,

    session: {
      time: 100,
      sound: 'remembers-me-of-asia',
      repeat: 1
    },

    stopover: {
      time: 20,
      sound: 'rush',
      repeat: 1
    },

    playtime: {
      time: 60,
      sound: 'swinging',
      repeat: 1
    }
  }
]

export default { create, list }

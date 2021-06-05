import {
  IconAlien,
  IconCheck,
  IconChevronDown,
  IconEye,
  IconLoader,
  IconMinus,
  IconPencil,
  IconPlayerPause,
  IconPlayerPlay,
  IconPlus,
  IconTrash,
  IconX
} from '@tabler/icons'

const icons = {
  'alien': IconAlien,
  'plus': IconPlus,
  'minus': IconMinus,
  'loader': IconLoader,
  'pencil': IconPencil,
  'x': IconX,
  'player-play': IconPlayerPlay,
  'player-pause': IconPlayerPause,
  'chevron-down': IconChevronDown,
  'trash': IconTrash,
  'eye': IconEye,
  'check': IconCheck
}

export type Props = {
  name?: keyof typeof icons
  size?: '1em' | '2em'
  width?: '2' | '2.5'
  spin?: boolean
}

const Icon = ({ name = 'alien', size = '1em', width = '2', spin = false }: Props) => {
  const Component = icons[name]

  return <Component size={size} strokeWidth={width} className={spin ? 'animate-spin' : ''} />
}

export default Icon

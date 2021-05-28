import { useState } from '@hookstate/core'
import { ChangeEventHandler } from 'react'
import Icon from './icon'

const Number = ({
  value = 0,
  min,
  max,
  step = 1,
  change
}: {
  value: number
  min?: number | undefined
  max?: number | undefined
  step?: number
  change: (value: number) => void
}) => {
  if (max && value > max) change(max)

  return (
    <div className='flex relative'>
      <input
        className='order-2 p-2 w-full appearance-none transition border-2 border-indigo-100 focus:border-indigo-300 text-center ml-[-2px] mr-[-2px] z-10'
        type='number'
        value={value}
        onChange={({ target }) => change(+target.value)}
        onBlur={({ target }) => {
          const number = +target.value

          if (min != undefined && number < min) change(min)

          if (max != undefined && number > max) change(max)
        }}
      />

      <button
        className='order-1 flex items-center justify-center h-10 w-10 flex-shrink-0 rounded-l-lg border-2 border-indigo-100 transition hover:bg-indigo-100 text-indigo-500 hover:text-indigo-900 focus:ring-4 focus:border-indigo-300 focus:z-20 ring-indigo-300 ring-opacity-50 active:ring-2'
        onClick={() =>
          min == undefined
            ? change(value - step)
            : change(value > min + step ? value - step : min)
        }
      >
        <Icon name='minus' />
      </button>

      <button
        className='order-3 flex items-center justify-center h-10 w-10 flex-shrink-0 rounded-r-lg border-2 border-indigo-100 transition hover:bg-indigo-100 text-indigo-500 hover:text-indigo-900 focus:ring-4 focus:border-indigo-300 focus:z-20 ring-indigo-300 ring-opacity-50 active:ring-2'
        onClick={() =>
          max == undefined
            ? change(value + step)
            : change(value < max - step + 1 ? value + step : max)
        }
      >
        <Icon name='plus' />
      </button>
    </div>
  )
}

export default Number

import { useEffect } from 'react'
import { createState, useState, none } from '@hookstate/core'
import { Persistence } from '@hookstate/persistence'

const hookstate = {
  create: createState,
  use: useState,
  effect: useEffect,
  persistence: Persistence,
  none: none
}

export default hookstate

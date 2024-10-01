import { ButtonProps } from '@/types'
import React from 'react'

const button = ({title, color}: ButtonProps) => {
  return (
    <button className='flex justify-center items-center rounded-full text-2xl border bg-blue'>{title}</button>
  )
}

export default button
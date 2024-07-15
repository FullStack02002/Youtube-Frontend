import React from 'react'
import { Input,Button } from '../'

export const Search = ({button}) => {
  return (
    <>
        <form>
        <Input
            placeholder="Search"
        />
        {
          button && (
            <Button className='text-white fixed top-12 right-7 w-[20%] h-[42px]' bgColor='bg-purple-500' type='submit'>Search</Button>
          )
        }
        </form>
    </>
  )
}

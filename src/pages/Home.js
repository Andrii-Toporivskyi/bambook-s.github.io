import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Carousel } from '../Container/Carousel'



export default function contacts() {
  return (
      <Carousel>
          <div className='item item-1'>Item 1</div>
          <div className='item item-1'>Item 2</div>
          <div className='item item-1'>Item 3</div>
      </Carousel>
  )
}



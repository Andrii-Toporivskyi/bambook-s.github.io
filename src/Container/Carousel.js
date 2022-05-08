import React from 'react';
import { Children, useEffect, useState, cloneElement } from 'react'
import './Carousel.css'
// import { FaCheronLeft, FaCheronRight } from 'react-icons/fa'


const PAGE_WIDTH = 450


export const Carousel = ({ children }) => {

    const [pages, setPages] = useState([])
    const [Ofset, setOffset] = useState([])


    const handLeftArrowClick = () => {
        setOffset(currentOffset => {
            const newOffset = currentOffset + PAGE_WIDTH

            console.log(newOffset)
            return Math.min(newOffset, 0)
        })

        console.log('handLeftArrowClick')
    }
    const handRightArrowClick = () => {
        console.log('handRightArrowClick')

        setOffset((currentOffset) => {

            const newOffset = currentOffset - PAGE_WIDTH

            const maxOffset = -(PAGE_WIDTH * (pages.length - 1))
            console.log(newOffset, maxOffset)
            return Math.max(newOffset, maxOffset)

        })
    }

    useEffect(() => {
        setPages(

            Children.map(children, child => {
                return cloneElement(child, {
                    style: {
                        height: '100%',
                        minWidth: `${PAGE_WIDTH}px`,
                        maxWidth: `${PAGE_WIDTH}px`,
                    },
                })
            })
        )

    }, [])





    return (
        <div className="main-container">
            {/* <FaCheronLeft className='arrow' onClick={handLeftArrowClick} /> */}
            <div className="window">
                <div className="all-pages-container"

                    style={{
                        transform: `translateX(${Ofset}px)`,
                    }}
                >{pages}</div>
            </div>
            {/* <FaCheronRight className='arrow' onClick={handRightArrowClick} /> */}
        </div>
    )
}
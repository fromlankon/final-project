import React from 'react'
import { Link } from 'react-router-dom'

export default function FlashSale() {
  return (
    <div className='flashSale'>
        <div className="flashSaleOverlay">
            <div>
                <p className='flashSaleText1'> FLASH SALE </p>
                <p className='flashSaleText2'> -80% </p>
                <p className='flashSaleText3'> When You Buy $100 E-Gift Cards </p>
                <p className='flashSaleText3'> ENDS 22-1-2023 </p>
            </div>
            <Link to={"/shop"} className='flashSaleLink'> SHOP NOW </Link>
        </div>
    </div>
  )
}

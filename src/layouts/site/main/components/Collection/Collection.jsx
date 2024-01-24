import React from 'react'
import { Link } from 'react-router-dom'
import "../../CSS/Main.css"

export default function Collection() {
  return (
    <div className='collection'>
        <div className='collectionContent'>
          <p className='collectionText1'> COAT & JACKETS </p>
          <p className='collectionText2'> The New Fashion </p>
          <p className='collectionText2'> Collection </p>
          <Link to={"/shop"} className='collectionLink'> SHOP NOW </Link>
        </div>
    </div>
  )
}

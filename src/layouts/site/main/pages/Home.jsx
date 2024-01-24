import React, { useEffect } from 'react'
import "../CSS/Main.css"
import Slider1 from '../components/Slider1/Slider1'
import Slider2 from '../components/Slider2/Slider2'
import Collection from '../components/Collection/Collection'
import Slider3 from '../components/Slider3/Slider3'
import Slider4 from '../components/Slider4/Slider4'
import Slider5 from '../components/Slider5/Slider5'
import FlashSale from '../components/FlashSale/FlashSale'

export default function Home() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Slider1 />
      <Slider2 />
      <Collection />
      <Slider3 />
      <Slider4 />
      <Slider5 />
      <FlashSale />
    </>
  )
}
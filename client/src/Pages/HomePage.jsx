import React from 'react'
import MainLayout from '../Layouts/MainLayout'
import ImageSlider from '../Components/ImageSlider'
import News from "../Components/News"

const HomePage = () => {
  return (
    <div>
      <MainLayout>
        <ImageSlider/>
        <News/>
      </MainLayout>
    </div>
  )
}

export default HomePage

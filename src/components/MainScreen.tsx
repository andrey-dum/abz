import React from 'react'
import BgImg from '../img/bg.jpg'

interface IProps {

}

export const MainScreen = () => {
    return (
      <div className={`w-full bg-cover bg-hero h-[650px] flex 
        flex-col justify-center items-center text-white mb-[50px]`}>
          <div className='max-w-[380px] text-center'>
              <h1 className='sectionTitle'>
                Test assignment for front-end developer
              </h1>
              <p className='text-[16px] leading-[26px]'>
                What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
              </p>
          </div>
      </div>
    )
}


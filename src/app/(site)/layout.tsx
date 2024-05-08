import Header from '@/components/landing-page/header'
import React, { ReactNode } from 'react'

const HomePagelayout = ({children}: {children:ReactNode}) => {
  return (
    <main>
      <Header/>
      {children}
    </main>
  )
}

export default HomePagelayout
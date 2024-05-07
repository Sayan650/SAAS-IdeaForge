import React, { ReactNode } from 'react'

const HomePagelayout = ({children}: {children:ReactNode}) => {
  return (
    <main>{children}</main>
  )
}

export default HomePagelayout
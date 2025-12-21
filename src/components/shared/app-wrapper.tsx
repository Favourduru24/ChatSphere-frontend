import React from 'react'

interface Prop {
    children: React.ReactNode
}

const AppWrapper = ({children}: Prop) => {
  return (
    <>
      {children}
    </>
  )
}

export default AppWrapper
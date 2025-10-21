import NavBar from '@/components/NavBar'
import React from 'react'

const layout = ({children}:Readonly<{children:React.ReactNode}>) => {
  return (
    <main>
        <NavBar />
        {children}
    </main>
  )
}

export default layout
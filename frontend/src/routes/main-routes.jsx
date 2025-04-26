import React from 'react'
import { Routes, Route } from 'react-router-dom'

function MainRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<>Hello World</>} />
      </Routes>
    </div>
  )
}

export default MainRoutes

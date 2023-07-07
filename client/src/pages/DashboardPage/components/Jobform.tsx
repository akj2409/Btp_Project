import React from 'react'
import Dashbar from './Dashbar'
import Stepperform from './Stepperform'

const Jobform = () => {
  return (
    <>
    <Dashbar/>
    <div className=" section_padding h-screen bg-background flex justify-center s:px-0 vm:px-0">
      <Stepperform/>
    </div>
    </>
  )
}

export default Jobform
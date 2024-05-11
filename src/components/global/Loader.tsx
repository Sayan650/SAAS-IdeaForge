import Image from 'next/image'
import React from 'react'
import Loading from '../../../public/Spinner.svg'

const Loader = () => {
  return (
    <div role='status'>
        <Image src={Loading} alt='' />
    </div>
  )
}

export default Loader
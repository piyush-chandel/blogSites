import React from 'react'

function Container({children}) {
  // console.log(children);
  return (
    <div className='w-full mx-auto max-w-7xl px-4'>
      {children}
    </div>
  )
}

export default Container;

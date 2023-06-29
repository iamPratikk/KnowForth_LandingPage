import React from 'react'

const Navbar = () => {
  return (
    <div className='flex bg-orange-700 justify-between font-mono' >
        <div className='m-3 p-2' >
            <img className='w-10 h-10' src='https://www.logodesign.net/images/abstract-logo.png'/>
        </div>
        <div className='m-3 p-2' >
            <h1 className='text-2xl font-bold' >Welcome Admin</h1>
        </div>
        <div className='m-3 p-2' >
        <button className= 'rounded-lg w-20 h-8 text-white bg-stone-600 hover:bg-red-400' >Logout</button>
        </div>
    </div>
  )
}


export default Navbar
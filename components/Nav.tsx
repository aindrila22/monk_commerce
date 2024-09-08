import Image from 'next/image'
import React from 'react'

const Nav = () => {
  return (
    <nav className="flex justify-start items-center gap-2 w-full border-b border-gray-200 py-4 px-3">
    <Image src="/monk.png" alt="logo" width={30} height={30} />
    <label className="text-[#7E8185] text-base">Monk Upsell & Cross-sell</label>
  </nav>
  )
}

export default Nav
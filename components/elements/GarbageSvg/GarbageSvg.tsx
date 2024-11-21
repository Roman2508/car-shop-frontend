/* eslint-disable max-len */
import React from 'react'

const GarbageSvg = ({ darkModeClass }: { darkModeClass: string }) => {
  return (
    <svg
      fill={darkModeClass ? '#fff' : '#000'}
      className={darkModeClass}
      width="30px"
      height="30px"
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20 18h2v16h-2z" />
      <path d="M24 18h2v16h-2z" />
      <path d="M28 18h2v16h-2z" />
      <path d="M12 12h26v2H12z" />
      <path d="M30 12h-2v-1c0-.6-.4-1-1-1h-4c-.6 0-1 .4-1 1v1h-2v-1c0-1.7 1.3-3 3-3h4c1.7 0 3 1.3 3 3v1z" />
      <path d="M31 40H19c-1.6 0-3-1.3-3.2-2.9l-1.8-24 2-.2 1.8 24c0 .6.6 1.1 1.2 1.1h12c.6 0 1.1-.5 1.2-1.1l1.8-24 2 .2-1.8 24C34 38.7 32.6 40 31 40z" />
    </svg>
  )
}

export default GarbageSvg

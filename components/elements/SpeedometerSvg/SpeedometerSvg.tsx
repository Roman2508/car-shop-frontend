/* eslint-disable max-len */
import React from 'react'

const SpeedometerSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18px"
      height="18px"
      fill="none"
      viewBox="0 0 24 24"
      data-testid="millage-card-param-icon"
    >
      <g clip-path="url(#millage_svg__a)">
        <path
          fill="currentColor"
          fill-rule="evenodd"
          d="M12 13c-.6 0-1 .4-1 1s.4 1 1 1 1-.4 1-1c0-.5-.4-1-1-1Zm5-4v1.4l-1.3 1.3-1 1c.2.4.3.8.3 1.3 0 1.7-1.3 3-3 3s-3-1.3-3-3 1.3-3 3-3c.5 0 .9.1 1.3.3l1-1L15.6 9H17Zm-5-3c-4.4 0-8 3.6-8 8 0 2.3.4 3.8 1.4 5h13.1c1-1.2 1.4-2.7 1.4-5 .1-4.4-3.5-8-7.9-8Zm0-2c5.5 0 10 4.5 10 10 0 2.2-.3 4.7-2.3 6.7l-.7.3H5l-.7-.3c-2-2-2.3-4.5-2.3-6.7C2 8.5 6.5 4 12 4Z"
          clip-rule="evenodd"
        ></path>
      </g>
      <defs>
        <clipPath id="millage_svg__a">
          <path fill="#fff" d="M2 4h20v17H2z"></path>
        </clipPath>
      </defs>
    </svg>
  )
}

export default SpeedometerSvg

/* eslint-disable max-len */
import React from 'react'

const ConfirmSvg = ({ darkModeClass }: { darkModeClass: string }) => {
  return (
    <svg
      enable-background="new 0 0 32 32"
      version="1.1"
      viewBox="0 0 32 32"
      width="24px"
      height="24px"
      xmlSpace="preserve"
      fill={darkModeClass ? '#fff' : '#000'}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g id="Approved">
        <g>
          <path d="M16,1C7.729,1,1,7.729,1,16s6.729,15,15,15s15-6.729,15-15S24.271,1,16,1z M16,29C8.832,29,3,23.168,3,16S8.832,3,16,3    s13,5.832,13,13S23.168,29,16,29z" />
          <path d="M23.317,10.27l-10.004,9.36l-4.629-4.332c-0.403-0.377-1.035-0.356-1.413,0.047c-0.377,0.403-0.356,1.036,0.047,1.413    l5.313,4.971c0.192,0.18,0.438,0.27,0.683,0.27s0.491-0.09,0.683-0.27l10.688-10c0.403-0.377,0.424-1.01,0.047-1.413    C24.353,9.913,23.719,9.892,23.317,10.27z" />
        </g>
      </g>
      <g id="Approved_1_" />
      <g id="File_Approve" />
      <g id="Folder_Approved" />
      <g id="Security_Approved" />
      <g id="Certificate_Approved" />
      <g id="User_Approved" />
      <g id="ID_Card_Approved" />
      <g id="Android_Approved" />
      <g id="Privacy_Approved" />
      <g id="Approved_2_" />
      <g id="Message_Approved" />
      <g id="Upload_Approved" />
      <g id="Download_Approved" />
      <g id="Email_Approved" />
      <g id="Data_Approved" />
    </svg>
  )
}

export default ConfirmSvg

'use client'

import { usePathname } from "next/navigation";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export function SettingIcon({ isHovered, isSelected }: { isHovered: boolean, isSelected: boolean }) {
    const pathname = usePathname()
    return (
        <svg className="w-9 h-9" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g id="style=stroke">
                <g id="setting">
                    <path className={twMerge(isHovered ? "fill-white" : "fill-black", isSelected && "fill-white")} id="vector (Stroke)" fillRule="evenodd" clipRule="evenodd" d="M12 9.75C10.7574 9.75 9.75 10.7574 9.75 12C9.75 13.2426 10.7574 14.25 12 14.25C13.2426 14.25 14.25 13.2426 14.25 12C14.25 10.7574 13.2426 9.75 12 9.75ZM8.25 12C8.25 9.92893 9.92893 8.25 12 8.25C14.0711 8.25 15.75 9.92893 15.75 12C15.75 14.0711 14.0711 15.75 12 15.75C9.92893 15.75 8.25 14.0711 8.25 12Z" fill="#000000" />
                    <path className={twMerge(isHovered ? "fill-white" : "fill-black", isSelected && "fill-white")} id="vector (Stroke)_2" fillRule="evenodd" clipRule="evenodd" d="M9.60347 3.77018C9.3358 3.32423 8.77209 3.18551 8.35347 3.43457L8.34256 3.44105L6.61251 4.43096C6.06514 4.74375 5.8763 5.45289 6.1894 5.9948L5.54 6.37001L6.18888 5.99391C6.72395 6.91704 6.86779 7.92882 6.38982 8.75823C5.91192 9.58753 4.96479 9.97001 3.9 9.97001C3.26678 9.97001 2.75 10.4917 2.75 11.12V12.88C2.75 13.5084 3.26678 14.03 3.9 14.03C4.96479 14.03 5.91192 14.4125 6.38982 15.2418C6.86773 16.0711 6.72398 17.0827 6.18909 18.0058C5.87642 18.5476 6.06491 19.2561 6.6121 19.5688L8.35352 20.5654C8.77214 20.8144 9.33577 20.6758 9.60345 20.2299L9.71093 20.0442C10.2458 19.1214 11.052 18.4925 12.0087 18.4925C12.9662 18.4925 13.77 19.1219 14.3 20.0458C14.3002 20.0462 14.3004 20.0466 14.3007 20.047L14.4065 20.2298C14.6742 20.6758 15.2379 20.8145 15.6565 20.5655L15.6674 20.559L17.3975 19.5691C17.9434 19.2571 18.1351 18.5578 17.8198 18.0038C17.2858 17.0813 17.1426 16.0705 17.6202 15.2418C18.0981 14.4125 19.0452 14.03 20.11 14.03C20.7432 14.03 21.26 13.5084 21.26 12.88V11.12C21.26 10.4868 20.7384 9.97001 20.11 9.97001C19.0452 9.97001 18.0981 9.58753 17.6202 8.75824C17.1423 7.92899 17.286 6.91744 17.8208 5.99445C18.1336 5.45258 17.9451 4.74391 17.3979 4.43119L15.6565 3.43466C15.2379 3.1856 14.6742 3.32423 14.4065 3.77019L14.2991 3.95579C13.7642 4.8786 12.958 5.50751 12.0012 5.50751C11.0439 5.50751 10.2402 4.87825 9.71021 3.95455C9.70992 3.95403 9.70962 3.95352 9.70933 3.95301L9.60347 3.77018ZM7.59248 2.14193C8.75191 1.45656 10.2226 1.87704 10.8946 3.00654L10.8991 3.01421L11.0091 3.20423L11.0107 3.20701C11.3807 3.85247 11.7666 4.00751 12.0012 4.00751C12.237 4.00751 12.6259 3.85115 13.0009 3.20423C13.001 3.20412 13.0009 3.20434 13.0009 3.20423L13.1154 3.00651C13.7874 1.877 15.2581 1.45656 16.4175 2.14193L18.1421 3.12883C19.4147 3.85604 19.8463 5.48713 19.1194 6.74522L19.1189 6.74611C18.7439 7.39298 18.8028 7.8062 18.9198 8.00929C19.0369 8.21249 19.3648 8.47001 20.11 8.47001C21.5616 8.47001 22.76 9.65323 22.76 11.12V12.88C22.76 14.3317 21.5768 15.53 20.11 15.53C19.3648 15.53 19.0369 15.7875 18.9198 15.9907C18.8028 16.1938 18.7439 16.607 19.1189 17.2539L19.1212 17.2579C19.8444 18.5235 19.4157 20.1431 18.1425 20.871C18.1424 20.871 18.1426 20.8709 18.1425 20.871L16.4174 21.8581C15.258 22.5434 13.7874 22.123 13.1154 20.9935L13.1109 20.9858L13.0009 20.7958L12.9993 20.793C12.6293 20.1476 12.2434 19.9925 12.0087 19.9925C11.773 19.9925 11.3841 20.1489 11.0091 20.7958C11.009 20.7959 11.0091 20.7957 11.0091 20.7958L10.8946 20.9935C10.2226 22.123 8.75199 22.5434 7.59257 21.8581L5.8679 20.8712C5.86776 20.8711 5.86803 20.8713 5.8679 20.8712C4.59558 20.1439 4.16378 18.5128 4.8906 17.2548L4.89112 17.2539C5.26605 16.607 5.20721 16.1938 5.09018 15.9907C4.97308 15.7875 4.64521 15.53 3.9 15.53C2.43322 15.53 1.25 14.3317 1.25 12.88V11.12C1.25 9.66837 2.43322 8.47001 3.9 8.47001C4.64521 8.47001 4.97308 8.21249 5.09018 8.00929C5.20721 7.8062 5.26605 7.39298 4.89112 6.74611L4.8906 6.74522C4.16378 5.48726 4.59518 3.85639 5.86749 3.12906L7.59248 2.14193Z" fill="#000000" />
                </g>
            </g>
        </svg>
    )
}

export function UserListIcon({ isHovered, isSelected }: { isHovered: boolean, isSelected: boolean }) {
    return (
        <svg fill="black" className="w-10 h-10" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0" />
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
            <g id="SVGRepo_iconCarrier">
                <path className={twMerge(isHovered ? "fill-white" : "fill-black", isSelected && "fill-white")} d="M148,80a4.0002,4.0002,0,0,1,4-4h96a4,4,0,0,1,0,8H152A4.0002,4.0002,0,0,1,148,80Zm100,44H152a4,4,0,0,0,0,8h96a4,4,0,0,0,0-8Zm0,48H176a4,4,0,0,0,0,8h72a4,4,0,0,0,0-8ZM145.85742,191.00293a3.9998,3.9998,0,1,1-7.74707,1.99414,60.02112,60.02112,0,0,0-116.2207,0,3.9998,3.9998,0,1,1-7.74707-1.99414,67.92968,67.92968,0,0,1,45.65381-47.93555,44,44,0,1,1,40.40722,0A67.92968,67.92968,0,0,1,145.85742,191.00293ZM80,140a36,36,0,1,0-36-36A36.04061,36.04061,0,0,0,80,140Z" />
            </g>
        </svg>
    )
}

export function PaperIcon({ isHovered, isSelected }: { isHovered: boolean, isSelected: boolean }) {
    return (
        <svg className="w-8 h-8" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" enableBackground="new 0 0 32 32" xmlSpace="preserve" fill="#000000">
            <g id="SVGRepo_bgCarrier" strokeWidth="0" />
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
            <g id="SVGRepo_iconCarrier">
                <g>
                    <path className={twMerge(isHovered ? "fill-white" : "fill-black", isSelected && "fill-white")} d="M21.5,12c0.276,0,0.5-0.224,0.5-0.5v-6C22,5.224,21.776,5,21.5,5h-16C5.224,5,5,5.224,5,5.5v6 C5,11.776,5.224,12,5.5,12H21.5z M6,6h15v5H6V6z" />
                    <path className={twMerge(isHovered ? "fill-white" : "fill-black", isSelected && "fill-white")} d="M4.5,16.5C4.5,16.776,4.724,17,5,17h16c0.276,0,0.5-0.224,0.5-0.5S21.276,16,21,16H5 C4.724,16,4.5,16.224,4.5,16.5z" />
                    <path className={twMerge(isHovered ? "fill-white" : "fill-black", isSelected && "fill-white")} d="M5,22h16c0.276,0,0.5-0.224,0.5-0.5S21.276,21,21,21H5c-0.276,0-0.5,0.224-0.5,0.5S4.724,22,5,22z" />
                    <path className={twMerge(isHovered ? "fill-white" : "fill-black", isSelected && "fill-white")} d="M5,26h16c0.276,0,0.5-0.224,0.5-0.5S21.276,25,21,25H5c-0.276,0-0.5,0.224-0.5,0.5S4.724,26,5,26z" />
                    <path className={twMerge(isHovered ? "fill-white" : "fill-black", isSelected && "fill-white")} d="M30.5,7h-2.104c-0.276,0-0.5,0.224-0.5,0.5S28.12,8,28.396,8H30.5C30.776,8,31,8.225,31,8.5v22 c0,0.275-0.224,0.5-0.5,0.5H26V1.5C26,0.673,25.327,0,24.5,0h-23C0.673,0,0,0.673,0,1.5v28.359C0,31.04,0.96,32,2.141,32H21 c0.276,0,0.5-0.224,0.5-0.5S21.276,31,21,31H2.141C1.512,31,1,30.488,1,29.859V1.5C1,1.225,1.224,1,1.5,1h23 C24.776,1,25,1.225,25,1.5v30c0,0.276,0.224,0.5,0.5,0.5h5c0.827,0,1.5-0.673,1.5-1.5v-22C32,7.673,31.327,7,30.5,7z" />
                </g>
            </g>

        </svg>
    )
}

export function ReviewIcon({ isHovered, isSelected }: { isHovered: boolean, isSelected: boolean }) {
    return (
        <svg className="w-10 h-10" fill="#000000" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <title />
            <g data-name="Layer 32" id="Layer_32">
                <path className={twMerge(isHovered ? "fill-white" : "fill-black", isSelected && "fill-white")} d="M55,12.59l-5,5V55H60V17.59ZM58,53H52V48h6Zm-6-7V18.41l3-3,3,3V46Z" />
                <path className={twMerge(isHovered ? "fill-white" : "fill-black", isSelected && "fill-white")} d="M43.57,9H43V5a2,2,0,0,0-2-2H39a2,2,0,0,0-2,2V9H14V5a2,2,0,0,0-2-2H10A2,2,0,0,0,8,5V9H6.43A2.63,2.63,0,0,0,4,11.79V58.21A2.63,2.63,0,0,0,6.43,61H43.57A2.63,2.63,0,0,0,46,58.21V11.79A2.63,2.63,0,0,0,43.57,9ZM39,5h2v6H39ZM10,5h2v6H10ZM44,58.21c0,.47-.26.79-.43.79H6.43c-.17,0-.43-.32-.43-.79V11.79c0-.47.26-.79.43-.79H8a2,2,0,0,0,2,2h2a2,2,0,0,0,2-2H37a2,2,0,0,0,2,2h2a2,2,0,0,0,2-2h.57c.17,0,.43.32.43.79Z" />
                <rect className={twMerge(isHovered ? "fill-white" : "fill-black", isSelected && "fill-white")} height="2" width="30" x="10" y="22" />
                <rect className={twMerge(isHovered ? "fill-white" : "fill-black", isSelected && "fill-white")} height="2" width="30" x="10" y="28" />
                <rect className={twMerge(isHovered ? "fill-white" : "fill-black", isSelected && "fill-white")} height="2" width="30" x="10" y="34" />
                <rect className={twMerge(isHovered ? "fill-white" : "fill-black", isSelected && "fill-white")} height="2" width="30" x="10" y="40" />
            </g>

        </svg>

    )
}


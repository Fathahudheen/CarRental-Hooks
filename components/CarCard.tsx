"use client"
import { CarProps } from '@/types'
import Image from 'next/image'
import React, { useState } from 'react'
import CustomButton from './CustomButton'
import { calculateCarRent, genarateCarImageUrl } from '@/utils'
import CardDetails from './CardDetails'

interface cardCardProps {
    car: CarProps;
}

const CarCard = ({ car }: cardCardProps) => {
    const [open, setOpen] = useState(false)
    const { city_mpg, drive, make, model, transmission, year } = car;
    const CarRent = calculateCarRent(city_mpg, year);
    return (
        <div className='car-card group'>
            <div className='car-card__content'>
                <h2 className='car-card__content-title'>
                    {make} {model}
                </h2>
            </div>
            <p className='flex mt-6 text-[32px] font-extrabold'>
                <span className='self-start text-[14px] font-semibold'>
                    $
                </span>
                {CarRent}
                <span className='self-end text-[14px] font-medium'>
                    /day
                </span>

            </p>
            <div className='relative w-full h-40 my-3 object-contain'>
                <Image src={genarateCarImageUrl(car)} alt='Car' fill priority className='object-contain' />
            </div>
            <div className='relative flex w-full mt-2'>
                <div className='flex group-hover:invisible w-full justify-between text-gray '>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <Image src='/steering-wheel.svg' alt='steering' width={20} height={20} />
                        <p className='text-[14px]'>
                            {transmission === 'a' ? 'Automatic' : 'Manual'}
                        </p>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <Image src='/tire.svg' alt='tire' width={20} height={20} />
                        <p className='text-[14px]'>
                            {drive.toUpperCase()}
                        </p>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-2 '>
                        <Image src='/gas.svg' alt='gas' width={20} height={20} />
                        <p className='text-[14px]'>
                            {city_mpg} MPG
                        </p>
                    </div>

                </div>
                <div className='car-card__btn-container justify-center'>
                    <CustomButton
                        title='View More'
                        containerStyles=' w-[200px] rounded-full bg-primary-blue'
                        textStyles='text-white text-[14px]  font-bold'
                        rightIcon="/right-arrow.svg"
                        handleClick={() => setOpen(true)}
                    />
                </div>
            </div>
            <CardDetails open={open} closeModal={() => setOpen(false)} car={car} />
        </div>
    )
}

export default CarCard
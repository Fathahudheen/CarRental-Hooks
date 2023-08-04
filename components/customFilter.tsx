"use client"
import { CustomFilterProps } from '@/types'
import { updateSeatchParams } from '@/utils'
import { Listbox, Transition } from '@headlessui/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Fragment, useState } from 'react'
const CustomFilter = ({ title, options,setFilter }: CustomFilterProps) => {
  const [selected, setSelected] = useState(options[0])

  const router = useRouter();
  const handleUpdateParams = (e: { title: string, value: string }) => {
    const newPathName = updateSeatchParams(title, e.value.toLowerCase());

    router.push(newPathName)
  }
  return (
    <div className='w-fit'>
      <Listbox
        value={selected}
        onChange={(e) => {
          setSelected(e);
          setFilter(e.value);
        }
        }
      >
        <div className=' relative w-fit z-10'>
          <Listbox.Button className='custom-filter__btn'>
            <span className='block trancate'>{selected.title}</span>
            <Image
              src='/chevron-up-down.svg'
              width={20}
              height={20}
              className='object-contain'
              alt='chenron up'
            />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100 '
            leaveTo='opacity-0 '>
            <Listbox.Options
              className='custom-filter__options'>
              {options.map((option) => (
                <Listbox.Option
                  key={option.title}
                  value={option}
                  className={({ active }) => `relative cursor-default select-none py-2 px-4 z-30
                ${active ?
                      'bg-primary-blue text-white'
                      :
                      'text-gray-900'}`}
                >
                  {({ selected }) => (
                    <span className={`block trancute ${selected ? 'font-medium' : 'font-normal'} `}>
                      {option.title}
                    </span>
                  )}
                </Listbox.Option>
              ))}

            </Listbox.Options>
          </Transition>

        </div>
      </Listbox >

    </div >
  )
}

export default CustomFilter
'use client'
import { customButonProps } from "@/types"
import Image from "next/image"
const CustomButton = ({title,containerStyles,handleClick,btnType,textStyles,isDisabled,rightIcon}:customButonProps) => {
  return (
    <div>
        <button
        disabled = {false}
        type={btnType || 'button'}
        className={`custom-btn ${containerStyles}`}
        onClick={handleClick}
        >
          <div className="flex">
            <span className={`flex-1 ${textStyles}`}>
                {title}
            </span>
            {rightIcon && (
              <div className=" relative w-6 h-6">
                  <Image
                  src={rightIcon}
                  alt="righticon"
                  fill
                  className="object-contain mx-6"
                  />
              </div>

            )}
              </div>

        </button>
    </div> 
  )
}

export default CustomButton
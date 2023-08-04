'use client'

import { useState } from "react";
import SearchManufacturer from "./SearchManufacturer";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
    <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
        <Image
            src='/magnifying-glass.svg'
            alt="search button"
            width={40}
            height={40}
            className="object-contain"
        />
    </button>
)
const SearchBar = ({ setManufacturer, setModel }) => {
    const [searchManufacturer, setSearchManufacturer] = useState('')
    const [searchModel, setSearchModel] = useState('')
    const router = useRouter();
    const HandleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchManufacturer === '' && searchModel === '') {
            return alert("Please fill in the Search bar")
        }
        setModel(searchModel)
        setManufacturer(searchManufacturer)

    }

    return (
        <form className='searchbar' onSubmit={HandleSearch}>
            <div className="searchbar__item">
                <SearchManufacturer
                    selected={searchManufacturer}
                    setSelected={setSearchManufacturer}
                />
                <SearchButton otherClasses="sm:hidden" />
            </div>
            <div className="searchbar__item">
                <Image
                    src='/model-icon.png'
                    width={25}
                    height={25}
                    className="absolute ml-4"
                    alt="model "
                />
                <input
                    type="text"
                    name="carmodel"
                    value={searchModel}
                    onChange={(e) => setSearchModel(e.target.value)}
                    
                    placeholder="Car Model"
                    className="searchbar__input"
                />

                <SearchButton otherClasses="sm:hidden" />
            </div>
            <SearchButton otherClasses="max-sm:hidden" />

        </form>
    )
}

export default SearchBar
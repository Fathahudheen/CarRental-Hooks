"use client"
import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from '@/components/Index'
import { fuels, yearsOfProduction } from '@/constants';
import { fetchCars } from '@/utils/index';
import Image from 'next/image'
import { useEffect, useState } from 'react';

export default  function Home() {
  const [allcars, setAllcars] = useState([]);
  const [loading, setLoading] = useState(false);

  //search state
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  //filter states
  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState(2022);

  //pagination state
  const [limit, setLimit] = useState(12)

  const getCars = async () => {
    setLoading(true);
    try {
      const result = await fetchCars({
        manufacturer: manufacturer|| '',
        model: model || '',
        fuel: fuel || '',
        year: year || 2022,
        limit: limit || 12,
    });
    setAllcars(result); 
  
    } catch (error) {
      console.log(error);
      
    } finally {
      setLoading(false);
    }
}

useEffect(() => {
  console.log(fuel,year,limit,limit,manufacturer);
  
  getCars();
}, [fuel, year, limit, manufacturer, model]);

const isDataEmpty = !Array.isArray(allcars) || allcars.length < 1 || !allcars;

return (
  <main className="overflow-hidden">
    <Hero />
    <div className='mt-12 padding-x padding-y max-width' id='discover'>

      <div className='home__text-container'>
        <h1 className='text-4xl font-extrabold'> Car Catelogue</h1>
        <p>Explore the cars you might like</p>
      </div>
      <div className='home__filters'>
        <SearchBar setManufacturer ={setManufacturer} setModel={setModel}/>
        <div className='home__filter-container '>
          <CustomFilter title='fuel' options={fuels} setFilter = {setFuel}  />
          <CustomFilter title='year' options={yearsOfProduction} setFilter = {setYear}/>
        </div>
      </div>

      {allcars.length > 0 ? (
        <section>
          <div className='home__cars-wrapper'>
            {allcars?.map((car) => (
              <CarCard car={car} />
            ))}
          </div>
          {loading && (
            <div>
              <Image
              src='/loader.svg'
              alt='loader'
              width={50}
              height={50}
              className='object-contain'
              />
            </div>
          )}
          <ShowMore pageNumber={(limit || 12) / 12} isNext={limit  > allcars.length} setLimit = {setLimit} />
        </section>
      ) : (
        <div>
          <h2>Oops! No results</h2>
          <p className='text-black text-xl font-bold'>{allcars?.message}</p>
        </div>
      )}
    </div> 

  </main>
)
}

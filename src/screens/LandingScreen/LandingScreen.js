import CardItem from './CardItem';
import { Link } from 'react-router-dom';

import { constants } from '../../constants';

export default function LandingScreen() {
  return (
    <main className='flex flex-col w-full min-h-screen justify-center items-center pt-20'>
      <div className='flex flex-col w-[500px] md:w-[1000px]'>
        <div className='text-3xl text-primary font-bold'>
          Choose Pair
        </div>
        <div className='text-lg text-primary mb-2'>
          Please choose pairs from the list below
        </div>

        <div className='flex flex-row w-full flex-wrap'>
          {constants.addresses.map((item) => {
            return (
              <CardItem key={item.name} address={item}/>
            );
          })}
          <div className="flex flex-col w-1/2 md:w-1/4 p-2 ">
            <Link to={`/market/ETH`} className="flex flex-col rounded-3xl px-6 py-8 h-[300px] hover:scale-[99%] duration-300 group hover:cursor-pointer" 
            style={{backgroundColor:'#fff1db'}}>
                <div className='flex flex-row' >
                    <div className="flex flex-col flex-grow ">
                        <div className="flex flex-col mb-2">
                            <div className="text-xl font-medium">Add Custom Pair</div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row w-full justify-center items-center flex-grow">
                    <img alt="token" src='/crypto/other.png' width={150} height={150} className='group-hover:scale-110 duration-300'/>
                </div>

            </Link>
        </div>
        </div>
      </div>
    </main>
  )
}

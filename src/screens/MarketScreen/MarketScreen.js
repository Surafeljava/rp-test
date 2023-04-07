import { useEffect, useState } from 'react';
import { FiChevronDown, FiArrowDown } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";

import { constants } from "../../constants";

export default function MarketScreen() {
    const {token} = useParams();
    const [buy, setBuy] = useState(null);
    const [sell, setSell] = useState(null);

    const [showPopup, setShowPopup] = useState('');

    const addresses = constants.addresses;

    useEffect(() => {
        for(var i=0; i<addresses.length; i++){
            if(addresses[i].name===token){
                setBuy(addresses[i]);
            }
        }
    // eslint-disable-next-line
    },[]);

    return (
        <main className='flex flex-col w-full min-h-screen justify-center items-center pt-16 gap-2'>

            <div className="flex flex-row gap-1 items-center">
                <div className='text-3xl text-primary font-bold'>
                    {buy?.name}
                </div>
                <div className='text-2xl text-primary font-medium'>
                    - {sell?.name}
                </div>
            </div>
            <div className='text-lg text-primary mb-2'>
                Select the pair
            </div>
            <div className='flex flex-row w-full justify-center items-center pt-16 gap-2'>

                <div className='flex flex-col w-[400px] items-start'>


                    <div className="flex flex-col w-full bg-white shadow-md rounded-xl p-4 gap-2 border-slate-700 border-[2px]">
                        <div className='text-lg text-primary font-medium'>
                            Market
                        </div>
                        <div className="w-full h-0.5 bg-slate-200"></div>

                        <div className='text-base text-primary'>
                            You Pay
                        </div>
                        

                        {buy!=null ? (
                            <button onClick={() => setShowPopup('buy')} className='flex flex-row items-center py-2 px-2 rounded-lg hover:bg-slate-100 duration-200 gap-2'>
                                <img src={buy.imageUrl} width={35} height={35} className='rounded-full' alt="token"/>
                                <div className='text-lg text-primary font-medium'>
                                    {buy.name}
                                </div>
                                <FiChevronDown className='text-primary-dark text-xl'/>
                            </button>
                        ) : (
                            <button onClick={() => setShowPopup('buy')} className='flex flex-row gap-2 items-center py-2 px-2 rounded-lg hover:bg-slate-100 duration-200 justify-between'>
                                <div className='text-lg text-primary font-medium'>
                                    Choose Token
                                </div>
                                <FiChevronDown className='text-primary-dark text-xl'/>
                            </button>
                        )}

                        <div onClick={() => {
                            const temp = buy ? {...buy} : null;
                            setBuy(sell ? {...sell} : null);
                            setSell(temp);

                        }} className='relative h-8 flex justify-center items-center duration-200 group'>
                            <div className="w-full h-0.5 bg-slate-200 absolute"></div>
                            <div className="flex flex-row justify-center w-full absolute hover:scale-105">
                                <button className="p-2 rounded-full bg-white border-2 border-slate-200 group-hover:border-slate-300 duration-200 flex justify-center items-center">
                                    <FiArrowDown className='text-slate-400 text-xl'/>
                                </button>
                            </div>
                        </div>

                        <div className='text-base text-primary'>
                            You Recieve
                        </div>


                        {sell!=null ? (
                            <button onClick={() => setShowPopup('sell')} className='flex flex-row items-center py-2 px-2 rounded-lg hover:bg-slate-100 duration-200 gap-2'>
                                <img src={sell.imageUrl} width={35} height={35} className='rounded-full' alt="token"/>
                                <div className='text-lg text-primary font-medium'>
                                    {sell.name}
                                </div>
                                <FiChevronDown className='text-primary-dark text-xl'/>
                            </button>
                        ) : (
                            <button onClick={() => setShowPopup('sell')} className='flex flex-row gap-2 items-center py-2 px-2 rounded-lg hover:bg-slate-100 duration-200 justify-between'>
                                <div className='text-lg text-primary font-medium'>
                                    Choose Token
                                </div>
                                <FiChevronDown className='text-primary-dark text-xl'/>
                            </button>
                        )}


                        <Link to={`/orderbook/${buy?.name}?quoteToken=${buy?.address}&baseToken=${sell?.address}`} className='flex flex-row px-4 py-3 rounded-lg bg-primary justify-center'>
                            <div className='text-base text-white'>
                                Check Order Book
                            </div>
                        </Link>
                    </div>

                </div>
                {showPopup!=='' && (
                    <div className="flex flex-col w-[400px] bg-white shadow-md rounded-xl p-4 gap-2">
                        <div className='text-lg text-primary mb-2'>
                            Choose Token
                        </div>
                        {addresses.map((address) => {
                            return (
                                <button onClick={() => {
                                    if(showPopup==='buy'){
                                        setBuy(address);
                                    }else{
                                        setSell(address);
                                    }
                                    setShowPopup('');
                                }} 
                                className='flex flex-row items-center py-2 px-2 rounded-lg hover:bg-slate-100 duration-200 gap-2'>
                                    <img src={address.imageUrl} width={35} height={35} className='rounded-full' alt="token"/>
                                    <div className='text-lg text-primary font-medium'>
                                        {address.name}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
}

import { useState, useEffect } from "react";
import { constants, utils } from "../../constants";

export default function CardItem({address}) {
    const amt = Math.pow(10,address.decimals);
    const [data, setData] = useState(null);

    const getData = async () => {
        const response = await fetch(`https://api.0x.org/swap/v1/quote?buyToken=USDC&sellToken=${address.address}&sellAmount=${amt}`);
        const d = await response.json();
        setData(d);
    }

    useEffect(() => {
        getData();
    // eslint-disable-next-line
    }, [])


    return (
        <div className="flex flex-col w-1/2 md:w-1/4 p-2 ">
            {data!=null ? (
                <a href={`/orderbook/${address.name}?quoteToken=${address.address}&baseToken=${constants.usdc.address}`} className="flex flex-col rounded-3xl px-6 py-8 h-[300px] hover:scale-[99%] duration-300 group hover:cursor-pointer" 
                style={{backgroundColor:address.color}}>
                    <div className='flex flex-row' >
                        <div className="flex flex-col flex-grow ">
                            <div className="flex flex-col mb-2">
                                <div className="text-xl font-medium">{address.name}</div>
                                <div className="text-sm">/ {constants.usdc.name}</div>
                            </div>
                            <div className="text-2xl font-medium">${data.price ? utils.addCommaToNumber(data.price) : 1}</div>
                            <div className="text-base font-medium">-{data.estimatedPriceImpact ? data.estimatedPriceImpact : 0}%</div>
                        </div>
                        <div className="w-8 h-8 rounded-full border-2 border-white flex justify-center items-center" style={{backgroundColor: address.secondaryColor}}>
                            <div className="text-base font-medium text-white">{`${address.name}`.charAt(0)}</div>
                        </div>
                    </div>
    
                    <div className="flex flex-row w-full justify-center items-center flex-grow">
                        <img alt="token" src={address.imageUrl} width={150} height={150} className='group-hover:scale-110 duration-300'/>
                    </div>
                </a>
            ) : (
                <div className="flex flex-col rounded-3xl px-6 py-8 h-[300px] hover:scale-[99%] duration-300 group hover:cursor-pointer" 
                style={{backgroundColor:address.color}}>
                    
                </div>
            )}
        </div>
    );
}
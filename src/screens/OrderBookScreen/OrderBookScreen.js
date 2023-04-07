import { useEffect, useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";

export default function OrderBookScreen() {
    const {token} = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const quoteToken = searchParams.get('quoteToken');
    const baseToken = searchParams.get('baseToken');
    
    const [data, setData] = useState(null);
    
    const fetchData = async () => {
        const response = await fetch(`https://api.0x.org/orderbook/v1?quoteToken=${quoteToken}&baseToken=${baseToken}`)
        const d = await response.json();
        setData(d);

    }

    useEffect(() => {
        fetchData();
    // eslint-disable-next-line
    }, []);

    return (
        <div className="flex flex-col w-full min-h-screen pt-20 px-6">
            <button onClick={() => navigate(-1)} className="flex flex-row gap-1 items-center mb-4">
                <FiChevronLeft className='text-primary-dark text-lg'/>
                <div className='text-lg text-primary font-medium'>
                    Go Back
                </div>
            </button>

            <div className="flex flex-row gap-1 items-center">
                <div className='text-2xl text-primary font-bold'>
                    {token}
                </div>
                <div className='text-2xl text-primary font-medium'>
                    / USDC
                </div>
            </div>

            <div className='text-lg text-primary font-medium mt-2'>
                Total Records: {data?.bids.records.length}
            </div>

            <div className="flex flex-row gap-6 bg-slate-900 p-2 rounded-lg items-start">
                <table className="w-1/2 bg-slate-900 text-white text-sm">
                    <tr className=" text-slate-300 mb-2">
                        <th className="text-start font-normal text-sm">Price(USDC)</th>
                        <th className="text-end font-normal text-sm">Quantity({token})</th>
                        <th className="text-end font-normal text-sm">Total({token})</th>
                    </tr>
                    {data?.bids.records.map((record) => {
                        return (
                            <tr key={record.metaData.orderHash} className="h-8 py-2 hover:bg-slate-800 duration-200">
                                <td>
                                    <div className="text-green-400 text-sm">
                                        $1,876.19
                                    </div>
                                </td>
                                <td className="text-end text-sm">{record.order.takerAmount}</td>
                                <td className="text-end text-sm">{record.order.makerAmount}</td>
                            </tr>
                        );
                    })}
                </table>

                <table className="w-1/2 bg-slate-900 text-white text-sm">
                    <tr className=" text-slate-300">
                        <th className="text-start font-normal text-sm">Total({token})</th>
                        <th className="text-start font-normal text-sm">Quantity({token})</th>
                        <th className="text-end font-normal text-sm">Price(USDC)</th>
                    </tr>
                    {data?.asks.records.map((record) => {
                        return (
                            <tr key={record.metaData.orderHash} className="h-8 py-2 hover:bg-slate-800 duration-200">
                                <td className="text-start text-sm" >{record.order.takerAmount}</td>
                                <td className="text-start text-sm" >{record.order.makerAmount}</td>
                                <td className="text-red-500 text-end text-sm">$1,876.19</td>
                            </tr>
                        );
                    })}
                </table>
            </div>


        </div>
    );
}
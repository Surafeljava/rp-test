import { useEffect, useState } from "react";
import { FiChevronLeft , FiChevronUp, FiChevronDown} from "react-icons/fi";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { w3cwebsocket as W3CWebSocket } from "websocket";

import { utils, constants } from "../../constants";

const client = W3CWebSocket('wss://api.0x.org/orderbook/v1');

export default function OrderBookScreen() {

    const {token} = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const quoteToken = searchParams.get('quoteToken');
    const [up, setUp] = useState(false);


    var decimal = 18;
    
    for(let i=0; i<constants.addresses.length; i++){
        if(constants.addresses[i].name === token){
            decimal = constants.addresses[i].decimals;
        }
    }
    
    
    const amt = Math.pow(10,decimal);
    const [data, setData] = useState([]);

    const [records, setRecords] = useState([]);

    const checkUp = () => {
        if(data.length<=1){
            setUp(true);
        }else{
            if(data[1].price>data[0].price){
                setUp(false);
            }else{
                setUp(true);
            }
        }
    }

    const getData = async () => {
        const response = await fetch(`https://api.0x.org/swap/v1/quote?buyToken=USDC&sellToken=${quoteToken}&sellAmount=${amt}`);
        const d = await response.json();
        setData((dt) => {
            return [d,...dt];
        });
        console.log('Getting data')
        checkUp();
    }

    useEffect(() => {
        getData();
    // eslint-disable-next-line
    }, [records])

        
    const handleSocketClose = () => {
        client.close();
    }

    useEffect(() => {
        client.onopen = () => {
            console.log("WebSocket Client Connected!");
            client.send(JSON.stringify(
                {
                    type: "subscribe",
                    channel: "orders",
                    requestId: "123e4567-e89b-12d3-a456-426655440004"
                }
            ))
        }
        client.onclose = () => {
            console.log("Websocket dis-connected");
        }
        client.onmessage = (message) => {
            const data = JSON.parse(message.data);
            setRecords((d) => {
                return [data.payload[0], ...d];
            })
        }
        // return handleSocketClose();
    }, [])

    return (
        <div className="flex flex-col w-full min-h-screen pt-20 px-6">
            {/* <div className="flex flex-row">
                <button className='px-2 py-2 bg-red-100 rounded-lg font-medium' onClick={handleSendRequestToWebSocket}>
                    Click Me
                </button>

                <button className='px-2 py-2 bg-red-100 rounded-lg font-medium' onClick={handleSocketClose}>
                    Stop Connection
                </button>
            </div> */}

            <button onClick={() => {
                handleSocketClose();
                navigate(-1)
            }} className="flex flex-row gap-1 items-center mb-4">
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

            <div className="flex flex-row gap-2 text-lg text-primary font-medium items-center my-2">
                <div className=''>
                    Last Traded Price: 
                </div>
                <div className="text-green-500">${data[0] ? utils.addCommaToNumber(data[0]?.price) : 0.00}</div>
                {up ? <FiChevronUp className='text-green-500 text-lg'/> : <FiChevronDown className='text-red-500 text-lg'/>}
            </div>

            <div className="flex flex-row gap-6 bg-slate-900 p-4 rounded-lg items-start">
                <table className="w-1/2 bg-slate-900 text-white text-sm">
                    <tr className=" text-yellow-400 mb-2">
                        <th className="text-start font-normal text-sm">Price(USDC)</th>
                        <th className="text-end font-normal text-sm">Taker Amount({token})</th>
                        <th className="text-end font-normal text-sm">Maket Amount({token})</th>
                    </tr>
                    {records.slice(0, 20).map((record, index) => {
                        return (
                            <tr key={index} className="h-8 py-2 hover:bg-slate-800 duration-200">
                                <td>
                                    {data[index] ? (
                                        <div className={`text-sm ` + (data[index]?.price >= data[0]?.price ? 'text-green-500' : 'text-red-500')}>
                                            ${utils.addCommaToNumber(data[index]?.price)}
                                        </div>
                                    ) : <div></div>}
                                </td>
                                <td className="text-end text-sm">{record.order.takerAmount}</td>
                                <td className="text-end text-sm">{record.order.makerAmount}</td>
                            </tr>
                        );
                    })}
                </table>

                {/* <table className="w-1/2 bg-slate-900 text-white text-sm">
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
                </table> */}
            </div>


        </div>
    );
}
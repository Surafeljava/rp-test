import { Link } from "react-router-dom";

export default function AppBar () {
    return (
        <div className="fixed w-full py-4 px-8 bg-slate-100">
            <Link to={'/'} className='text-2xl text-primary font-bold'>RISK PROTOCOL TEST</Link>
        </div>
    );
}
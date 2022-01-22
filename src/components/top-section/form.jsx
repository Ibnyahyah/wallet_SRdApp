import React,{useContext} from 'react';
import { TransactionContext } from '../../context/TransactionContext';

export const SendingFrom=()=>{

    const {setFormData, sendTransaction,loading } = useContext(TransactionContext);
    const addressTo = React.useRef();
    const amount = React.useRef();
    const message = React.useRef();
    const keyword = React.useRef();
    
    const handleSubmit =async(e)=>{
        e.preventDefault();

        const Data ={
            addressTo: addressTo.current.value,
            amount: amount.current.value,
            message: message.current.value,
            keyword: keyword.current.value,
        }
        if(!addressTo || !amount || !keyword || !message)return;
        
        await setFormData(Data)
        sendTransaction();
        e.target.value = "";
    }
    return(
        <div className="card aiCard bg-gray-1" style={{width:'100%'}}>
            <form onSubmit={handleSubmit}>
                <div>
                    <input className="p-1 mt-1 bg-gray-light-4" type="text" ref={addressTo} placeholder="0xed"/>
                </div>
                <div>
                    <input className="p-1 mt-1 bg-gray-light-4" type="text" ref={amount} placeholder="0.001"/>
                </div>
                <div>
                    <input className="p-1 mt-1 bg-gray-light-4" type="text" ref={message} placeholder="message"/>
                </div>
                <div>
                    <input className="p-1 mt-1 bg-gray-light-4" type="text" ref={keyword} placeholder="narration"/>
                </div>
                <div>
                    <button className="btn-gray:hover btn-gray mt-1">{loading?"Loading...":"Send"}</button>
                </div>
            </form>
        </div>
    )
}

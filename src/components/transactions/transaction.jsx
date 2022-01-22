import React from 'react';
import { TransactionContext } from '../../context/TransactionContext';
import { ShortenAddress } from "../../utils/shortenAddress";


const Transactions = ({addressTo,timestamp,keyword,message,amount,addressFrom,gas})=>{
    return(
            <tbody key={timestamp}>
                <tr className="font-2 gap-1 bg-gray-light-7">
                    <td className="text-gray font-2 hide-overflow">{ShortenAddress(addressFrom)}</td>
                    <td className="text-blue font-2 hide-overflow">{ShortenAddress(addressTo)}</td>
                    <td className="text-gray font-2 hide-overflow">{message}</td>
                    <td className="text-black">{keyword}</td>
                    <td className="text-blue font-1 hide-overflow">{timestamp}</td>
                    <td className="text-white font-1 hide-overflow">{amount} ETH</td>
                    <td><a href={`https://ropsten.etherscan.io/address/${addressFrom}`} className="text-red font-3" target="_blank" rel="noreferrer">Scan</a></td>
                </tr>
            </tbody>
    )
}

const Transaction = ()=>{
    const { currentAccount, transactions, loading } = React.useContext(TransactionContext);
    if(loading){
        return(
            <div className='text-center text-black m-1'>
                <p>Loading...</p>
            </div>
        )
    }
    return(
        <div className="container card bg-gray-light-7 mt-5 mb-5">
            <h2 className="text-blue">Transactions</h2>
            <hr className="mt-1 mb-1"/>
            {!currentAccount?
            <>
                <p className="mb-1">Latest 0 from 0 of transactions</p>
                <h2 className="text-center text-black">Please Connect Your wallet to see your lastest Transaction</h2>
            </>
            :
            <div className="transaction">
                <p className="mb-1">Latest 1 from a total of transactions</p>
                <table width="100%">
                    <thead>
                        <tr className="bg-gray-light-5 p-1">
                            <th>From</th>
                            <th>To</th>
                            <th className="text-gray font-3">Message</th>
                            <th className="text-gray font-3">Narration</th>
                            <th className="text-blue font-3">Age</th>
                            <th>Value</th>
                            <th className="text-red font-3">[View]</th>
                        </tr>
                    </thead>
                    {transactions.reverse().map((transaction, i)=>{
                        return(
                            <Transactions key={i} {...transaction}/>
                        )
                    })}
                </table>
            </div>}
        </div>
    )
}
export default Transaction
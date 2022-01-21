import { Transac } from "./demo"
import React from 'react';
import { TransactionContext } from '../../context/TransactionContext';
import { ShortenAddress } from "../../utils/shortenAddress";


const Transactions = ({addressTo,timestamp,keyword,message,amount,url,addressFrom,gas})=>{
    return(
            <tbody key={id}>
                <tr className="font-2 gap-1 bg-gray-light-7">
                    <td className="text-blue font-2 hide-overflow">{ShortenAddress(addressTo)}</td>
                    <td className="text-gray font-2 hide-overflow">{ShortenAddress(addressFrom)}</td>
                    <td className="text-gray font-2 hide-overflow">{message}</td>
                    <td className="text-black">{keyword}</td>
                    <td className="text-blue font-1 hide-overflow">{timestamp}</td>
                    <td className="text-blue font-1 hide-overflow">{amount} ETH</td>
                    <td><a href={`https://ropsten.etherscan.io/address/${addressFrom}`} target="_blank" rel="noreferrer">{url}</a></td>
                    <td className="text-red font-3">{gas}</td>
                </tr>
            </tbody>
    )
}

const Transaction = ()=>{
    const { currentAccount } = React.useContext(TransactionContext);

    // console.log(getAllTransactions)
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
            <div>
                <p className="mb-1">Latest 1 from a total of transactions</p>
                <table width="100%">
                    <thead>
                        <tr className="bg-gray-light-5 p-1">
                            <th>Txn Hash</th>
                            <th className="text-gray font-3">Narration</th>
                            <th className="text-gray font-3">Message</th>
                            <th className="text-blue font-3">Age</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Value</th>
                            <th className="text-red font-3">[Txn Fee]</th>
                        </tr>
                    </thead>
                    {/* {availableTransactions.reverse.map((transaction, i)=>{
                        return(
                            <Transactions key={i} {...transaction}/>
                        )
                    })} */}
                </table>
            </div>}
        </div>
    )
}
export default Transaction
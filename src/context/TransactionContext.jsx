import React,{useEffect} from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = ()=>{
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress,contractABI, signer);

    return transactionContract;
}

export const TransactionProvider = ({children})=>{

    const [currentAccount, setCurrentAccount] = React.useState('');
    const [formData, setFormData] = React.useState({ addressTo: '', amount:'', keyword:'', message:''});
    const [loading, setLoading] = React.useState(false);
    const [transactionCount, settransactionCount] = React.useState(localStorage.getItem('transactionCount'));

    // const handleChange = (e, name)=>{
    //     setFormData((prevState)=> ({...prevState, [name]: e.target.value}));
    // }

        const getAllTransactions = async()=>{
            try{
                if(!ethereum) return alert('Please Install metamask');
                const transactionContract = getEthereumContract();
                const availableTransactions = await transactionContract.getAllTransactions();

                console.log(availableTransactions)
            }catch(error){
                console.log(error)
            }
        }
    const checkIfWalletIsConnected = async()=>{
        try{
            if(!ethereum) return alert('Please Install metamask');

            const accounts = await ethereum.request({ method:'eth_accounts' });
            if(accounts.length){
                setCurrentAccount(accounts[0]);
                getAllTransactions()
                console.log(accounts)
            }else{
                console.log("No account found")
            }
        }catch(error){
            console.log(error);

            throw new Error("No ethereum object")
        }

    }

    const connectWallet = async ()=>{
        try{
            if(!ethereum)return alert("please install metamask");
            const accounts = await ethereum.request({ method:'eth_requestAccounts' });

            setCurrentAccount(accounts[0])
        }catch(error){
            console.log(error);

            throw new Error("No ethereum object")
        }
    }


    const checkIfTransactionExist =async()=>{
        try{
            const transactionContract = getEthereumContract();
            const transactionCount = await transactionContract.getTransactionCount();

            window.localStorage.setItem("transactionCount", transactionCount);
        }catch(error){
            console.log(error);

            throw new Error("No ethereum object")
        }
    }

    // Sending transaction
    const sendTransaction = async()=>{
        try{
            if(!ethereum)return alert('Please Install metamask');
            const {addressTo, amount, keyword, message} = formData;
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method:'eth_sendTransaction',
                params:[{
                    from:currentAccount,
                    to:addressTo,
                    gas: '0x5208', // 21000 Gwei
                    value: parsedAmount._hex, //0.0001

                }]
            })
            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

            setLoading(true)
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setLoading(false)
            console.log(`Successful - ${transactionHash.hash}`);

            const transactionCount = await transactionContract.getTransactionCount();

            settransactionCount(transactionCount.toNumber());
        }catch(error){
            console.log(error);

            throw new Error("No ethereum object")
        }

    }

    useEffect(()=>{
        checkIfWalletIsConnected();
        checkIfTransactionExist();
    },[])
    return(
        <TransactionContext.Provider value={{connectWallet, currentAccount, setFormData, sendTransaction}}>
            {children}
        </TransactionContext.Provider>
    )
}
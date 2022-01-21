import React, {useContext} from "react";
import { CardData } from "./card-data";
import { SendingFrom } from "./form";
import { TransactionContext } from '../../context/TransactionContext';
import { ShortenAddress } from '../../utils/shortenAddress'
const TopSection = () =>{
    const { connectWallet, currentAccount } = useContext(TransactionContext);
    
    return(
        <div className="container">
            <div className="row gap-1" style={{marginTop:'150px'}}>
                <div className="col-12-sm col-6-md">
                    <h2 className="font-4 font-xxl">Welcome to SRdApp</h2>
                    <p className="font-2 font-md">A Gaming , Nft , Web 3.0 Chat and Explore</p>
                    <div className="row text-black gap-1 mt-2">
                        {CardData.map(({id, content})=>(
                            <div className="col-4-sm" key={id}>
                                <div className="card bg-white display-f justify-center align-center" style={{width:'100%', height:'100px'}}>
                                    <h2 className="font-3 font-lg">{content}</h2>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="btn-blue:hover btn-blue br-sm" onClick={connectWallet}>{currentAccount?"Connected":"Connect to Wallet"}</button>
                </div>
                <div className="col-12-sm col-6-md">
                    <div className="card bg-gray-light-7 mt-1 mb-2">
                        <div className="display-f justify-space-between">
                            <div className="display-f justify-center align-center" style={{width:'50px', height:'50px', border:'3px solid white', borderRadius:'50%'}}>
                                SR
                            </div>
                            <div  className="display-f justify-center align-center" style={{width:'20px', height:'20px', border:'1px solid white', borderRadius:'50%'}}>
                                !
                            </div>
                        </div>
                        <div className="mt-3">
                            <p>{ShortenAddress(currentAccount)}</p>
                            <h2 className="font-3 font-lg">SR</h2>
                        </div>
                    </div>
                    <SendingFrom/>
                </div>
            </div>
        </div>
    )
}
export default TopSection;
import React, { useState, useEffect } from "react";
import StorageContract from "./contracts/Storage.json";
import getWeb3 from "./getWeb3";

import "./App.css";
import Home from "./views/Home";
import BlockChainContext from "./utils/BlockchainContext";

const App = () => {
  const [web3, setWeb3] = useState(undefined)
  const [accounts, setAccounts] = useState([])
  const [contract, setContract] = useState({})
  const [files, setFiles] = useState([])
  const [fileCount, setFileCount] = useState(null)

  useEffect(() => {
    const init = async () => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = StorageContract.networks[networkId];
        const instance = new web3.eth.Contract(
          StorageContract.abi,
          deployedNetwork && deployedNetwork.address,
        )

        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        setWeb3(web3)
        setAccounts(accounts)
        setContract(instance)
      } catch (error) {
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    }
    init()
  }, [])



  useEffect(() => {
    const getFiles = async () => {
      const filecount = await contract.methods.fileCount().call()
      setFileCount(filecount)

      const filesCollection = []

      for(let i = filecount; i >= 1; i--){
        let curFile = await contract.methods.files(i).call()
        filesCollection.push(curFile)
      }
      setFiles(filesCollection)
    }

    if (web3 !== undefined
      && accounts !== undefined
      && Object.keys(contract).length) {
        getFiles()
    }
  }, [web3, accounts, contract])


  const values = {web3, accounts, contract, files, fileCount}


  if (typeof web3 === 'undefined') {
    return <div>Loading Web3, accounts, and contract...</div>;
  }
  else {
    return (
      <BlockChainContext.Provider value={values}>
        <div className="App">
          <Home />
        </div>
      </BlockChainContext.Provider>
    );
  }
}

export default App;
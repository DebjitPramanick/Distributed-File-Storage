import React, { useState, useEffect } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import "./App.css";
import Home from "./views/Home";

const App = () => {
  // const [storageVal, setStorageVal] = useState(undefined)
  const [web3, setWeb3] = useState(undefined)
  const [accounts, setAccounts] = useState([])
  const [contract, setContract] = useState({})

  useEffect(() => {
    const init = async () => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        console.log(networkId)
        const deployedNetwork = SimpleStorageContract.networks[networkId];
        console.log(deployedNetwork)
        const instance = new web3.eth.Contract(
          SimpleStorageContract.abi,
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
    const load = async () => {
      // Stores a given value, 5 by default.
      await contract.methods.set(5807).send({ from: accounts[0] });

      // Get the value from the contract to prove it worked.
      const response = await contract.methods.get().call();

      console.log(response)

      // Update state with the result.
    }

    if (web3 !== undefined
      && accounts !== undefined
      && Object.keys(contract).length) {
      load()
    }
  }, [web3, accounts, contract])


  if (typeof web3 === 'undefined') {
    return <div>Loading Web3, accounts, and contract...</div>;
  }
  else {
    return (
      <div className="App">
        <Home />
      </div>
    );
  }
}

export default App;
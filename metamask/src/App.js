import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const abi = [{"inputs":[{"internalType":"string","name":"methodName","type":"string"},{"internalType":"string","name":"ipfsCodeLink","type":"string"}],"name":"addMethod","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"ipfsCodeLink","type":"string"}],"name":"pickMethod","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"registry","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"workerNodes","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]

function App() {
  const [haveMetamask, sethaveMetamask] = useState(true);
  const [accountAddress, setAccountAddress] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  useEffect(() => {
    const { ethereum } = window;
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      sethaveMetamask(true);
    };
    checkMetamaskAvailability();
  }, []);

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      let balance = await provider.getBalance(accounts[0]);
      let bal = ethers.utils.formatEther(balance);
      setAccountAddress(accounts[0]);
      setAccountBalance(bal);
      setIsConnected(true);

      const address = "0x1d8c93594ACF9aFd855a22aA75de0778C498bCAf";

      const signer = provider.getSigner();
      const contract = new ethers.Contract(address, abi, signer)

      contract.addMethod("fn1", "ipfs1").then((txn) => {
        console.log(txn);
      })

      console.log({contract})

    } catch (error) {
      setIsConnected(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {haveMetamask ? (
          <div className="App-header">
            {isConnected ? (
              <div className="card">
                <div className="card-row">
                  <h3>Wallet Address:</h3>
                  <p>
                    {accountAddress.slice(0, 4)}...
                    {accountAddress.slice(38, 42)}
                  </p>
                </div>
                <div className="card-row">
                  <h3>Wallet Balance:</h3>
                  <p>{accountBalance}</p>
                </div>
              </div>
            ) : (
              null
            )}
            {isConnected ? (
              <p className="info">🎉 Connected Successfully</p>
            ) : (
              <button className="btn" onClick={connectWallet}>
                Connect
              </button>
            )}
          </div>
        ) : (
          <p>Please Install MataMask</p>
        )}
      </header>
    </div>
  );
}

export default App;

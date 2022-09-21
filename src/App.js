import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import contractAbi from './abi/abiMarketplace.json';
var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider);

const contractAddress = "0xc419E217F1DB559DA1d1Fd14CeABc59e8A3b8546";
const abi = contractAbi.marketplaceAbi;

function App() {
  let type = ""
  const [currentAccount, setCurrentAccount] = useState(null);
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemOptions, setItemOptions] = useState([]);

  const checkWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum)
    {
      console.log("Make sure you have Metamask installed!");
      return;
    }
    else
    {
      console.log("Wallet exists! We're ready to go!")
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0)
    {
      const account = accounts[0];
      console.log("Found an authorised account: ", account);
      setCurrentAccount(account);
    }
    else
    {
      console.log("No authorised account found");
    }
  }

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum)
    {
      alert("Please install Metamask!");
    }

    try
    {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log("Found an account! Address: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    }
    catch (err)
    {
      console.log(err)
    }
  }

  const marketplace = async () => {
    try
    {
      if (window.ethereum)
      {
        const marketplaceContract = new web3.eth.Contract(abi, contractAddress);
        let itemExists = await marketplaceContract.methods.itemExists(itemName.toLowerCase()).call();
        if(type == "Buy")
        {
          if(itemExists)
          {
            let priceMatch = await marketplaceContract.methods.priceMatch(itemName.toLowerCase(), itemPrice).call();
            if(priceMatch)
            {
              let buyItem = await marketplaceContract.methods.buyItem(itemName.toLowerCase(), itemPrice).send({from: currentAccount}, function(error, txHash)
              {
                  if(error)
                      console.log(error);
                  else
                  {
                    alert("Transaction has been sent succesfully!");
                    console.log(txHash);
                    window.location.reload();
                  }
              })
            }
            else
              alert("Your entered amount is less than the asking price");
          }
          else
            alert("Item you're attempting to buy doesn't exist")
        }
        else if(type == "Sell")
        {
          if(!itemExists)
          {
            let itemForSale = await marketplaceContract.methods.itemsForSale(itemName.toLowerCase(), itemPrice).send({from: currentAccount}, function(error, txHash)
            {
                if(error)
                    console.log(error);
                else
                {
                  alert("Transaction has been sent succesfully!");
                  console.log(txHash);
                  window.location.reload();
                }
            })
          }
          else
            alert("Item with the same name is already for sale");
        }
      }
      else
      {
        console.log("Ethereum object does not exist");
      }
    }
    catch (err)
    {
      console.log(err);
    }
  }

  const getDropdownItemList = async () => {
    const marketplaceContract = new web3.eth.Contract(abi, contractAddress);
    
    setItemOptions(itemOptions => [...itemOptions, <option value="0">Items:</option>])
    var items = await marketplaceContract.methods.getItemsForSaleByIndex().call();
    for (let i = 0; i < items.length; i ++)
    {
      if(items[i].exists)
        setItemOptions(itemOptions => [...itemOptions, <option>Item name: {items[i].name} Item price: {items[i].price}</option>])
    }
  }

  const displayDropdownItemList = () => {
    return (
      <div>
        <h1>Items for sale:</h1>
        <select id="dropdown">
          {itemOptions}
        </select>
      </div>
    )
  }

  const connectWalletButton = () => {
    return (
      <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
        Connect Wallet
      </button>
    )
  }

  useEffect(() => {
    checkWalletIsConnected();
    getDropdownItemList();
  }, [])


  const handleBuySubmit = event => {
    console.log('handleBuySubmit ran');
    event.preventDefault(); //Prevent page refresh.

    if (!itemName || !itemPrice) 
      alert("Fields cannot be left empty");
    else
    {
      type = "Buy";
      marketplace();
    }
  };

  const handleSellSubmit = event => {
    console.log('handleSellSubmit ran');
    event.preventDefault(); //Prevent page refresh.

    if (!itemName || !itemPrice)
      alert("Fields cannot be left empty");
    else
    {
      type = "Sell";
      marketplace();
    }
  };

  return (
    
    <div className='main-app'>
      <h1 id="marketplace_text">Marketplace</h1>
      <div>
        {currentAccount ? <p>{currentAccount}</p> : connectWalletButton()}
      </div>
      {displayDropdownItemList()}
      <div>
        <form>
          <label>
            <p>Item name</p>
            <input name="itemName" onChange={event => setItemName(event.target.value)} value={itemName} required/>
          </label>
          <label>
            <p>Item price</p>
            <input type="number" name="itemPrice" min="1" onChange={event => setItemPrice(event.target.value)} value={itemPrice} required/>
          </label>
          <br></br>
        <button className="submit-button" type="submit" value="sell" onClick={handleSellSubmit}>Sell</button>
        <button className="submit-button" type="submit" value="buy" onClick={handleBuySubmit}>Buy</button>
        </form>
      </div>
    </div>

    
  )
}

export default App;
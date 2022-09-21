# Marketplace

## Problem solving thought process:

I typically solve problems using the divide and conquer approach. So I have a basic front-end and smart contract side.

I start off with the smart contract first.

### Smart contract:

Typically, when constructing smart contracts, I follow some guidelines, to help reduce gas cost, and help with potential hacks. For example:

1. Only contain basic functionality - only allow the basic code I want on the blockchain - private and local variables are visible on the blockchain - keep contracts small, modular and easily understandable.
2. Limit gas use (use local variables to store storage variables for looping) - keeping contract small and simple helps with gas reduction.
3. If external contracts/libraries are needed, use well tested ones i.e. open zeppelin.
4. Test code (unit testing).
5. Checks-effects-interactions pattern (help reentrancy attack).
6. Pull-over-push pattern.
7. Include a pause in the contract (so if a bug is found in the contract, I can pause the contract and sort the bug out).
8. Proxy contract, which ties in with point number 7.

### In regards to the interview challenge test:

Looking at the problem to solve, it requires a buy function and a sell function. Since only one item of the same name can exist, I need to check in the "sell" function whether the item the user wants to sell already exists. This will be a require check, to ensure we have valid inputs and valid conditions in our contract. I'm also going to be storing the data in a mapping, where item name points to an item struct (which will contain price, index, and a boolean of whether the item exists).

I also will have an array, which will simply store the item struct, and this will be used on the front end to display the current items for sale, as solidity doesn't allow for a mapping to be returned in a method.

I will also have 2 events, one for when an item is added to the "sell" method, and one for when an item is "bought".

**Below is the outline of my 2 methods (one for selling items, and one for buying items):

### itemsForSale function:

-Check if sell item's name already exists.
-Add item name, user name, item price to "items to sell" mapping and array.
-Emit "ItemToSell" event.


### buyItem function:

-Check if item name exists.
-Check if price entered matches or is greater than the asking price of the item for sale.
-Remove the bought item (user's name, item name, item price) from the "items to sell" mapping.
-Set the exists bool for the item to false (within the "items to sell" array), this way we don't display the item on the front end.
-Emit "ItemBought" event.

### Additional methods:

I will also have additional methods, like a method for returning the "items for sale" array, which will be displayed on the front end, and mappings can't be returned in solidity.

## Front end:

The front end will be pretty basic. I will have a button to allow users to connect to metamask, and once connected, display their current address.
I will also use a dropdown to display the current items for sale. Dropdowns are simple structures, and takes care of the basic need of displaying the items.
Additionally, I will have 2 input boxes, one for item name, and one for item price, and then 2 buttons ("Sell", "Buy").



### Tests:

I will also take advantage of creating tests, to test the behaviour of each function, and make sure functionality works properly. Test functionality like: can user add a new and unique item for sale, can user buy an existing item, etc.

### Future improvements:

Add balances for users, so if users run out of balance, they can't buy items.


### Additional:

Used truffle suite (ganache (as a local blockchain), truffle for unit testing and deploying smart contract)

## Available Scripts

Make sure to install any dependencies.

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

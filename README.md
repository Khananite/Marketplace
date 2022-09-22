# Marketplace

## Problem solving thought process:

I typically solve problems using the divide and conquer approach. So I have a basic front-end and smart contract side.

I start off with the smart contract first.

### Smart contract:

**Language used: Solidity.**

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

Looking at the problem to solve, it requires a buy function and a sell function. Since only one item of the same name can exist, I need to check in the "sell" function whether the item the user wants to sell already exists. This will be a require check, to ensure we have valid inputs and valid conditions in our contract. I'm also going to be storing the data in a mapping, where item name points to an item struct (which will contain price, index, and a boolean of whether the item exists). A mapping is a good choice because it will allow me to quickly find the item's price, etc, based on the item's name, so a Key value pair.

I also will have an array, which will simply store the item struct, and this will be used on the front end to display the current items for sale, as solidity doesn't allow for a mapping to be returned in a method, and solidity doesn't allow mappings to be looped over.

However, removing elements/items (when an item is bought) from the array will be tricky. Because I can remove the item from the mapping based on the "key", however it will be difficult to remove it from the array, as it's based on an index. So within the item struct I will also store the index. This index will be retrieved from the mapping based on the item name key, and will be used on the array to set the item struct's boolean (boolean itemExists) to false. I won't remove the item from the array as this will ruin the ordering of the array and the index solution.

It will ruin it because if I remove index 4 from the array, all the items will shift to the left, so next time if I remove index 5, it will be removing the incorrect element/item from the array.

**So the 2 data structures that will be used:**

1. Mapping: item name => item struct (price, index, boolean itemExists)
2. Array of item struct

I will also have 2 events, one for when an item is added to the "sell" method, and one for when an item is "bought".

**Below is the outline of my 2 methods (one for selling items, and one for buying items):**

### itemsForSale function:

1. Check if sell item's name already exists.
2. Add item name, user name, item price to "items to sell" mapping and array.
3. Emit "ItemToSell" event.

### buyItem function:

1. Check if item name exists.
2. Check if price entered matches or is greater than the asking price of the item for sale.
3. Remove the bought item (user's name, item name, item price) from the "items to sell" mapping.
4. Set the exists bool for the item to false (within the "items to sell" array), this way we don't display the item on the front end.
5. Emit "ItemBought" event.

### Additional methods:

I will also have additional methods, like a method for returning the "items for sale" array, which will be displayed on the front end, since mappings can't be returned in solidity, and can't be looped over.

## Front-end:

**Languages and tech used: React, web3.**

I will use web3 to connect with metamask, initialise my smart contract, and interact with it.

The front-end will be pretty basic. I will have a button to allow users to connect to metamask, and once connected, display their current address. I will use metamask for dealing with gas and transaction fees and it will be connected to the local blockchain, ganache.

I will also use a dropdown to display the current items for sale. Dropdowns are simple structures, and takes care of the basic need of displaying the items for sale.

Additionally, I will have 2 input boxes, one for item name, and one for item price, and then 2 buttons ("Sell", "Buy"). The buttons will contain onclick methods to direct the data entered to specific methods that deal with "Selling" items, and "Buying" items. So, if the user clicks the "Sell" button, then the entered data will be directed to a method, which will call the smart contract method that deals with selling items (i.e. itemsForSale).

If user clicks the "Buy" button, the smart contract method named "buyItem" will be called, and the item will be removed (as long as the item exists) and it will be removed from the dropdown list. If the user clicks "Sell" button, then the item will be added to the dropdown menu (as long as the item doesn't exist).

Howeever, I will also do valid input checks. Make sure the user enters valid inputs like a non-negative and non-empty number, and a non-empty value for the item name.

### Tests:

I will also take advantage of creating tests, to test the behaviour of each function, and make sure functionality works correctly. Test functionality like: can user add a new and unique item for sale, can user buy an existing item, etc.

### Future improvements:

Add balances for users, so if users run out of balance, they can't buy items.

### Additional:

I will use the Truffle Suite (Ganache (as a local Blockchain), Truffle for unit testing and deploying the smart contract locally)

## Available Scripts

Make sure to install any dependencies.

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

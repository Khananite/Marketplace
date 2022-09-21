# Marketplace



Only contain basic functionality - only allow the basic code I want on the blockchain - private and local variables are visible on the blockchain - keep contracts small, modular and easily understandable.
2. Limit gas use (use local variables to store storage variables for looping) - keeping contract small and simple helps with gas reduction.
3. If external contracts/libraries are needed, use well tested ones i.e. open zeppelin.
4. Test code.
5. Checks-effects-interactions pattern (help reentrancy attack).
6. Pull-over-push pattern.
7. Include a pause in the contract.



----Problem solving thought process:

I typically solve problems using the divide and conquer approach. So I have a basic front-end and smart contract side.

I start off with the smart contract first.

Looking at the problem to solve, it requires a buy function and sell function. Since only one item of the same name can exist, I need to check in the "sell" function whether the item the user wants to sell already exists. This will be a require check, to ensure we have valid inputs and valid conditions in our contract. I'm also going to be storing the data will be stored in a mapping, where item name ponits to item price.

And there will be one mapping storing the items to sell (item name, and price), and an array of items to sell (which is used on the front end to display the items to sell).


Mappings:

1. "Items to sell": mapping (string (item name) => uint (price)))


I always consider the reentrancy attack when constructing methods/smart contracts. I typically use checks-effects-interactions pattern.

-----itemsForSale function:

Check if sell item's name already exists.
Add item name, user name, item price to "items to sell" mapping and array.
Emit "ItemToSell" event.


-----Buy function:


-Check if item name exists
-Check if price matches (user's price they've entered and actual price of item)
-Remove the bought item (user's name, item name, item price) from the "items to sell" mapping.
-Set the exists bool for the item to false (within the "items to sell" array), this way we don't display the item on the front end.
-Emit "ItemBought" event.


Return the items list: https://stackoverflow.com/questions/37606839/how-to-return-mapping-list-in-solidity-ethereum-contract

Find whether bulk access array in solidity is better and faster for gas/performance (i.e. return the whole array) or if it's better to return one item at a time - I can test this on remix.


----Front end:

The user will be presented with 2 boxes. One for buy and one for sell. But outside the boxes will be a dropdown menu to display the current items for sale.

Since this is a basic implementation, on the front end, whether it's the buy or sell box, I'll have the user enter their name, item name, and the price and a button ("Buy", "Sell")


-----Tests:

I also took advantage of creating tests, to test the behaviour of each function.



----Future improvements:

Add balance for users.


########Additional:

Used truffle suite (ganache (as a local blockchain), truffle for unit testing and deploying smart contract)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

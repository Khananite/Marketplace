const Marketplace = artifacts.require("Marketplace");
const truffleAssert = require('truffle-assertions');

contract("Marketplace", accounts =>
{
    let marketplace;

    //beforeEach function which will run before each test creating a new instance of Marketplace each time.
    beforeEach('setup contract for each test', async function () {
        marketplace = await Marketplace.new()
    })

    it("should be able to add new item to sell", async () => {
        let marketplace = await Dex.deployed();
        let itemName = "Orange";
        let itemPrice = 5;
        
        marketplace.itemsForSale(itemName, itemPrice);
        //Should not be possible to add existing item to sell.
        await truffleAssert.reverts(
            marketplace.itemsForSale(itemName, itemPrice)
        )

        await truffleAssert.passes(
            marketplace.itemsForSale("Banana", 20)
        )
    })

    it("should be able to buy existing item", async () => {
        let itemName = "Pear";
        let itemPrice = 5;

        //Should not be possible to buy non-existent item.
        await truffleAssert.reverts(
            marketplace.buyItem(itemName, itemPrice)
        )

        marketplace.itemsForSale(itemName, itemPrice)

        await truffleAssert.passes(
            marketplace.buyItem(itemName, itemPrice)
        )
    })
})
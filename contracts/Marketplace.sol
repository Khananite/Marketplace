// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Marketplace
{

    event ItemToSell(string _itemName, uint256 _itemPrice);
    event Bought(string _itemName, uint256 _itemPrice);

    uint256 itemIndex;

    //Mapping, where item name points to item price.
    mapping (string => _item) private _itemsToSell;

    struct _item
    {
        string name;
        uint256 price;
        uint256 index;
        bool exists;
    }

    _item[] private _itemsList;

    constructor()
    {
        itemIndex = 0;
    }

    function itemsForSale(string memory _itemName, uint256 _itemPrice) public returns(bool)
    {
        require(_itemsToSell[_itemName].exists == false, "Item already exists");

         _item memory item = _item (
            _itemName,
            _itemPrice,
            itemIndex,
            true
        );
        _itemsToSell[_itemName] = item;
        _itemsList.push(item);

        itemIndex++;

        emit ItemToSell(_itemName, _itemPrice);

        return true;
    }

    function buyItem(string memory _itemName, uint256 _itemPrice) public returns(bool)
    {
        require(_itemsToSell[_itemName].exists == true, "Item doesn't exist");
        require(_itemPrice >= _itemsToSell[_itemName].price, "Your entered amount is less than the asking price");

        uint index = _itemsToSell[_itemName].index;
        _itemsList[index].exists = false;
        delete _itemsToSell[_itemName];

        emit Bought(_itemName, _itemPrice);

        return true;
    }

    function itemExists(string memory _itemName) view public returns(bool)
    {
        if(_itemsToSell[_itemName].exists == true)
            return true;
        else
            return false;
    }

     function priceMatch(string memory _itemName, uint256 _itemPrice) view public returns(bool)
    {
        if(_itemsToSell[_itemName].exists == true && _itemPrice >= _itemsToSell[_itemName].price)
            return true;
        else
            return false;
    }

    function getItemListCount() public view returns(uint)
    {
        return _itemsList.length;
    }

    function getItemsForSaleByIndex() view public returns(_item[] memory)
    {
        _item[] memory itemsList = _itemsList;

        return itemsList;
    }
}
pragma solidity ^0.4.17;

contract Credits {
    uint256 public CURRENT_CREDIT_PRICE;

    mapping(address => uint256) customerList;
    address[] public customerAccounts;

    function setCreditPrice(uint256 newPrice) public {
        CURRENT_CREDIT_PRICE = newPrice;
    }

    function Credits(uint256 initPrice) public {
        CURRENT_CREDIT_PRICE = initPrice;
    }

    function getBalance() public view returns(uint256) {
        return customerList[msg.sender];
    }

    function purchaseCredits(uint256 _creditsAmount) public payable {
        require(msg.value >= _creditsAmount*CURRENT_CREDIT_PRICE);
        customerList[msg.sender] = _creditsAmount;
    }
}
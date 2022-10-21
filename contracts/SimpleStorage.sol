// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";

contract SimpleStorage is Ownable{
    // State variable to store a number
    uint public num;

    uint fee = 0.001 ether;

    event OwnerUpdated(address oldOwner, address newOwner);
    event NumberUpdated(uint newNumber, address indexed user);
    event ReceivedEthereum(address sender, uint amount);

    // You need to send a transaction to write to a state variable.
    function set(uint _num) public payable higherThanTen(_num) onlyOwner{
        require(msg.value >= fee, "Error: not enough money"); //TODO: make fee dynamic
        num = _num;
        emit NumberUpdated(num, msg.sender);
    }

    function setLevelUpFee(uint _fee) external onlyOwner {
        fee = _fee;
    }

    // You can read from a state variable without sending a transaction.
    function get() public view returns (uint) {
        return num;
    }

    modifier higherThanTen(uint _num) {
        require(_num > 10, "Error: number must be greater than 10");
        _;
    }

    //TODO: add withdraw only by owner
    //https://solidity-by-example.org/sending-ether/
    function withdraw() external onlyOwner {
        address _owner = owner();
        payable(_owner).transfer(address(this).balance);
    }

    // Fallback function must be declared as external.
    fallback() external payable {
    }

    receive() external payable {
        emit ReceivedEthereum(msg.sender, msg.value);
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

contract PiggyWalletManager is Ownable{
    
    mapping(address => PiggyWallet[]) public wallets;
    mapping(address => uint256) public numAddressInWallet;
    
    event WalletCreated(address _address);
    event EthersMoved(address _address, uint value)
    
    function createPiggyWallet() external {        
        
        PiggyWallet walletAddress = new PiggyWallet();
        wallets[msg.sender].push(walletAddress);
        
        // Move the ownership to the msg.sender || Also could be done with msg.owner
        wallets[msg.sender][numAddressInWallet[msg.sender]].transferOwnership(msg.sender);
        
        numAddressInWallet[msg.sender]++;
        
        emit WalletCreated(address(walletAddress));
    }
    
    function balanceWallet(uint _walletId) external view returns (uint) {
        return wallets[msg.sender][_walletId].balanceOf();
    }

    function getNumberWallets() external view returns (uint) {
        return wallets[msg.sender].length;
    }
    
    function moveEthers(uint _walletId, address payable _address, uint _value) external {
        wallets[msg.sender][_walletId].sendEther(_address, _value);
    }
}

contract PiggyWallet is Ownable {
    
    event DepositReceived(indexed _address, indexed _value);

    function deposit() external payable {
        emit(msg.sender, msg.value);
    }

    function balanceOf() external view returns (uint) {
        return address(this).balance;
    }
    
    function sendEther(address payable recipient, uint value) onlyOwner external {
        require(value < address(this).balance && value > 0, "Not enough funds");
        recipient.transfer(value);
    }
}
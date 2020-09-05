// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

contract PiggyWalletManager is Ownable{
    
    struct PiggyWalletInfo {
        uint id;
        address contractAddress;
    }

    mapping(address => PiggyWalletInfo[]) public wallets;
    mapping(address => uint256) public numAddressInWallet;
    
    event WalletCreated(address _address);
    event EthersMoved(address _address, uint value);
    
    function createPiggyWallet() external {
        PiggyWallet walletAddress = new PiggyWallet();
        
        numAddressInWallet[msg.sender]++;
        PiggyWalletInfo memory walletInfo;
        walletInfo.id = numAddressInWallet[msg.sender];
        walletInfo.contractAddress = address(walletAddress);
        
        wallets[msg.sender].push(walletInfo);
        
        // Move the ownership to the msg.sender || Also could be done with msg.owner
        walletAddress.transferOwnership(msg.sender);
        
        emit WalletCreated(address(walletAddress));
    }
    
    function balanceWallet(address _walletAddress) external view returns (uint) {
        PiggyWallet wallet = PiggyWallet(_walletAddress);
        return wallet.balanceOf();
    }

    function getNumberWallets() external view returns (uint) {
        return wallets[msg.sender].length;
    }
    
    function moveEthers(address _walletAddress, address payable _address, uint _value) external {
        PiggyWallet wallet = PiggyWallet(_walletAddress);
        wallet.sendEther(_address, _value);
        
        emit EthersMoved(_address, _value);
    }
}

contract PiggyWallet is Ownable {
    
    event DepositReceived(address indexed _address, uint indexed _value);
    event EthersMoved(address _address, uint _value);
    
    function deposit() external payable {
        emit DepositReceived(msg.sender, msg.value);
    }

    function balanceOf() external view returns (uint) {
        return address(this).balance;
    }
    
    function sendEther(address payable _recipient, uint _value) onlyOwner external {
        require(_value < address(this).balance && _value > 0, "Not enough funds");
        _recipient.transfer(_value);
        
        emit EthersMoved(_recipient,_value);
    }
}
pragma solidity ^0.6.0;
contract LokBazaar
{
    struct Seller
    {
        bytes qid;
        bool registered;
    }
    mapping(address=>Seller) seller;
    
    struct User
    {
        bytes qid;
        bool registered;
    }
    mapping(address=>User) customer;
    
    function sellerSignup(bytes memory _qid) public
    {
        seller[msg.sender].qid=_qid;
        seller[msg.sender].registered=true;
    }
    
    function sellerRegistrationCheck() public view returns(bool)
    {
        if(seller[msg.sender].registered)
            return true;
        return false;
    }
    
    function customerSignup(bytes memory _qid) public
    {
        customer[msg.sender].qid=_qid;
        customer[msg.sender].registered=true;
    }
    
    function customerRegistrationCheck() public view returns(bool)
    {
        if(customer[msg.sender].registered)
            return true;
        return false;
    }
    
    function getBalance() public view returns(uint256)
    {
        return msg.sender.balance;
    }
    
    function transfer(address payable _receiver) public payable
    {
        require(msg.value<=msg.sender.balance);
        _receiver.transfer(msg.value);
    }
}
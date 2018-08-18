pragma solidity ^0.4.22;

contract PaymentContract {
    address private operator;
    
    // Ensure that `msg.value` is an even number.
    // Division will truncate if it is an odd number.
    // Check via multiplication that it wasn't an odd number.
    constructor() public payable {
        operator = msg.sender;
    }

    modifier onlyOperator() {
        require(msg.sender == operator,"Only operator can call this.");
        _;
    }
    
    event Paid();
    event Aborted();

    /// Confirm that you (the buyer) received the item.
    /// This will release the locked ether.
    function pay()
        public
        payable
        returns (bool)
    {
        if(msg.value != 0) {
            operator.transfer(msg.value);
            emit Paid();
            return true;
        }
        else {
            return false;
        }
    }
    
    function checkContractBalance()
        public 
        view 
        returns(uint) 
    {
        return address(this).balance;
    }
    
    function kill() private
        onlyOperator
    {
        emit Aborted();
        selfdestruct(operator);
    }
    
}

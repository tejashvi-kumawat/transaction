pragma solidity ^0.8.0;

contract TransactionStorage {
    struct Transaction {
        address from;
        address to;
        uint256 amount;
        string data;
    }

    Transaction[] public transactions;

    function storeTransaction(address to, uint256 amount, string memory data) public {
        transactions.push(Transaction(msg.sender, to, amount, data));
    }

    function getTransactions() public view returns (Transaction[] memory) {
        return transactions;
    }
}

let web3;
let userAddress;

// Connect to MetaMask wallet
const connectWallet = async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" });
            const accounts = await web3.eth.getAccounts();
            userAddress = accounts[0];
            document.getElementById("userAddress").innerText = userAddress;
            loadBalance();
        } catch (err) {
            console.log("Error connecting to wallet", err);
        }
    } else {
        alert("Please install MetaMask!");
    }
};

// Load wallet balance
const loadBalance = async () => {
    if (web3) {
        const balanceWei = await web3.eth.getBalance(userAddress);
        const balance = web3.utils.fromWei(balanceWei, 'ether');
        document.getElementById("userBalance").innerText = balance;
    }
};

// Send ETH to another address
const sendEth = async () => {
    const toAddress = document.getElementById("toAddress").value;
    const amount = document.getElementById("amount").value;

    if (web3 && toAddress && amount) {
        const amountWei = web3.utils.toWei(amount, 'ether');
        try {
            await web3.eth.sendTransaction({
                from: userAddress,
                to: toAddress,
                value: amountWei
            });
            alert("Transaction Sent!");
            loadBalance(); // Reload balance after sending funds
        } catch (err) {
            console.log("Transaction failed", err);
        }
    } else {
        alert("Please fill all fields!");
    }
};

// Store Transaction Data (Fake Smart Contract interaction)
const storeTransaction = async () => {
    const transactionData = document.getElementById("transactionData").value;
    if (transactionData) {
        // Store transaction data in the front end (simulate storing on-chain)
        const transactionItem = document.createElement('li');
        transactionItem.innerText = `Transaction: ${transactionData}`;
        document.getElementById("transactionList").appendChild(transactionItem);
        alert("Transaction Data Stored!");
    } else {
        alert("Please enter transaction data!");
    }
};

// Event Listeners
document.getElementById("connectButton").addEventListener("click", connectWallet);
document.getElementById("sendButton").addEventListener("click", sendEth);
document.getElementById("storeTransactionButton").addEventListener("click", storeTransaction);

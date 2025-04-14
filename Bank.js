// 🏦 Bank and Account System 
// Bank Class: Manages multiple accounts
class Bank {
    constructor() {
        this.accounts = []; // Stores all accounts in the bank
    }

    // Add methods here:
    createAccount(name, initialDeposit) {
        const newAccount = new Account(name, initialDeposit); // Create a new Account with the given name and balance
        this.accounts.push(newAccount); // Add this new account to the bank's accounts
        return newAccount; // Return the new account to use it later
    }

}

// Account Class: Represents a single user's account
class Account {
    constructor(name, balance = 0) {
        this.name = name; //Account holder's name
        this.balance = balance; // Account Balance
        this.transactionHistory = []; // Records all transactions
       
    }

    // Method to deposit money into the account
    deposit(amount) {
        this.balance += amount;
        this.transactionHistory.push({transactionType: 'Deposit', amount}); //Record the deposit transaction
    }

    //Method to withdraw money from the account
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount //Decrease the balance
            this.transactionHistory.push({transactionType: 'Withdrawal', amount}); //Record the withdrawal
        } else {
            console.log('Insufficient funds!') //If the balance is less than the withdrawal amount
        }
    }


    // Method to transfer money from another acount
    transfer(amount, recipentAccount) {
        if(this.balance >= amount) {
            this.balance -= amount; //Deduct from sender's balance
            recipentAccount.balance += amount;
            this.transactionHistory.push({transactionType: 'Transfer', amount, to:recipentAccount.name});//Record the transfer
            recipentAccount.transactionHistory.push({transactionType: 'Received', amount, from:this.name});//Record the received transaction
        } else {
            console.log('Insufficient funds for transfer!');
        }
    }


    // Method to Chck the balance of the account
    checkBalance() {
        return this.balance; //Return the current balances
    }

}

//<-------------------------------DO NOT WRITE BELOW THIS LINE------------------------------>

// Function to test bank operations
function testBankOperations() {
    const bank = new Bank();

    // Create new accounts
    const johnAccount = bank.createAccount('John Doe', 1000);
    const janeAccount = bank.createAccount('Jane Doe', 500);
    console.log('Accounts created:', johnAccount, janeAccount);

    // Perform some operations on John's account
    johnAccount.deposit(500);
    johnAccount.withdraw(200);

    // Perform a transfer from John to Jane
    johnAccount.transfer(300, janeAccount);

    // Check balances
    const johnFinalBalance = johnAccount.checkBalance();
    const janeFinalBalance = janeAccount.checkBalance();
    console.log('John\'s balance:', johnFinalBalance);
    console.log('Jane\'s balance:', janeFinalBalance);

    // Return balances for testing
    return { 
        johnFinalBalance, 
        janeFinalBalance, 
        johnTransactionHistory: johnAccount.transactionHistory, 
        janeTransactionHistory: janeAccount.transactionHistory 
    };
}

module.exports = testBankOperations;

//<-------------------------------DO NOT WRITE ABOVE THIS LINE------------------------------>


console.log(testBankOperations());

// EmployeePage.js
// import React from 'react';

// function EmployeePage() {
//     return (
//         <div>
//             <h2>Welcome, Employee!</h2>
//             {/* Employee-specific content goes here */}
//         </div>
//     );
// }

// export default EmployeePage;

import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import Web3 from 'web3';

import ContinuousPayrollSystem, { abi, address } from './ContinuousPayrollSystem';

function EmployeePage({onLogout}) {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [salary, setSalary] = useState(0);
  const [clockInTime, setClockInTime] = useState(new Date().toLocaleTimeString());
  const [loggedInTime, setLoggedInTime] = useState(null);

  useEffect(() => {
    async function initWeb3() {


      updateClockInTime();

      const salaryInterval = setInterval(() => {
        setSalary((prevSalary) => prevSalary + 0.02);
      }, 1000);

      const clockInterval = setInterval(() => {
        updateClockInTime();
      }, 1000);

      

      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          const contractInstance = new web3Instance.eth.Contract(
            abi,
            address
          );
          setContract(contractInstance);

          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);


          setLoggedInTime(new Date().toLocaleTimeString());
        } catch (error) {
          console.error('Error connecting to Ethereum provider', error);
        }
      } else {
        console.error('Please install MetaMask or another Ethereum provider');
      }

      return () => {
        clearInterval(salaryInterval);
        clearInterval(clockInterval);
      };
    }

    initWeb3();
  }, []);

  const updateClockInTime = () => {
    setClockInTime(new Date().toLocaleTimeString());
  };

  const addExpense = async () => {
    const expenseAmount = document.getElementById('expenseAmount').value;
    const expenseCategory = document.getElementById('expenseCategory').value;

    // Calling the smart contract function to add an expense
    await contract.methods.addExpense(expenseAmount, expenseCategory).send({ from: account });

    // You may want to update the UI or perform other actions after the transaction is successful
  };

  const sendPayment = async () => {
    const paymentRecipient = document.getElementById('paymentRecipient').value;
    const paymentAmount = document.getElementById('paymentAmount').value;
    const paymentDescription = document.getElementById('paymentDescription').value;

    // Calling the smart contract function to send a payment
    await contract.methods.sendPayment(paymentRecipient, paymentAmount, paymentDescription).send({ from: account });

    // You may want to update the UI or perform other actions after the transaction is successful
  };



  if (!web3) {
    return <div>Loading...</div>;
  }

   const handleLogout = () => {
       onLogout(); 
    };
  return (
    <div className="App">
      <header className="App-header" id="title">
        <h1>Welcome, Name</h1>
        
              <button onClick={handleLogout}>Logout</button>
      </header>

      <body>
        <div>
          <h2>Real-time payment:</h2>
          <div>
            <h3>Salary earned so far:</h3>
            <h2 id="money">${salary.toFixed(2)}</h2>
            <p>Clock in time: {loggedInTime}</p>
            <p id="time">Clock out time: ...</p>
          </div>

          <div>
            <h4>Add Expense</h4>

            <label htmlFor="expenseAmount">Amount:</label>
            <input type="number" id="expenseAmount" /><br />

            <label htmlFor="expenseCategory">Category:</label>
            <select id="expenseCategory">
              <option value="0">General</option>
              <option value="1">Supplies</option>
              <option value="2">Services</option>
              <option value="3">Equipment</option>
            </select><br />

            <button onClick={addExpense}>Add</button>
            <p><i>Automatically deducted from salary</i></p>
          </div>
        </div>

        <hr />
        <div>
          <h2>Send Payment</h2>

          <label htmlFor="paymentRecipient">Recipient Address:</label>
          <input type="text" id="paymentRecipient" /><br />

          <label htmlFor="paymentAmount">Amount:</label>
          <input type="number" id="paymentAmount" /><br />

          <label htmlFor="paymentDescription">Description:</label>
          <input type="text" id="paymentDescription" /><br />

          <button onClick={sendPayment}>Send</button>
        </div>

        <hr />
        <div>
          <h2>Deposits/Withdrawals:</h2>

          <div>
            <h3>Deposits:</h3>

            <label htmlFor="accountType">Select account</label>
            <select id="accountType">
              <option value="0">Checking</option>
              <option value="1">Savings</option>
            </select><br />

            <label htmlFor="depositAmount">Amount: </label>
            <input id="depositAmount" /><br />

            <button>Complete deposit</button>
          </div>

          <div>
            <h3>Withdrawals:</h3>

            <label htmlFor="accountType">Select account</label>
            <select id="accountType">
              <option value="0">Checking</option>
              <option value="1">Savings</option>
            </select><br />

            <label htmlFor="depositAmount">Amount: </label>
            <input id="depositAmount" /><br />

            <button>Complete withdrawal</button>
          </div>
        </div>
      </body>
    </div>
  );
}

export default EmployeePage;


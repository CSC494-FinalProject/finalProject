// App.js
import React, { useState } from 'react';
import AdminPage from './AdminPage';
import EmployeePage from './EmployeePage';


function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      // Redirect to AdminPage
      setRole('admin');
      setLoggedIn(true);
    } else if (username === 'employee' && password === 'password') {
      // Redirect to EmployeePage
      setRole('employee');
      setLoggedIn(true);
    } else {
      // Handle incorrect login
      console.log('Incorrect username or password');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setRole('');
  };

  const renderContent = () => {
    if (loggedIn) {
      if (role === 'admin') {
        return <AdminPage onLogout={handleLogout} />;
      } else if (role === 'employee') {
        return <EmployeePage onLogout={handleLogout}/>;
      }
    } else {
      return (
        <div id="login">
          <h4 id="login-title">Log in to the employee account</h4>
          <p>Username:</p>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <p>Password:</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      );
    }
  };

  return (
    <div className="App">
      <header className="App-header" id="title">
        <h1>$ PAYR0LL</h1>
      </header>

      <body>{renderContent()}</body>
    </div>
  );
}

export default App;



// import logo from './logo.svg';
// import React, { useState, useEffect } from 'react';
// import './App.css';
// import Web3 from 'web3';
// import ContinuousPayrollSystem, { abi, address } from './ContinuousPayrollSystem';

// function App() {
//   const [web3, setWeb3] = useState(null);
//   const [contract, setContract] = useState(null);
//   const [account, setAccount] = useState(null);

//   useEffect(() => {
//     async function initWeb3() {
//       if (window.ethereum) {
//         try {
//           await window.ethereum.request({ method: 'eth_requestAccounts' });
//           const web3Instance = new Web3(window.ethereum);
//           setWeb3(web3Instance);

//           const contractInstance = new web3Instance.eth.Contract(
//             abi,
//             address
//           );
//           setContract(contractInstance);

//           const accounts = await web3Instance.eth.getAccounts();
//           setAccount(accounts[0]);
//         } catch (error) {
//           console.error('Error connecting to Ethereum provider', error);
//         }
//       } else {
//         console.error('Please install MetaMask or another Ethereum provider');
//       }
//     }

//     initWeb3();
//   }, []);

//   const addExpense = async () => {
//     const expenseAmount = document.getElementById('expenseAmount').value;
//     const expenseCategory = document.getElementById('expenseCategory').value;

//     // Calling the smart contract function to add an expense
//     await contract.methods.addExpense(expenseAmount, expenseCategory).send({ from: account });

//     // You may want to update the UI or perform other actions after the transaction is successful
//   };

//   const sendPayment = async () => {
//     const paymentRecipient = document.getElementById('paymentRecipient').value;
//     const paymentAmount = document.getElementById('paymentAmount').value;
//     const paymentDescription = document.getElementById('paymentDescription').value;

//     // Calling the smart contract function to send a payment
//     await contract.methods.sendPayment(paymentRecipient, paymentAmount, paymentDescription).send({ from: account });

//     // You may want to update the UI or perform other actions after the transaction is successful
//   };

//   if (!web3) {
//     return <div>Loading...</div>;
//   }
//   return (
//     <div className="App">
//       <header className="App-header" id="title">
//         <h1>$ PAYR0LL</h1>
//       </header>

//       <body>
//         <div>
//           <h2>Real-time payment:</h2>
//           <div id="login">
//             <h4 id="login-title">Log in to the employee account</h4>
//             <p>Username:</p>
//             <input />
//             <p>Password:</p>
//             <input type="password" />
//           </div>

//           <div>
//             <h3>Salary earned so far:</h3>
//             <h2 id="money">$65.4321</h2>
//             <p>Clock in time: 07:28</p>
//             <p id="time">Clock out time: ...</p>
//           </div>

//           <div>
//             <h4>Add Expense</h4>

//             <label htmlFor="expenseAmount">Amount:</label>
//             <input type="number" id="expenseAmount" /><br />

//             <label htmlFor="expenseCategory">Category:</label>
//             <select id="expenseCategory">
//               <option value="0">General</option>
//               <option value="1">Supplies</option>
//               <option value="2">Services</option>
//               <option value="3">Equipment</option>
//             </select><br />

//             <button onClick={addExpense}>Add</button>
//             <p><i>Automatically deducted from salary</i></p>
//           </div>
//         </div>

//         <hr />
//         <div>
//           <h2>Send Payment</h2>

//           <label htmlFor="paymentRecipient">Recipient Address:</label>
//           <input type="text" id="paymentRecipient" /><br />

//           <label htmlFor="paymentAmount">Amount:</label>
//           <input type="number" id="paymentAmount" /><br />

//           <label htmlFor="paymentDescription">Description:</label>
//           <input type="text" id="paymentDescription" /><br />

//           <button onClick={sendPayment}>Send</button>
//         </div>

//         <hr />
//         <div>
//           <h2>Deposits/Withdrawals:</h2>

//           <div>
//             <h3>Deposits:</h3>

//             <label htmlFor="accountType">Select account</label>
//             <select id="accountType">
//               <option value="0">Checking</option>
//               <option value="1">Savings</option>
//             </select><br />

//             <label htmlFor="depositAmount">Amount: </label>
//             <input id="depositAmount" /><br />

//             <button>Complete deposit</button>
//           </div>

//           <div>
//             <h3>Withdrawals:</h3>

//             <label htmlFor="accountType">Select account</label>
//             <select id="accountType">
//               <option value="0">Checking</option>
//               <option value="1">Savings</option>
//             </select><br />

//             <label htmlFor="depositAmount">Amount: </label>
//             <input id="depositAmount" /><br />

//             <button>Complete withdrawal</button>
//           </div>
//         </div>
//       </body>
//     </div>
//   );
// }

// export default App;

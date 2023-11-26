import {useEffect, useState} from 'react'
import Expenses from "../Components/Expenses"
import Sidebar from '../Components/Sidebar'
import { useCookies } from "react-cookie";
import axios from 'axios';

function UserExpenses() {

  const [newExpense,setNewExpense] = useState(
    {
      type: String,
      price: Number,
      quantity:Number,
    }
  );
  const [deleted, setDeleted] = useState(false)
  const [newType,setNewType] = useState();
  const [newPrice,setNewPrice] = useState();
  const [newquantity,setNewQuantity] = useState();
  const [popupActive,setPopupActive] = useState(false);
  var [expenseTotal,setExpenseTotal] = useState(0);
  const [monthlyBudget,setMonthlyBudget] = useState({});
  const [displayBudget, setDisplayBudget] = useState({});
  const [cookies, setCookies,removeCookies] = useCookies(["userID"]);
  const [validBudget, setValidBudget] = useState(false);
  
  const [userExpenses,setUserExpenses] = useState([]);
  const [value,setValue] = useState(false)

  var newExp = [
    {
      type: String,
      price: Number,
      quantity: Number,
    }
  ] ;
  let eArr = [150,500,50];

  // function to calculate expense total
  function calcExpenseTotal(userExpenses){
    let sum = 0
    for(let i = 0; i < eArr.length;i++ )
      sum += eArr[i];
    return sum;
  }
  var sum = 0;
  
  var expensTotal= 0;
  expensTotal = userExpenses.map(expense =>(
    sum += expense.price
  ))
  console.log(expensTotal)
  let lastElement = expensTotal[expensTotal.length - 1];

 
 // refreshed the expense total everytime the screen refreshes or expenses change
 useEffect(() =>{
  const fetchExpenses = async() => {
    try{
     const response =  await axios.get('http://localhost:5000/user_expenses', {
        params:{ 
        _id: cookies.userID
      }
    });
   
    if(response.statusText === 'OK'){
      setUserExpenses(response.data);
      setValue(!value)
      return
    }
    else{
      console.log("error when fetching expenses")
    }
  }
  catch(error){
    console.error("Error fetching expenses:", error);
  }};

  fetchExpenses()
  
},[])

useEffect(()=>{

},[userExpenses])

//function to fetch api and add expense
const addExpense = async() => {
  
  let bodyjs = JSON.stringify({
    type: newType,
    quantity: newquantity,
    price: newPrice,
    user_id:cookies.userID
  })

  console.log(bodyjs);
  try{
    const data = await fetch("http://localhost:5000/expenses",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: bodyjs
    })
    if(data.statusText === 'OK')
    {
      setUserExpenses([...userExpenses,newExpense]);
      setPopupActive(false);
      setNewExpense("");
      window.location.reload()
      return
    }
    else{
      console.log('Issue when adding expense')
    }
 
  }catch(error){
    console.error(error)
  }
}

const deleteExpense = (expense) =>{
  setUserExpenses(userExpenses.filter(e => e !== expense)
  )
  window.location.reload()
  return
}
console.log(userExpenses)

// function for green or red budget
const ExpensePosNeg = ({ number }) => {
  let color = 'black';
  let message = '';

  if (number > 0) {
    color = 'green';
    message = 'Great Job! You are on track with your budget!';
  } else if (number < 0) {
    color = 'red';
    message = 'You are not on budget, lets look at your expenses and reduce them.';
  }

  const numberStyle = {
    color: color,
  };

  return (
    <div>
      <div style={numberStyle}>{number}</div>
      <div>{message}</div>
    </div>
  );
}


// // function to fetch user expenses
// const fetchExpenses = async() => {
//   try{
//    const response =  await axios.get('http://localhost:5000/user_expenses', {
//       params:{ 
//       _id: cookies.userID
//     }
//   });
 
//   if(response.statusText === 'OK'){
//     console.log(typeof([response.data]))
//     setUserExpenses(response.data);
//     setValue(!value)
//     return
//   }
//   else{
//     console.log("error when fetching expenses")
//   }
// }
// catch(error){
//   console.error("Error fetching expenses:", error);
// }

// }

// component to properly display monthly budget entered by user
const expenseHandler= (e) =>{
  localStorage.setItem(1,monthlyBudget);
  setDisplayBudget(localStorage.getItem(1));
// after setting budget use api call to store in budget db
  setValidBudget(true);
}

const handleLogout=()=>{
  removeCookies("userID");
}

const fallback = ("");

  return (
    <div className="expense-layout">
      <button onClick={handleLogout}>Logout</button>
      <h1>Welcome, User Email Here</h1>{/*Pulling name from database once connected*/}
      <h4>Your Expenses</h4>
      
      {/*maps expenses from  database once fetched */}
      <div className='expenses'>
          {userExpenses&&<Expenses expenses = {userExpenses} onDelete={deleteExpense} />}
      </div> 
    
      
      {/*
      <div className="sidebar">
        <button className='sideOption'>Dashboard</button>
        <button className='sideOption'>Expenses</button>
        <button className='sideOption'>Trends</button>
        <button className='sideOption'>Budget</button>
        
        <button className = "logout" onClick={handleLogout}>Logout</button>
      </div>
      */}

      <div className='mainContent'>
        
        
        
        

        {/* sum of all expense.prices */}
        <div className='expense-total'>Expense Total: ${lastElement}</div>

        {/* If user had entered a valid budget display budget if not prompt them to enter one */}
        {validBudget ? 
        <div className='monthly-budget'>Monthly budget: ${displayBudget}</div> : 
        <div className='monthly-budget-input'> 
          <h3>Enter monthly budget:</h3>
          <input type={'number'} placeholder={"monthly budget..."}  value={monthlyBudget} onChange={(e)=>setMonthlyBudget(e.target.value)}></input>
          <button onClick={expenseHandler}>Add budget</button>
          </div>}
        
           
        
        <div className="addPopup" onClick={()=>setPopupActive(true) }>Add Expense</div>

        {/* sum of all expense.prices */}
        
        
        {popupActive ? ( 
            <div className='popup'>
            <div className="closePopup" onClick={()=>setPopupActive(false) }>x</div>
            <div className="content">
              <h3>Add expense</h3>
              <input 
              placeholder='Expense Name'
              type='text'
              className='add-expense-name'
              onChange={e => setNewType(e.target.value)}
              value = {newType} />

              <input 
              type='number'
              placeholder='Expense Price'
              className='add-expense-price'
              onChange={e => setNewPrice(e.target.value)}
              value = {newPrice} />

              <input 
              placeholder='Expense Quantity'
              type='number'
              className='add-expense-price'
              onChange={e => setNewQuantity(e.target.value)}
              value = {newquantity} />

              <button className='button' onClick={addExpense}>Create Expense</button> 
            </div>
          </div>
          ): fallback}
      </div>
    </div>
      
  );
}

export default UserExpenses;

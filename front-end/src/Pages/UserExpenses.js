import {useEffect, useState} from 'react'
import Expenses from "../Components/Expenses"





function UserExpenses() {

  const [newExpense,setNewExpense] = useState({});
  const [popupActive,setPopupActive] = useState(false);
  const [expenseTotal,setExpenseTotal] = useState(0);
  const [monthlyBudget,setMonthlyBudget] = useState();
  const [displayBudget,setDisplayBudget] = useState();
  
  const [expenses,setExpenses] = useState(
    [
      {
        Id:1,
        name: 'Food',
        price: 10,
        quantity: 1
      },
      {
        Id:2,
        name: 'Gas',
        price: 20,
        quantity: 1
      },
    ]);
let eArr = [150,500,50];

  // function to calculate expense total
  function calcExpenseTotal(eArr){
    let sum = 0
    for(let i = 0; i < eArr.length;i++ )
      sum += eArr[i];
    return sum;
  }
  // refreshed the expense total everytime the screen refreshes or expenses change
  useEffect(() =>{
    setExpenseTotal(calcExpenseTotal(eArr));
  },[])

//function to fetch api and add expense
const addExpense = async() => {
  const data = await fetch("https://localhost:5000/expenses",{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      text: newExpense
    })
  }).then(res =>res.json());
  setExpenses([...expenses,data]);
  setPopupActive(false);
  setNewExpense("");
}

// function to fetch user expenses
const fetchExpenses= async() =>{
  const data = await fetch("https://localhost:5000/expenses")
  .then(res=>res.json())
  .then((d)=>setExpenses(d))
}

// component to properly display monthly budget entered by user
const expenseHandler= (e) =>{
  localStorage.setItem(1,monthlyBudget);
  setDisplayBudget(localStorage.getItem(1));
}

const fallback = ("");

  return (
    <div className="expense-layout">
      <h1>Welcome, User Email Here</h1>{/*Pulling name from database once connected*/}
      <h4>Your Expenses</h4>
      {/* Can map expenses from  database once fetched */}
      
      <div className='expenses'>
          <Expenses expenses = {expenses}/>
      </div> 

{/* sum of all expense.prices */}
      <div className='expense-total'>Expense Total: ${expenseTotal}</div>

      {displayBudget ? 
      <div className='monthly-budget'>Monthly budget: ${() => displayBudget}</div> : 
      <div className='monthly-budget-input'> 
        <h3>Enter monthly budget:</h3>
        <input type={'number'} placeholder={"monthly budget..."}  value={monthlyBudget}onChange={(e)=>setMonthlyBudget(e.target.value)}></input>
        <button onClick={expenseHandler}>Add budget</button>
        </div>}
      <div className="addPopup" onClick={()=>setPopupActive(true) }>+</div>
      
      {popupActive ? (
        <div className='popup'>
          <div className="closePopup" onClick={()=>setPopupActive(false) }>x</div>
          <div className="content">
            <h3>Add expense</h3>
            <input 
            type='text'
            className='add-expense-name'
            onChange={e => setNewExpense(e.target.value)}
            value = {newExpense.name} />
             <input 
            type='number'
            className='add-expense-price'
            onChange={e => setNewExpense(e.target.value)}
            value = {newExpense.price} />
            <input 
            type='number'
            className='add-expense-price'
            onChange={e => setNewExpense(e.target.value)}
            value = {newExpense.quantity} />
             <button className='button' onClick={addExpense}>Create Expense</button> 
          </div>
        </div>
      ): fallback}
    </div>
  );
}

export default UserExpenses

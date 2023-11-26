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
  const [newType,setNewType] = useState("");
  const [newPrice,setNewPrice] = useState();
  const [newQuantity,setNewQuantity] = useState();
  const [popupActive,setPopupActive] = useState(false);
  var [expenseTotal,setExpenseTotal] = useState(0);
  const [monthlyBudget,setMonthlyBudget] = useState({});
  const [displayBudget, setDisplayBudget] = useState(null);
  const [cookies, setCookies,removeCookies] = useCookies(["userID"],["name"]);
  const [validBudget, setValidBudget] = useState(false);
  
  const [userExpenses,setUserExpenses] = useState([]);
  const [value,setValue] = useState(false)

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

useEffect(()=>{
  const checkBudget = ( ) =>{
    if(displayBudget)
    {
      setValidBudget(true);
    }
    else
    return
  }
  
checkBudget()
},[displayBudget])

//function to fetch api and add expense
const addExpense = async() => {
  
  let bodyjs = JSON.stringify({
    userID:cookies.userID,
    type: newType,
    quantity: newQuantity,
    price: newPrice
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

// component to properly display monthly budget entered by user
const expenseHandler= async() =>{
  localStorage.setItem(1,monthlyBudget);
  setDisplayBudget(localStorage.getItem(1));
  
//after setting budget use api call to store in budget db
    // try
    // {
    //   const result = await fetch("http://localhost:5000/user_budget" ,{
    //     method:'POST',
    //     body: {user_id: cookies.userID,
    //             budget: displayBudget}
    //   })
    //   if(result.status === 200)
    //     console.log(result);
    //     // if(res.status === 200)
    //     // {
    //     //   console.log("budget saved")
    //     //   return
    //     // }else{
    //     //   console.log("error saving budget")
    //     // }
    // }
    // catch(error)
    // {
    //   console.error(error);
    // }
 }


const handleLogout=()=>{
  removeCookies("userID");
}

const fallback = ("");

  return (
    <div className="expense-layout">
      <button onClick={handleLogout}>Logout</button>
      <h1>Welcome, {cookies.name}</h1>{/*Pulling name from database once connected*/}
      <h4>Your Expenses</h4>
      
      {/*maps expenses from  database once fetched */}
      <div className='expenses'>
          {userExpenses&&<Expenses expenses = {userExpenses} onDelete={deleteExpense} />}
      </div> 
    
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
        
        {popupActive ? ( 
            <div className='popup'>
            
            <div className="content">
              <input 
              placeholder='Expense Name'
              type='text'
              className='addExpenseInput'
              onChange={e => setNewType(e.target.value)}
              value = {newType} />

              <input 
              type='number'
              placeholder='Expense Price'
              className='addExpenseInput'
              onChange={e =>setNewPrice(e.target.value)}
              value = {newPrice} />
              <input 
              placeholder='Expense Quantity'
              type='number'
              className='addExpenseInput'
              onChange={e => setNewQuantity(e.target.value)}
              value = {newQuantity} />
              <button className='createExpenseButton' onClick={addExpense}>Create Expense</button> 
              <button className='cancelExpenseButton' onClick={() => setPopupActive(false)}>cancel</button> 
            </div>
            
          </div>
          ): <div className="addPopup" onClick={()=>setPopupActive(true) }>Add Expense</div>
        }
      </div>
    </div>
      
  );
}

export default UserExpenses;

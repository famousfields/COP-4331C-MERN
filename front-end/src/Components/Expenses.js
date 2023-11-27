import React from 'react'
import { useState } from 'react';
import axios from 'axios';

const Expenses = ({expenses,onDelete} ) =>
{
  const [value,setValue] = useState(false)
  const [testExpenses,setTestExpenses] = useState([
    {
      id: 1,
      type:"gasoline",
      price:15,
      quantity:1
    },
    {
      id:2,
      type:"gasoline",
      price:15,
      quantity:1
    },
    {
      id:3,
      type:"gasoline",
      price:15,
      quantity:1
    },
    {
      id:4,
      type:"gasoline",
      price:15,
      quantity:1
    }
  ])
  
  const handleDelete = async(expense) =>{
      try{
        const deletionMessage = await axios.delete(`http://localhost:5000/expenses/${expense._id}`)
        
        console.log(deletionMessage)
        if(deletionMessage.data.message){
          await onDelete(expense)
        }
        else{
          console.log("error perfoeming deletion")
        }
      }catch(err)
      {
        console.error(err);
      }
  }

  const listItems =  testExpenses.map((testExpense) => (
    <ul className='expense' key={testExpense.id}>
        <li className='text'>{testExpense.type}</li>
        <li className='price'>{testExpense.price}</li>
        <li className='quantity'>{testExpense.quantity}</li> 
        <li className='delete-expense' >x</li>
    </ul>
  ));
const fallback = "";
  return (
    <>
    <div className='expensesDiv'>
      {expenses?.length?expenses.map(expense=>(
        <div className='expense' key = {expense._id}>
          <div className='text'>Expense Name: {expense.type}</div>
          <div className='price'>Price: ${expense.price}</div>
          <div className='price'>Quantity: {expense.quantity}</div>  
          <button className='delete-expense'onClick={()=>handleDelete(expense)}>x</button>
        </div>
        
      )) 
      :   
      fallback
      }
    </div>
      {/*
      <div>{listItems}</div>
          
      } */}

    </>
  );
}
export default Expenses;

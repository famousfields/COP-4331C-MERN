import React from 'react'
import { useState } from 'react';

const Expenses = ({expenses}) =>
{
  console.log(expenses)
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

  const listItems =  testExpenses.map((testExpense) => (
    <ul className='expense' key={testExpense.id}>
        <li className='text'>{testExpense.type}</li>
        <li className='price'>{testExpense.price}</li>
        <li className='quantity'>{testExpense.quantity}</li> 
        <li className='delete-expense' >x</li>
    </ul>
  ));

  return (
    <>
    
      {expenses?.length?expenses.map(expense=>(
        <div className='expense' key = {expense._id}>
          <div className='text'>{expense.type}</div>
          <div className='price'>{expense.price}</div>
          <div className='quantity'>{expense.quantity}</div> 
          <div className='delete-expense' >x</div>
        </div>
      )) 
      :   
      <div>No expenses to show</div>
}
      {/*
      <div>{listItems}</div>
          
      } */}

    </>
  );
}
export default Expenses;

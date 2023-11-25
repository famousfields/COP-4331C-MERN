import React from 'react'
import { useState } from 'react';

const Expenses = ({expenses}) =>
{
   console.log({expenses})
  return (
    <>
      
      { expenses && expenses.length? expenses.map(expense=>{
        <div className='expense'>
          <div className='text'>{expense.type}</div>
          <div className='price'>{expense.quantity}</div>
          <div className='quantity'>{expense.price}</div> 
          <div className='delete-expense' >x</div>
        </div>
      }) 
      :   
      <>
        <div>Error mapping expenses</div>
      </>
      }
    </>
  );
}
export default Expenses;

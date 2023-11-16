import React from 'react'

const Expenses = (expenses) =>
{
  return (
    <div>
      {expenses ? expenses.map((expense)=>{
        <>
          <h2>{expense.name}</h2>
          <h2>{expense.quantity}</h2>
          <p>{expense.price}</p>
        </>
      }) : ""}
    </div>
  )
}

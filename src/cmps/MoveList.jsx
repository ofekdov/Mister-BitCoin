import React from 'react'

export default function MoveList({moves, title}) {
  if (!moves) return (
    <section className='move-list'>
        <h3>{title}</h3>
  <div>No Transfers Yet</div> 
  </section>
  )

  return (
    <section className='move-list'>
        <h3>{title}</h3>
        <ul>
           {moves.map(move=>{
            return ( <li>
                <span>{move.to}</span>
                <span>{convertMillisecondsToDateTime(move.at)}</span>
                <span className='amount'>${move.amount}</span>
            </li>)
           })} 
        </ul>
    </section>
  )
}

function convertMillisecondsToDateTime(milliseconds) {
    // Convert milliseconds to seconds
    var seconds = Math.floor(milliseconds / 1000);
  
    // Create a new Date object from seconds
    var date = new Date(seconds * 1000);
  
    // Get day, month, and abbreviated month name
    var day = date.getDate();
    var month = date.getMonth();
    var monthAbbreviation = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
  
    // Get hour and format as two-digit string
    var hour = ('0' + date.getHours()).slice(-2);
  
    // Format date as "d Month HH:MM"
    var formattedDate = day + ' ' + monthAbbreviation + ' ' + hour + ':' + ('0' + date.getMinutes()).slice(-2);
  
    return formattedDate;
  }



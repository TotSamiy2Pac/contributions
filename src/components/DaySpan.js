import React, { useState } from 'react';
import ModalDay from "./ModalDay";

const DaySpan = ({ date, dateJson, handleClick, isOpen }) => {


  return (
    <>
      <span
        key={date}
        onClick={event => handleClick(date)}
        className={`contribution-weekly_day 
          ${
          dateJson[date] <= 9 && dateJson[date] > 0 ? 'bg-color-1' :
            dateJson[date] > 9 && dateJson[date] < 20 ? 'bg-color-2' :
              dateJson[date] > 20 && dateJson[date] < 30 ? 'bg-color-3' :
                dateJson[date] > 30 ? 'bg-color-4' : ''
        }`}
        data-date={date}
      >
        {isOpen &&
          <ModalDay date={date} dateJson={dateJson} />
        }
      </span>
    </>
  );
};

export default DaySpan;

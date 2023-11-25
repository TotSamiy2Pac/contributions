import React, { memo, useEffect, useState } from 'react';
import './contribution.scss';
import axios from 'axios';
import dayjs from 'dayjs';
import DaySpan from "./DaySpan";

const Contributions = memo(() => {
  const [dateJson, setDateJson] = useState({});
  const [isOpen, setIsOpen] = useState(null);

  useEffect(() => {
    axios('https://dpg.gg/test/calendar.json').then(({ data }) => setDateJson(data));
  }, []);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (!event.target.closest('.contribution-weekly_day ')) {
        handleCloseModal();
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const handleClick = (date) => {
    setIsOpen(date);
  };
  const handleCloseModal = () => {
    setIsOpen(null);
  };

  const currentDate = dayjs();
  const thisDayOfWeekly = dayjs().day()

  let dateRange = Array.from({length:357}).map((el, i) => {
    const date = currentDate.subtract(i, 'day');
    return date.format('YYYY-MM-DD');
  })

  const groupedDatesLast = [];
  groupedDatesLast.push(dateRange.slice(0, thisDayOfWeekly));

  const groupedDates = [];
  for (let i = 0; i < dateRange.length - thisDayOfWeekly ; i===0 ? i+=thisDayOfWeekly : i+=7) {
      groupedDates.push(dateRange.slice(i, i + 7));
  }

  return (
    <section className={'contribution'}>
      <div className="contribution-weekly">
        {groupedDatesLast[0].reverse().map((date) => (
          <span
            key={date}
            className={`contribution-weekly_day 
            ${
              dateJson[date] <= 9 && dateJson[date] > 0 ? 'bg-color-1' :
                dateJson[date] > 9 && dateJson[date] < 20 ? 'bg-color-2' :
                  dateJson[date] > 20  && dateJson[date] < 30 ? 'bg-color-3' :
                    dateJson[date] > 30 ? 'bg-color-4' : ''
            }`}
            data-date={date}
          >
            <span className={'modal '}></span>
          </span>
        ))}
      </div>
      {groupedDates.map((week, index) => (
        index!==0 &&
          <div key={index} className="contribution-weekly">
            {week.reverse().map((date) => (
              <DaySpan key={date} date={date} dateJson={dateJson}  handleClick={handleClick} isOpen={date===isOpen}/>
            ))}
          </div>
      ))}
      <div className="contribution-weekly">
        <span className={'d-block week'}>Пн</span>
        <span className={'d-block week'}></span>
        <span className={'d-block week'}>Ср</span>
        <span className={'d-block week'}></span>
        <span className={'d-block week'}>Пт</span>
      </div>
    </section>
  );
});

export default Contributions;

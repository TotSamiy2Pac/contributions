import React from 'react';

const ModalDay = ({dateJson,date}) => {
  return (
    <div className="modal d-block">
      <span>{dateJson[date] || 0} contributions</span>
      <span>{date}</span>
    </div>
  );
};

export default ModalDay;
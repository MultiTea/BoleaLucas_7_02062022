import React from 'react';
import { TrendData } from '../../Data/TrendData';

const TrendCard = () => {
  return (
    <div className="TrendCard">
      <h3>Tendances pour vous</h3>

      {TrendData.map((trend, id) => {
        return (
          <div className="trend" key={id}>
            <span>#{trend.name}</span>
            <span>{trend.shares} partages</span>
          </div>
        );
      })}
    </div>
  );
};

export default TrendCard;

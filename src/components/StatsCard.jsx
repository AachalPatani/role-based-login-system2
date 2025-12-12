import React from 'react';

const StatsCard = ({ icon, title, value, color, trend }) => {
  const colorClasses = {
    blue: 'stat-icon blue',
    green: 'stat-icon green',
    orange: 'stat-icon orange',
    purple: 'stat-icon purple'
  };

  return (
    <div className="stat-card">
      <div className={colorClasses[color] || 'stat-icon blue'}>
        <i className={icon}></i>
      </div>
      <div className="stat-info">
        <h3>{value}</h3>
        <p>{title}</p>
        {trend && (
          <small className={`d-flex align-center gap-1 mt-1 ${trend.includes('+') ? 'text-success' : 'text-danger'}`}>
            <i className={`fas fa-${trend.includes('+') ? 'arrow-up' : 'arrow-down'}`}></i>
            {trend} from last month
          </small>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
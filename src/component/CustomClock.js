import React from 'react';

const CustomClock = props => {
  const prepared = Math.floor(props.time / 1000);

  const seconds = prepared % 60;
  const minutes = Math.floor(prepared / 60) % 60;
  const hours   = Math.floor(prepared / 3600) % 24;

  const timeZone = Math.floor((props.time.getTime() - props.utcTime.getTime()) / (60 * 1000));

  const timeZoneHour = Math.floor(timeZone / 60) % 24;
  const timeZoneMinute = timeZone % 60;

  return (
    <div className='d-flex flex-column align-items-center' style={{fontSize: '4em'}}>
      <span>
        {
          `Local time: ` + 
          `${(hours < 10 ? '0' : '') + hours}:` + 
          `${(minutes < 10 ? '0' : '') + minutes}:` + 
          `${(seconds < 10 ? '0' : '') + seconds}`
        }
      </span>
      <span>
        {
          `UTC` + 
          `${timeZoneHour >= 0 ? '+' : ''}${timeZoneHour}` + 
          `${timeZoneMinute ? (':' + timeZoneMinute) : ''}`
        }
      </span>
    </div>
  );
};

export default CustomClock;
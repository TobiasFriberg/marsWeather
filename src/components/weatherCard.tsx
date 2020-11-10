import React from 'react';
import moment from 'moment';
import Card from './card';
import List from './list';

type SolData = {
  First_UTC: string;
  AT: {
    mx: number;
    mn: number;
  };
  HWS: {
    av: number;
  };
  PRE: {
    av: number;
  };
};

interface WeatherProps {
  solData: SolData;
  sol: string;
};

const WeatherCard: React.FC<WeatherProps> = (props) => {
  const { sol, solData } = props;

  const getAverage = (data: {av: number}) => {
    if (!data) {
      return 'N/A';
    }

    return data.av;
  };

  return (
    <Card>
      <div className="text-headline centered">Sol {sol}</div>
      <div className="centered">{moment(solData.First_UTC).format('Do MMM YYYY')}</div>
      <List>
        <li>
          <i className="fas fa-temperature-low" /> {solData.AT.mn} C° / {solData.AT.mx} C°
        </li>
        <li>
          <i className="fas fa-wind" /> {getAverage(solData.HWS)} m/s
        </li>
        <li>
          <i className="fas fa-stopwatch" /> {getAverage(solData.PRE)} Pa
        </li>
      </List>
    </Card>
  );
};

export default WeatherCard;
import React from 'react';
import moment from 'moment';
import Card from './card';
import List from './list';

type SolData = {
  First_UTC: string;
  AT: {
    mx: number;
    mn: number;
    av: number;
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

  const getMin = (data: {mn: number, mx: number, av: number}) => {
    if (!data.mn) {
      return getAverage(data);
    }

    return data.mn;
  };

  const getMax = (data: {mn: number, mx: number, av: number}) => {
    if (!data.mx) {
      return getAverage(data);
    }

    return data.mx;
  };

  const getAverage = (data: {av: number}) => {
    if (!data) {
      return 'N/A';
    }

    return data.av;
  };

  const printWind = () => {
    if (!solData.HWS) {
      return 'No wind data';
    }

    return `${getAverage(solData.HWS) } m / s`;
  };

  const printPressure = () => {
    if (!solData.PRE) {
      return 'No pressure data';
    }

    return `${getAverage(solData.PRE)} Pa`;
  };

  const printTemperature = () => {
    if (!solData.AT) {
      return 'No temperature data';
    }

    return `${getMin(solData.AT)} C° / ${getMax(solData.AT)} C°`;
  };

  return (
    <Card>
      <div className="text-headline centered">Sol {sol}</div>
      <div className="centered">{moment(solData.First_UTC).format('Do MMM YYYY')}</div>
      <List>
        <li>
          <i className="fas fa-temperature-low" /> {printTemperature()}
        </li>
        <li>
          <i className="fas fa-wind" /> {printWind()}
        </li>
        <li>
          <i className="fas fa-stopwatch" /> {printPressure()}
        </li>
      </List>
    </Card>
  );
};

export default WeatherCard;
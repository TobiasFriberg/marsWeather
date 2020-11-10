import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import WeatherCard from '../src/components/weatherCard';
configure({adapter: new Adapter()});

  const solData = {
  First_UTC: '2020-11-06T05:45:18Z',
  AT: {
    mx: -10,
    mn: -5
  },
  HWS: {
    av: 20
  },
  PRE: {
    av: 25,
  }
};

test('display correct Sol', () => {
  const component = mount(<WeatherCard sol="123" solData={solData} />);
  const test = component.find('.text-headline');
  expect(test.text()).toBe('Sol 123');
});

test('display correct temperature first', () => {
  const component = shallow(<WeatherCard sol="123" solData={solData} />);
  const test = component.find('li').at(0).text();
  expect(test).toContain('-5 C° / -10 C°');
});

test('display correct wind second', () => {
  const component = shallow(<WeatherCard sol="123" solData={solData} />);
  const test = component.find('li').at(1).text();
  expect(test).toContain('20 m/s');
});

test('display date in correct format', () => {
  const component = shallow(<WeatherCard sol="123" solData={solData} />);
  const test = component.find('div').at(1).text();
  expect(test).toContain('6th Nov 2020');
});

test('display wind when missing', () => {

  const solDataAlt = {
  First_UTC: '2020-11-06T05:45:18Z',
  AT: {
    mx: -10,
    mn: -5
  },
  PRE: {
    av: 25,
  }
};

  const component = shallow(<WeatherCard sol="123" solData={solDataAlt} />);
  const test = component.find('li').at(1).text();
  expect(test).toContain('N/A m/s');
});
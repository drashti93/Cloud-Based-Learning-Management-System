import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Sidebar from './components/sidebar/sidebar';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {configure} from 'enzyme'


configure({ adapter: new Adapter() })
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('<Signin/>', function(){
  it('renders', () => {
      const wrapper = mount(<Signin/>);
      expect(wrapper.find('.signup_nav').text()).toBe("Connecting to ")
    });
});

describe('<Signup/>', function(){
  it('renders', () => {
      const wrapper = mount(<Signup/>);
      expect(wrapper.find('.signup_nav').text()).toBe("Connecting to ")
    });
});

describe('<Sidebar/>', function(){
  it('renders', () => {
    const wrapper = mount(<Sidebar/>);
    expect(wrapper.find('#logo-gold').prop('src')).toEqual("/assets/images/sjsu-logo-gold.png")
  });
});
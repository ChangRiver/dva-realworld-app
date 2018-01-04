import React, { Component } from 'react';
import { connect } from 'dva';

const HOC = (BaesComponent) => {
  class HOComponent extends Component {

    componentWillUnmount() {
      this.props.dispatch({
        type: 'app/unload'
      })
    }

    render() {
      return <BaesComponent {...this.props}/>
    }
  } 

  return connect()(HOComponent);
};
  

export default HOC;

import React, { Component } from 'react';
import { observer } from "mobx-react";
import { toJS } from 'mobx'

class Blank extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        blank
      </div>
    )
  }
}

Blank.propTypes = {

}

export default observer(Blank);

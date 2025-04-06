import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { useStore } from '../store/use-store'

import Head from 'next/head'
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";

function BlankFunction(props) {
  const store = useStore();
  return (
    <div>
      blank
    </div>
  )
}

export default observer(BlankFunction);


import React from 'react'
import PropTypes from 'prop-types'

export const Spacer = ({height = 10}) => {
  return <div style={{height: height}} />
  
};

Spacer.propTypes = {
    height: PropTypes.number
};

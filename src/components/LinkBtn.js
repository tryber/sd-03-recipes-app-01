import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function LinkBtn({ text, disabled, onClick, testid, to }) {
  if (disabled) return <button disabled onClick={onClick} data-testid={testid}>{text}</button>;
  return <Link to={to}><button onClick={onClick} data-testid={testid}>{text}</button></Link>;
}

LinkBtn.propTypes = {
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  testid: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default LinkBtn;

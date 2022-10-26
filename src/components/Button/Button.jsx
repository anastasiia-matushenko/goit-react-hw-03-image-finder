import PropTypes from 'prop-types';
import { LoadMore } from './Button.styled';

export const Button = ({ handleClick }) => {
  return <LoadMore onClick={handleClick}>Load more</LoadMore>;
};

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

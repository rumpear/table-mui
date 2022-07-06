import { NavLink } from 'react-router-dom';

import './styles.scss';

const Navigation = () => {
  return (
    <div className="Navigation-Wrapper">
      <NavLink className={'Navigation-NavLink'} to="/">
        Home
      </NavLink>
      <NavLink className={'Navigation-NavLink'} to="/table">
        Table
      </NavLink>
    </div>
  );
};

export default Navigation;

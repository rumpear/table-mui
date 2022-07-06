import PropTypes from "prop-types";
import "./styles.scss";

const Section = ({ children }) => (
  <div className="Section-container">{children}</div>
);

Section.propTypes = {
  children: PropTypes.node,
};

export default Section;

import { Link } from "npm:react-router-dom"; 

export default function Button ({className, to}) {
  return (
    <Link className={className} to={to} />
  )
}

Button.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string
}
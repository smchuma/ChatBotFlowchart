/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import cn from "classnames";

const Modal = ({ children, open }) => {
  const modalClass = cn({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": open,
  });
  return (
    <div className={modalClass}>
      <div className="modal-box bg-white ">{children}</div>
    </div>
  );
};

Modal.propTypes = {
  open: PropTypes.bool,
};

export default Modal;

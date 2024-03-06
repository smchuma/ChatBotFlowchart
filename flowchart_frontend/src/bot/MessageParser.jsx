import React from "react";
import PropTypes from "prop-types";

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    if (message.includes("hello")) {
      actions.handleHello();
    } else {
      actions.handleDefault();
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

MessageParser.propTypes = {
  children: PropTypes.node,
  actions: PropTypes.object,
};

export default MessageParser;

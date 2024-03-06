import propTypes from "prop-types";

import { createContext, useContext, useState } from "react";

const TagContext = createContext();

export const useTagContext = () => useContext(TagContext);

export const TagProvider = ({ children }) => {
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [selectedNodeId, setSelectedNodeId] = useState();

  const addTag = (tag) => {
    setTags((prevTags) => [...prevTags, tag]);
  };

  const removeTag = (tagToRemove) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <TagContext.Provider
      value={{
        tags,
        tagInput,
        setTagInput,
        addTag,
        removeTag,
        setTags,
        selectedNodeId,
        setSelectedNodeId,
      }}
    >
      {children}
    </TagContext.Provider>
  );
};

TagProvider.propTypes = {
  children: propTypes.node,
};

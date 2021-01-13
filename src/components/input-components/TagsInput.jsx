import React, { useState, useEffect, useContext } from "react";
import "./TagInput-Style.css";
import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";
import axios from "axios";
import tagsContext from "../../utils/tagsContext";
import categoryContext from "../../utils/categoryContext";

const TagsInput = ({ defaultInputValue }) => {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);
  const { selectedTags, setSelectedTags } = useContext(tagsContext);
  const { selectedCategory } = useContext(categoryContext);
  const animatedComponent = makeAnimated();
  const [isDefaultInput, setIsDefaultInput] = useState(true);

  useEffect(() => {
    if (defaultInputValue && isDefaultInput) {
      axios
        .get(
          `http://stagingworknbackend-env.eba-hgtcjrfm.us-east-2.elasticbeanstalk.com/api/v1/categories/${defaultInputValue}/tags`
        )
        .then((res) => {
          const json = res.data.data.tags;
          const tags = [];
          json.forEach((i) => {
            tags.push({ label: i.name, value: i._id });
          });
          setTags(tags);
          setIsDefaultInput(false);
        });
    } else {
      axios
        .get(
          `http://stagingworknbackend-env.eba-hgtcjrfm.us-east-2.elasticbeanstalk.com/api/v1/categories/${selectedCategory.label}/tags`
        )
        .then((res) => {
          const json = res.data.data.tags;
          const tags = [];
          json.forEach((i) => {
            tags.push({ label: i.name, value: i._id });
          });
          setTags(tags);
        })
        .catch((error) => {});
    }
  }, [selectedCategory, inputValue, defaultInputValue, isDefaultInput]);

  const filterCategories = (inputValue) => {
    const temp = tags.filter((tag) =>
      tag.label.includes(inputValue.toLowerCase())
    );
    return temp;
  };

  const onChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, "");
    setInputValue(inputValue);
    return inputValue;
  };

  const loadOptions = async (inputValue, callback) => {
    callback(filterCategories(inputValue));
  };

  return (
    <div className="taginput">
      <AsyncSelect
        defaultOptions={tags}
        components={animatedComponent}
        isMulti
        onChange={setSelectedTags}
        placeholder="Puedes seleccionar entre 3 y 10"
        loadOptions={loadOptions}
        onInputChange={onChange}
        value={selectedTags}
        theme={(theme) => ({
          ...theme,
          borderRadius: 5,
          colors: {
            ...theme.colors,
            primary25: "#f7f7f7",
            primary: "#00BA6B",
            neutral0: "white",
            neutral90: "white",
          },
        })}
      ></AsyncSelect>
    </div>
  );
};

export default TagsInput;

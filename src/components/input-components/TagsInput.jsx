import React, { useState, useEffect, useContext } from "react";
import "./TagInput-Style.css";
import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";
import axios from "axios";
import tagsContext from "../../utils/tagsContext";
import categoryContext from "../../utils/categoryContext";

const TagsInput = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const { selectedTags, setSelectedTags } = useContext(tagsContext);
  const category = selectedCategory;

  const animatedComponent = makeAnimated();

  useEffect(() => {
    const response = axios
      .get(
        `http://stagingworknbackend-env.eba-hgtcjrfm.us-east-2.elasticbeanstalk.com/api/v1/categories/software/tags`
      )
      .then((res) => {
        const json = res.data.data.tags;
        const tags = [];
        json.map((i) => {
          tags.push({ label: i.name, value: i._id });
        });
        setTags(tags);
      });
  }, []);

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
    <categoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      <div className="taginput">
        {/* <div>{this.state.filteredCategories.map(this.renderEveryTag)}</div> */}
        <AsyncSelect
          components={animatedComponent}
          isMulti
          onChange={setSelectedTags}
          placeholder={selectedCategory}
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
    </categoryContext.Provider>
  );
};

export default TagsInput;

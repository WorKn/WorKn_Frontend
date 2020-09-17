import React, { useState, useEffect, useContext } from "react";
import "./TagInput-Style.css";
import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";
import axios from "axios";
import categoryContext from "../../utils/categoryContext";

const CategoryInput = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [categories, setCategories] = useState([]);
  const { selectedCategory, setSelectedCategory } = useContext(categoryContext);
  const animatedComponent = makeAnimated();

  useEffect(() => {
    axios
      .get(
        `http://stagingworknbackend-env.eba-hgtcjrfm.us-east-2.elasticbeanstalk.com/api/v1/categories`
      )
      .then((res) => {
        console.log(inputValue);
        const json = res.data.data.data;
        const categories = [];
        json.forEach((i) => {
          categories.push({ label: i.name, value: i._id });
        });
        setCategories(categories);
      });
  }, [inputValue]);

  const filterCategories = (inputValue) => {
    const temp = categories.filter((category) =>
      category.label.includes(inputValue.toLowerCase())
    );
    return temp;
  };

  const onChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, "");
    setInputValue(inputValue);
    // console.log(selectedCategories);
    return inputValue;
  };

  const loadOptions = async (inputValue, callback) => {
    callback(filterCategories(inputValue));
  };

  return (
    <div className="taginput">
      {/* <div>{this.state.filteredCategories.map(this.renderEveryTag)}</div> */}
      <AsyncSelect
        defaultOptions={categories}
        components={animatedComponent}
        onChange={setSelectedCategory}
        placeholder={"ej: Software."}
        loadOptions={loadOptions}
        onInputChange={onChange}
        value={selectedCategory}
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

export default CategoryInput;

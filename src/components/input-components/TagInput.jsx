import React, { PureComponent, Component } from "react";
import "./TagInput-Style.css";
import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";
import axios from "axios";
const animatedComponent = makeAnimated();
class TagInput extends Component {
  constructor(props) {
    super(props);
    this.state = { inputValue: "", categories: [] };
  }

  componentDidMount() {
    const response = axios
      .get(
        `http://stagingworknbackend-env.eba-hgtcjrfm.us-east-2.elasticbeanstalk.com/api/v1/categories`
      )
      .then((res) => {
        const json = res.data.data.data;
        const categories = [];
        json.map((i) => {
          categories.push({ label: i.name, value: i._id });
        });
        this.setState({ categories: categories });
      });
  }

  filterCategories = (inputValue) => {
    // console.log(inputValue);
    const temp = this.state.categories.filter((category) =>
      category.label.includes(inputValue.toLowerCase())
    );
    // console.log(temp);
    return temp;
  };

  onChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, "");
    this.setState({ inputValue });
    return inputValue;
  };

  loadOptions = async (inputValue, callback) => {
    callback(this.filterCategories(inputValue));
  };

  renderEveryTag = (tag) => {
    // return <h1>klk</h1>;
  };

  render() {
    return (
      <div className="taginput">
        {/* <div>{this.state.filteredCategories.map(this.renderEveryTag)}</div> */}
        <AsyncSelect
          components={animatedComponent}
          isMulti
          value={this.state.filteredCategories}
          placeholder={"Escribe tu tag..."}
          loadOptions={this.loadOptions}
          onInputChange={this.onChange}
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
  }
}

export default TagInput;

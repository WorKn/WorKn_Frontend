import React, { PureComponent } from "react";
import "./TagInput-Style.css";
import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";

const animatedComponent = makeAnimated();
class TagInput extends PureComponent {
  state = { selectedTags: [] };

  onChange = (selectedTags) => {
    this.setState({
      selectedTags: selectedTags || [],
    });
  };

  loadOptions = async (inputText, callback) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos?title_like=${inputText}`
    );
    const json = await response.json();
    callback(
      json.map((i) => ({ label: i.title, value: i.id, mapeo: i.completed }))
    );
  };

  renderEveryTag = (tag) => {
    // return <h1>klk</h1>;
  };

  render() {
    return (
      <div className="taginput">
        <div>{this.state.selectedTags.map(this.renderEveryTag)}</div>
        <AsyncSelect
          components={animatedComponent}
          isMulti
          value={this.state.selectedTags}
          onChange={this.onChange}
          placeholder={"Escribe tu tag..."}
          loadOptions={this.loadOptions}
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

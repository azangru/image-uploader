import React, { Component } from 'react';

import './form.css';

class Form extends Component {

  setInput = (element) => this.input = element

  handleSelectButtonClick = () => {
    this.input.click();
  }

  handleInputChange = (event) => {
    const { target: { files } } = event;
    this.props.onFilesSelect(files);
  }

  render() {
    return (
      <div className="form">
        <h1 className="form__title">Upload images</h1>
        <div>
          { Boolean(this.props.selectedFiles.length) && this.renderFilesList() }
          { this.renderInput() }
          { this.renderSelectButton() }
          { this.renderSubmitButton() }
        </div>
      </div>
    );
  }

  renderFilesList() {
    return (
      <ul className="form__selected-files">
        {
          this.props.selectedFiles.map((file, index) => (
            <li key={`${file.name}-${index}`}>
              {file.name}
            </li>
          ))
        }
      </ul>
    );
  }

  renderSelectButton() {
    return (
      <button onClick={this.handleSelectButtonClick}>
        Select files
      </button>
    );
  }

  renderSubmitButton() {
    return (
      <button onClick={this.props.onSubmit}>
        Upload
      </button>
    );
  }

  renderInput() {
    return (
      <input
        className="form__file-input"
        ref={this.setInput}
        type="file"
        multiple
        onChange={this.handleInputChange}
      />
    );
  }

}

export default Form;

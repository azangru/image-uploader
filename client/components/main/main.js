import React, { Component } from 'react';
import axios from 'axios';

import Form from 'client/components/form';
import FileList from 'client/components/file-list';

const initialState = {
  view: 'form', // can be either 'form' or 'file-list'
  files: [],
  uploadedFileUrls: [],
  loading: false
};

class Main extends Component {

  state = initialState

  handleFilesSelect = (files) => {
    this.setState({ files: [...this.state.files, ...files] });
  }

  handleSubmit = async () => {
    if (!this.state.files.length) return;

    const formData = new FormData();
    this.state.files.forEach(file => {
      formData.append('images[]', file, file.name);
    });

    try {
      this.setState({ loading: true });
      const { data: uploadedFileUrls } = await axios({
        method: 'post',
        url: '/upload',
        headers: { 'content-type': 'multipart/form-data' },
        data: formData
      });
      this.setState({ uploadedFileUrls, view: 'file-list', loading: false });
    } catch (error) {
      console.log('error', error);
    }
  }

  reset = () => {
    this.setState(initialState);
  }

  render(){
    return this.state.view === 'file-list' ? this.renderFilesList() : this.renderForm();
  }

  renderForm() {
    return (
      <Form
        selectedFiles={this.state.files}
        onFilesSelect={this.handleFilesSelect}
        onSubmit={this.handleSubmit}
        loading={this.state.loading}
      />
    );
  }

  renderFilesList() {
    return (
      <FileList
        uploadedFileUrls={this.state.uploadedFileUrls}
        onResetClick={this.reset}
      />
    );
  }

}

export default Main;

import React from "react";

export default class AddFolder extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
  };
  render() {
    return (
      <form className="AddFolder" onSubmit={e => this.handleSubmit(e)}>
        <input type="text" name="name" id="name" defaultValue="New Folder" />
        <button type="submit" className="AddFolder__btn">
          Add
        </button>
      </form>
    );
  }
}

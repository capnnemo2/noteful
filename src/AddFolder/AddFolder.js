import React from "react";

export default class AddFolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folderName: ""
    };
  }

  updateFolderName(name) {
    this.setState({ folderName: { value: name } });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { name } = this.state;
    console.log(name);
  };
  render() {
    return (
      <form className="AddFolder" onSubmit={e => this.handleSubmit(e)}>
        <input
          type="text"
          name="name"
          id="name"
          onChange={e => this.updateFolderName(e.target.value)}
        />
        <button type="submit" className="AddFolder__btn">
          Add
        </button>
      </form>
    );
  }
}

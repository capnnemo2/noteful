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

  handleSubmit = name => {
    console.log(name);
    const url = "http://localhost:9090/folders/";
    fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(() => {
        this.context.addFolder(name);
      })
      .catch(error => {
        console.error({ error });
      });
  };
  render() {
    return (
      <form
        className="AddFolder"
        onSubmit={e => {
          e.preventDefault();
          this.handleSubmit(this.state.folderName.value);
        }}
      >
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

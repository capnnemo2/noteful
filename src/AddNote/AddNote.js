import React from "react";
import NotefulContext from "../NotefulContext";

export default class AddNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noteName: "",
      folders: []
    };
  }

  updateNoteName(name) {
    this.setState({ noteName: { value: name } });
  }

  static contextType = NotefulContext;
  render() {
    const { folders = [] } = this.context;
    return (
      <form className="AddNote">
        <input
          type="text"
          name="name"
          id="name"
          onChange={e => this.updateNoteName(e.target.value)}
        />
      </form>
    );
  }
}

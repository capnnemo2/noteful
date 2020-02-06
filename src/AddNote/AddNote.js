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
  static contextType = NotefulContext;
  render() {
    const { folders = [] } = this.context;
    return <form className="AddNote"></form>;
  }
}

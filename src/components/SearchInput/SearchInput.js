import React, { Component } from "react";
import { InputGroup, Input, InputGroupAddon, Button } from "reactstrap";

export class SearchInput extends Component {
  state = {
    searchTerm: ""
  };

  componentDidMount() {
    // this.setState({ searchTerm: e.target.value });
  }

  handleInput = e => {
    this.setState({ searchTerm: e.target.value });
  };

  render() {
    return (
      <div>
        <InputGroup>
          <Input onChange={this.handleInput} />
          <InputGroupAddon addonType="append">
            <Button color="success">Search</Button>
          </InputGroupAddon>
        </InputGroup>
        <br />
      </div>
    );
  }
}

export default SearchInput;

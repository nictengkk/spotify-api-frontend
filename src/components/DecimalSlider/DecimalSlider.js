import React from "react";
import { Slider, Row } from "antd";

class DecimalSlider extends React.Component {
  state = {
    inputValue: 0
  };

  componentDidMount() {
    const { value } = this.props;
    const inputValue = Number(value);
    this.setState({ inputValue });
  }

  onChange = value => {
    if (Number.isNaN(value)) {
      return;
    }
    this.setState({
      inputValue: value
    });
  };

  render() {
    const { inputValue } = this.state;
    return (
      <Row>
        <Slider
          min={inputValue < 0 ? -100 : 0}
          max={inputValue > 1 ? 100 : 1}
          onChange={this.onChange}
          value={typeof inputValue === "number" ? inputValue : 0}
          step={0.00001}
        />
      </Row>
    );
  }
}

export default DecimalSlider;

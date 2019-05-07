import React from "react";
import { Slider, InputNumber, Row, Col } from "antd";

class DecimalSlider extends React.Component {
  state = {
    inputValue: 0
  };

  componentDidMount() {
    const { value } = this.props;
    const inputValue = Number(value);
    console.log(typeof inputValue);
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
    console.log(inputValue);
    return (
      <Row>
        <Col span={12}>
          <Slider
            min={0}
            max={10}
            onChange={this.onChange}
            value={typeof inputValue === "number" ? inputValue : 0}
            step={0.00001}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={0}
            max={1}
            style={{ marginLeft: 16 }}
            step={0.00001}
            value={inputValue}
            onChange={this.onChange}
          />
        </Col>
      </Row>
    );
  }
}

// ReactDOM.render(
//   <div>
//     <DecimalStep />
//   </div>
//   //   mountNode
// );

export default DecimalSlider;

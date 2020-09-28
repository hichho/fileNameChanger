import React from "react";
import PropTypes from "prop-types";
import Flex from "@/components/Flex";

export default class AssetsIcon extends React.Component {

  render() {
    const {icon, size = 20} = this.props;
    return <Flex {...this.props}>
      <img
        src={require('../../assets/' + icon)} alt={''}
        style={{width: size, height: size}}
      />
    </Flex>
  }
}

AssetsIcon.propTypes = {
  icon: PropTypes.string,
  size: PropTypes.number,
};

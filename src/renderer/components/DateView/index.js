import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Common from "@/utils/Common";

/**
 * 格式化时间
 * @param seconds
 * @param format
 */
export function formatDate(seconds = '0', format = 'YYYY-MM-DD HH:mm:ss') {
  let msec = parseInt(seconds, 10) * 1000;
  return moment(msec).format(format);
}


/**
 * 当时间戳转为moment
 * @param seconds
 */
export function getMoment(seconds) {
  if (Common.isEmpty(seconds) || seconds == '0') {
    return undefined;
  }
  return moment(seconds * 1000);
}

/**
 * 将date转为seconds
 * @param date
 * @returns {number}
 */
export function dateToSeconds(date) {
  return parseInt((date.getTime() / 1000) + '', 10);
}

export default class DateView extends React.Component {

  render() {
    const {seconds, format, split} = this.props;
    if (seconds == '0') {
      return <span>无</span>
    }
    let dateStr = formatDate(seconds, format);
    if (split) {
      let dateStrs = dateStr.split(' ');
      if (dateStrs.length > 1) {
        return <span>{dateStrs[0]}<br/>{dateStrs[1]}</span>;
      }
    }
    return <span>{dateStr}</span>;
  }

}

DateView.defaultProps = {
  split: true,
  format: 'YYYY-MM-DD HH:mm:ss'
};

DateView.propTypes = {
  seconds: PropTypes.any,
  format: PropTypes.string,
  split: PropTypes.bool,
};

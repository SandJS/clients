'use strict';

class GlobalResponseHelper {
  static sortByRegion(response, region) {
    let res = [];

    if (!response) {
      return response;
    }

    _.each(response, (value, key) => {
      if (!_.isArray(value.results)) {
        return;
      }

      if (key == region) {
        res = value.results.concat(res);
      } else {
        res = res.concat(value.results);
      }
    });

    return !_.isEmpty(res) ? res : response;
  }

  static concatResults(responses) {
    let res = [];

    if (!responses) {
      return responses;
    }

    _.each(responses, (value) => {
      if (!_.isArray(value.results)) {
        return;
      }

      res = res.concat(value.results);
    });

    return res;
  }

  static sortByKey(responses, key, order) {
    if (!responses) {
      return responses;
    }

    let res = GlobalResponseHelper.concatResults(responses);
    res = _.sortBy(res, key);

    if (order == 'desc') {
      res = res.reverse();
    }

    return !_.isEmpty(res) ? res : responses;
  }

  static sortByCreatedTime(responses, order) {
    return GlobalResponseHelper.sortByKey(responses, 'createdTime', order);
  }
}

module.exports = GlobalResponseHelper;
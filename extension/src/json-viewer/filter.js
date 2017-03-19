function applyQuery(query) {
  return function (data) {
    var fullQuery = typeof query === 'string'
      ? query.toString().split('.')
      : '';

    if (!query) {
      return data;
    }

    var filteredJson = null;

    if (Array.isArray(data.jsonObj)) {
      filteredJson = data.jsonObj.reduce(function(acc, next) {
        acc.push(filter(next, fullQuery));
        return acc;
      }, [])
    } else {
      filteredJson = filter(data.jsonObj, fullQuery);
    }

    return {
      jsonObj: filteredJson,
      jsonpWrapper: data.jsonpWrapper,
      options: data.options,
      filterQuery: query
    }
  }
}

function filter(input, query) {
  var querySegment = query.length ? query[0] : null;
  var nextQuery = query.slice(1);

  if (!querySegment) return input;

  var secondaryFilter = [];
  var match = querySegment.match(/^(.*)\[(.*)\]$/);
  if (match && match.length > 0) {
    querySegment = match[1];
    secondaryFilter = (match[2] || '')
      .split(',')
      .map(function (key) {
        return key.trim()
      });
  }

  var result = {};

  if (!querySegment || typeof input[querySegment] !== 'object') {
    if (secondaryFilter.length) {
      secondaryFilter.forEach(function(key) {
        if (input.hasOwnProperty(key)) {
          result[key] = input[key];
        }
      })
    } else {
      result[querySegment] = input[querySegment];
    }
    return result;
  }

  if (Array.isArray(input[querySegment])) {
    result[querySegment] = input[querySegment].reduce((acc, next, i) => {
      var indexInSecondaryFilter = secondaryFilter.indexOf(i.toString()) !== -1;
      if (!secondaryFilter.length || (secondaryFilter.length && indexInSecondaryFilter)) {
        acc.push(filter(next, nextQuery));
      }
      return acc;
    }, [])
  } else {
    result[querySegment] = filter(input[querySegment], nextQuery);
  }
  return result;
}

module.exports = {
  applyQuery: applyQuery
}

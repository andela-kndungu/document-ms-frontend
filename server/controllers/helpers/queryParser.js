const queryParser = (queryParameters, query) => {
  const limit = queryParameters.limit ?
    parseInt(queryParameters.limit, 10) :
    undefined;
  const parametersArray = Object.keys(queryParameters);
  parametersArray.forEach((parameter) => {
    switch (parameter) {
      case 'date':
        const nextDay = new Date();
        const requestedDay = new Date(queryParameters.date);
        nextDay.setDate(requestedDay.getDate() + 1);
        query.where('createdAt')
          .gte(requestedDay)
          .lt(nextDay);
        break;
      case 'tag':
        const tag = new RegExp(queryParameters.tag, 'i');
        query.where('tags').in([tag]);
        break;
      case 'role':
        query.where('accessibleBy').equals(queryParameters.role);
        break;
      case 'page':
        const page = parseInt(queryParameters.page, 10);
        const skip = page > 0 ?
          ((page - 1) * limit) :
          0;
        query.skip(skip);
        break;
      default:
        // Do nothing
    }
  });

  if (limit) {
    query.limit(limit);
  }
  // Sort by date in descendig order (latest first)
  query.sort({
    createdAt: -1

  });

  return query;
};

export default queryParser;


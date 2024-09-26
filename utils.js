const parseParams = (url, param) => {
    const path = new URL(`http://localhost:3000${url}`);
    const params = path.searchParams;
    return params.get(param);
  };
  
  module.exports = {
    parseParams,
  };
  
// Generate sort type
const generateSortType = (sortType) => {
  return sortType === 'desc' ? -1 : 1;
};

//Generate query string
const generateQueryString = (path, query)=>{
  const encodeQuery = Object.keys(query).map((key)=>encodeURIComponent(key)+'='+encodeURIComponent(query[key])).join('&') 
  return `${path}?${encodeQuery}`
}

export { generateSortType, generateQueryString };

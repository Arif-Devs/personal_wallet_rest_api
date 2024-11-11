// Generate sort type
const generateSortType = (sortType) => {
  return sortType === 'desc' ? -1 : 1;
};

export { generateSortType };

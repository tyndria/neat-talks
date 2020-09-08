export const generateData = (offset, limit) =>
  [...Array(limit).keys()].map((n) => n + offset);

export const requestData = async (offset, limit) => {
  return new Promise((resolve) =>
    setTimeout(() => resolve(generateData(offset, limit)), 5000),
  );
};

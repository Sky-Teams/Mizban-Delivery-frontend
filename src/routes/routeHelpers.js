export const buildPath = (path, params) => {
  let newPath = path;

  Object.keys(params).forEach((key) => {
    newPath = newPath.replace(`:${key}`, params[key]);
  });

  return newPath;
};

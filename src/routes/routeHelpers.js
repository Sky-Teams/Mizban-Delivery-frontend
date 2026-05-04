export function buildPath(path, params) {
  let newPath = path;

  Object.keys(params).forEach((key) => {
    newPath = newPath.replace(`:${key}`, params[key]);
  });

  return newPath;
}

export function toRoutePath(path) {
  if (path === '/') {
    return '';
  }

  return path.startsWith('/') ? path.slice(1) : path;
}

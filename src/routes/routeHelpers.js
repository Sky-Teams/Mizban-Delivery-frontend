export function buildPath(path, params) {
  let newPath = path;

  Object.keys(params).forEach((key) => {
    newPath = newPath.replace(`${key}`, params[key]);
  });

  return newPath;
}

export function toRoutePath(path) {
  if (path === '/') {
    return '';
  }

  return path.startsWith('/') ? path.slice(1) : path;
}

export function toNestedRoutePath(path, parentPath) {
  if (!parentPath || parentPath === '/') {
    return toRoutePath(path);
  }

  const normalizedParentPath = parentPath.endsWith('/') ? parentPath.slice(0, -1) : parentPath;
  const nestedPrefix = `${normalizedParentPath}/`;

  if (path === normalizedParentPath) {
    return '';
  }

  if (path.startsWith(nestedPrefix)) {
    return path.slice(nestedPrefix.length);
  }

  return toRoutePath(path);
}

export const changeEnumObjectToArray = (enumObject) => {
  const enumArray = [];
  Object.entries(enumObject).map(([key, value]) => {
    let option = {
      id: key,
      value: value,
    };
    enumArray.push(option);
  });
  return enumArray;
};

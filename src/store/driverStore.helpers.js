export const mergeDriver = (drivers, driver) => {
  const exists = drivers.some((item) => String(item.id) === String(driver.id));

  if (!exists) {
    return [driver, ...drivers];
  }

  return drivers.map((item) =>
    String(item.id) === String(driver.id) ? driver : item,
  );
};

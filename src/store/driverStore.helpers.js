export const mergeDriver = (drivers, driver) => {
  const exists = drivers.some((item) => String(item.id) === String(driver.id));

  if (!exists) {
    return [driver, ...drivers];
  }

  return drivers.map((item) =>
    String(item.id) === String(driver.id) ? driver : item,
  );
};

export const replaceDriver = (drivers, id, updatedDriver) =>
  drivers.map((driver) =>
    String(driver.id) === String(id) ? updatedDriver : driver,
  );

export const removeDriverById = (drivers, id) =>
  drivers.filter((driver) => String(driver.id) !== String(id));

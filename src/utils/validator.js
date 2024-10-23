function arrayValidator(list) {
  if (Array.isArray(list) && list.length > 0) {
    return list;
  }
  return [];
}

export { arrayValidator };

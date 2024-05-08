export const FilterUsers = (users, searchString) => {
  const filteredUsers = users.filter((user) => {
    const searchLower =
      typeof searchString === "string"
        ? searchString.toLowerCase()
        : searchString;

    return Object.values(user).some((value) => {
      const strValue = String(value).toLowerCase();
      return strValue.includes(searchLower);
    });
  });

  return filteredUsers;
};

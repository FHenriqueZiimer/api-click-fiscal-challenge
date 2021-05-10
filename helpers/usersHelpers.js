class usersHelpers {
  static getAll(users) {
    const response = users.map(users => ({
      id: users.id,
      name: users.name,
      email: users.email,
    }));
    return response;
  }

  static create(data, hashedPassword) {
    const response = {
      name: data.name,
      email: data.email,
      password: hashedPassword
    }
    return response
  }

  static getById(data) {
    const response = {
      id: data.id,
      name: data.name,
      email: data.email,
    }
    return response
  }
}

module.exports = usersHelpers
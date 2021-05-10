class phraseHelpers {
  static getAll(phrase) {
    const response = phrase.map(phrase => ({
      id: phrase._id,
      phrase: phrase.phrase,
      user: {
        id: phrase.user._id,
        name: phrase.user.name
      },
    }));
    return response;
  }

  static getById(data) {
    const response = {
      id: data._id,
      phrase: data.phrase,
      user: {
        id: phrase.user._id,
        name: phrase.user.name
      },
    }
    return response
  }
}

module.exports = phraseHelpers
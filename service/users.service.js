class UserService {
  constructor() {
    this.users = [
      {
        id: 1,
        name: 'client 1',
        country: 'Colombia',
        city: 'Soledad',
        age: '35 years old',
      },
      {
        id: 2,
        name: 'client 2',
        country: 'Colombia',
        city: 'Barranquilla',
        age: '30 years old',
      },
      {
        id: 3,
        name: 'client 3',
        country: 'Colombia',
        city: 'Malambo',
        age: '28 years old',
      },
    ];
  }

  create() {}
  find() {}
  findOne(id) {
    return this.users.find((client) => client.id === Number(id));
  }
  update() {}
  delete() {}
}

module.exports = UserService;

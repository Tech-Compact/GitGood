class UserController {
  async getUsers(req, res) {
    try {
      const user = [
        {
          name: "Steve Lee",
          username: "Huindoong",
        },
        {
          name: "Jonathon Doe",
          username: "Cykotech",
        },
        {
          name: "Jon Smith",
          username: "Coder123",
        },
        {
          name: "Ashley Brown",
          username: "NotAshley",
        }
      ];
      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(404).send("Not Found");
    }
  }
}

module.exports = UserController;

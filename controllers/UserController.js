
class UserController {
 
  async getUsers(req, res) {
    try {
        console.log("coming in!")
        const user = {
            name: 'Steve Doe',
            email: 'steve.doe@lycos.com',
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(404).send('Not Found');
    }
  }

}

module.exports = UserController;

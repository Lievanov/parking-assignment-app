const db = require('../db');

module.exports = app => {
  app.get('/employees', (req, res) => {
    res.send(db.getUsers())
  })

  app.get('/employees/:id', (req, res) => {
    const { id } = req.params;
    res.send(db.getEmployee(id))
  })

  app.get('/requests', (req, res) => {
    res.send(db.getRequests())
  })

  app.get('/login/:username/:password', (req, res) => {
    const { username, password } = req.params;
    if(username && password){
      const currentUser = db.login(username, password);
      if(currentUser  !== {}){
        res.send(currentUser);
      } else {
        res.status(403).send({"error": "Username or password incorrect."})
      }
    }else {
      res.status(403).send({"error": "Please, provide a Username and Password."})
    }
  })

  app.post('/parking-loan', (req, res) => {
    const {userId, startDate, endDate, location } = req.body;

    if(userId && startDate && endDate && location){
      res.send(db.parkingLoan(req.body));
    } else {
      res.status(403).send({"error": "Missing information."});
    }
  })

  app.patch('/parking-loan/:requestId/:status', (req, res) => {
    const {requestId, status } = req.params;
    if(requestId, status){
      res.send(db.updateRequest(req.params));
    } else {
      res.status(403).send({"error": "Missing information."});
    }
  })

  app.get('/waiting-list', (req, res) => {
    res.send(db.getWatingList())
  })
}

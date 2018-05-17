const email = require('./config/email');

const db = {
  users: {
    "kd0239d" : {
      id: "kd0239d",
      name: "Mario Portillo",
      username: "mario.portillo",
      password: "mapor91",
      email: "mario.portillo@rulesware.com"
    },
    "d34dd02" : {
      id: "d34dd02",
      name: "Diego Lievano",
      username: "diego.lievano",
      password: "liev",
      email: "diego.lievano@rulesware.com"
    },
    "023dm0d" : {
      id: "023dm0d",
      name: "Edgardo Hernandez",
      username: "ed.hernandez",
      password: "ed",
      email: "edgardo.hernandez@rulesware.com"
    },
    "c34oimc4" : {
      id: "c34oimc4",
      name: "Alexis Ayala",
      username: "alexis.ayala",
      password: "alexis",
      email: "alexis.ayala@rulesware.com"
    }
  },
  requests: {

  },
  waitingList: ["kd0239d", "c34oimc4", "d34dd02", "023dm0d"]
}

const getUsers = () => (db.users)

const getRequests = () => (db.requests)

const getWatingList = () =>  (db.waitingList)

const login = (username, password) => {
  const users = db.users;
  let currentUser = {};

  for(let id in users){
    if(users[id].username === username && users[id].password === password){
      currentUser = users[id];
    }
  }

  return currentUser;
}

const parkingLoan = (request) => {
  const id = Math.random().toString(36).substr(-8);
  const requestorId = db.waitingList[0];

  db.requests[id] = {
    id,
    userId: request.userId,
    startDate: request.startDate,
    endDate: request.endDate,
    location: request.location,
    status: "Pending",
    requestorId
  }
  email.sendEmail(db.users[requestorId], db.requests[id]);
  return db.requests;
}

const updateRequest = (params) => {
  const {requestId, status } = params;
  if(status === 'Rejected'){
    // send another email
    // get the next requestor Id in the request
  } else if(requestId && status === 'Accepted'){
    db.requests[requestId].status = status;
    // send information to the spot owner
  }
  return db.requests[requestId];
}

module.exports = {
  getUsers,
  getWatingList,
  login,
  parkingLoan,
  updateRequest,
  getRequests
}

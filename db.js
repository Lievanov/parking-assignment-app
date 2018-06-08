const email = require('./config/email');

const db = {
  users: {
    "kd0239d" : {
      id: "kd0239d",
      name: "Mario Portillo",
      username: "mario.portillo",
      password: "mapor91",
      email: "diego.lievano@rulesware.com",
      location: "Republic Parking"
    },
    "d34dd02" : {
      id: "d34dd02",
      name: "Diego Lievano",
      username: "diego.lievano",
      password: "liev",
      email: "diego.lievano@rulesware.com",
      location: "No Parking Spot"
    },
    "023dm0d" : {
      id: "023dm0d",
      name: "Edgardo Hernandez",
      username: "ed.hernandez",
      password: "ed",
      email: "diego.lievano@rulesware.com",
      location: "Avante 315"
    },
    "c34oimc4" : {
      id: "c34oimc4",
      name: "Alexis Ayala",
      username: "alexis.ayala",
      password: "alexis",
      email: "diego.lievano@rulesware.com",
      location: "Avante 316"
    }
  },
  requests: {
    "d09w2tlr" : {
      id: "d09w2tlr",
      userId: "023dm0d",
      startDate: "2018-03-01",
      endDate: "2018-03-10",
      location: "Avante 315",
      status: "Accepted",
      requestorId: "d34dd02"
    },
    "dp2oij4fko" : {
      id: "dp2oij4fko",
      userId: "c34oimc4",
      startDate: "2018-02-03",
      endDate: "2018-02-05",
      location: "Avante 316",
      status: "Accepted",
      requestorId: "kd0239d"
    }
  },
  waitingList: ["d34dd02", "kd0239d", "c34oimc4", "023dm0d"]
}

const convertObjectoToArray = objName => {
  const allKeys = Object.keys(objName);
  return allKeys.map(key => objName[key]);
}

const getUsers = () => (db.users)

const getEmployee = (id) => (db.users[id])

const getRequests = () => {
  const requests = convertObjectoToArray(db.requests);
  const spots = [];
  requests.map(spot => {
    const finalSpot = {
      id: spot.id,
      spotOwner: db.users[spot.userId].name,
      startDate: spot.startDate,
      endDate: spot.endDate,
      location: spot.location,
      status: spot.status,
      requestorName: db.users[spot.requestorId].name
    }
    spots.push(finalSpot);
  })
  return spots;
}

const getWatingList = () =>  {
    const waitList = convertObjectoToArray(db.waitingList);
    return waitList.map(item => db.users[item].name);
}

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
  db.waitingList.shift();
  db.waitingList.push(requestorId);
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

  const newSpot = {
    id,
    spotOwner: db.users[db.requests[id].userId].name,
    startDate: db.requests[id].startDate,
    endDate: db.requests[id].endDate,
    location: db.requests[id].location,
    status: db.requests[id].status,
    requestorName: db.users[db.requests[id].requestorId].name
  }

  return newSpot;
}

const updateRequest = (params) => {
  const {requestId, status } = params;
  if(status === 'Rejected'){
    const requestorId = db.waitingList[0];
    db.waitingList.shift();
    db.waitingList.push(requestorId);
    db.requests[requestId].requestorId = requestorId;
    email.sendEmail(db.users[requestorId], db.requests[requestId]);
  } else if(requestId && status === 'Accepted'){
    db.requests[requestId].status = status;
    const spotOwner = db.users[db.requests[requestId].userId],
          requestor = db.users[db.requests[requestId].requestorId],
          request = db.requests[requestId];
    email.acceptedSpot(spotOwner, requestor, request);
  }

  const updatedSpot = {
    id,
    spotOwner: db.users[db.requests[id].userId].name,
    startDate: db.requests[id].startDate,
    endDate: db.requests[id].endDate,
    location: db.requests[id].location,
    status: db.requests[id].status,
    requestorName: db.users[db.requests[id].requestorId].name
  }

  return updatedSpot;
}

module.exports = {
  getUsers,
  getWatingList,
  login,
  parkingLoan,
  updateRequest,
  getRequests,
  getEmployee
}

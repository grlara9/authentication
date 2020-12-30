const uuid = require('uuid/v4');


const DUMMY_USERS = [
    {
      id: 'u1',
      name: 'Roberto Lara',
      email: 'test@test.com',
      password: 'testers'
    }
  ];

  const getUsers = (req, res, next) => {
    res.json({ users: DUMMY_USERS });
  };

  const signup = (req, res, next)=>{
    const { name, email, password} = req.body

    const hasUser = DUMMY_USERS.find(u => u.email === email);
  if (hasUser) {
    return res.status(201).json({msg: 'Could not create user, email already exists.'});
  }

    const createdUser = {
        id: uuid(),
        name, // name: name
        email,
        password
      };

    DUMMY_USERS.push(createdUser);

    res.status(201).json({user: createdUser});
  }

  exports.getUsers = getUsers;
  exports.signup = signup;
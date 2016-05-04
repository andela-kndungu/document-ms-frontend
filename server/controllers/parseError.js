module.exports = function(res, error) {

  // Descrptive message of the failure to be sent to user
  var errorMessage;

  /* Sample saveError object
  {
     [ValidationError: Test validation failed]
     message: 'Test validation failed',
     name: 'ValidationError',
     errors: {
       'name.first': {
         [ValidatorError: First name must be provided]
         message: 'First name must be provided',
         name: 'ValidatorError',
         properties: [Object],
         kind: 'required',
         path: 'name.first',
         value: ''
       },
       'name.last': {
         [ValidatorError: Last name must be provided]
         message: 'Last name must be provided',
         name: 'ValidatorError',
         properties: [Object],
         kind: 'required',
         path: 'name.last',
         value: ''
       }
     }
   }
  */
  /* Sample duplicateError object
  {
    code: 11000,
    index: 0,
    errmsg: 'E11000 duplicate key error collection: document-ms.users index: username_1 dup key: { : "newuser" }',
    op: {
      role: 'user',
      password: '$2a$10$YZswFk9px8brimtQd5OaO.65otE6TE.vYJ0DCW7LVGxs2jYFt30l2',
      email: 'new@user.com',
      username: 'newuser',
      _id: '572a7a4153c50f810dc37d8b',
      created: '2016-05-04T22:40:01.657Z',
      name: [Object],
      __v: 0
    }
  }
  */

  // Handle save errors due to validation
  if (error.name === 'ValidationError') {

    // Get the first validation that failed
    var failedValidations = Object.keys(error.errors);
    var firstFailed = failedValidations[0];

    // Get validation error message
    errorMessage = error.errors[firstFailed].message;
  } else if (error.code === 11000) {
    // Handle unexpected errors
    errorMessage = 'Duplicate key error';
  } else {
    // Done, send to user
    res.status(403).send({
      success: false,
      message: errorMessage
    });
  }
};

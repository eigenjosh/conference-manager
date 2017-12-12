let Events = require('../models/event')
let Activities = require('../models/activity')
let Notes = require('../models/note')
let Users = require('../models/user')

module.exports = {
  userNotes: {
    path: '/user-notes',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find User Notes'
      Notes.find({ creatorId: req.session.uid })
        .then(notes => {
          res.send(handleResponse(action, notes))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  userEvents: {
    path: '/user-events',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find User Events'
      Users.find({ _id: req.session.uid })
        .then(user => {
          Events.find({ _id: { $in: user.events } })
            .then(events => {
              res.send(handleResponse(action, events))
            })
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  userActivities: {
    path: '/user-activities',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find User Activities'
      Users.find({ _id: req.session.uid })
        .then(user => {
          res.send(handleResponse(action, user.activities))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },

  editUserEvents: {
    path: '/user-events',
    reqType: 'put',
    method(req, res, next) {
      let action = 'Add User Event'
      Users.findOneAndUpdate({ _id: req.session.uid }, req.body)
        .then(user => {
          return res.send(handleResponse(action, { message: 'Successfully updated user events.' }))
        })
        .catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },

  editUserActivities: {
    path: '/user-activities',
    reqType: 'put',
    method(req, res, next) {
      let action = 'Add User Activity'
      Users.findOneAndUpdate({ _id: req.session.uid }, req.body)
        .then(data => {
          return res.send(handleResponse(action, { message: 'Successfully updated user activities.' }))
        })
        .catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },

  adminEvents: {
    path: '/admin-events',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find Events Created By Admin'
      Events.find({ creatorId: req.session.uid })
        .then(events => {
          res.send(handleResponse(action, events))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },

  adminActivities: {
    path: '/admin-activities',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find Activities Created By Admin'
      Activities.find({ creatorId: req.session.uid })
        .then(activities => {
          res.send(handleResponse(action, activities))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  }
}

function handleResponse(action, data, error) {
  var response = {
    action: action,
    data: data
  }
  if (error) {
    response.error = error
  }
  return response
}
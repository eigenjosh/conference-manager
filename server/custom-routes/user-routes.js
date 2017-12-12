let Events = require('../models/event')
let Activities = require('../models/activity')
let Notes = require('../models/note')
let Users = require('../models/user')

module.exports = {
  userNotes: {
    path: '/usernotes',
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
    path: '/userevents',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find User Events'
      Users.find({ _id: req.session.uid })
        .then(user => {
          res.send(handleResponse(action, user.events))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  userActivities: {
    path: '/useractivities',
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

  //TODO: Figure out how to best handle adding/deleting events and activities from array on user

  addUserActivity: {
    path: '/useractivities',
    reqType: 'put',
    method(req, res, next) {
      let action = 'Add User Activity'
      Users.findOneAndUpdate({ _id: req.session.uid }, req.body)
        .then(data => {
          return res.send(handleResponse(action, { message: 'Successfully added activity to user.' }))
        })
        .catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  removeUserActivity: {
    path: '/useractivities/:activityId',
    reqType: 'put',
    method(req, res, next) {
      let action = 'Remove User Activity'
      Users.findOneAndUpdate({ _id: req.session.uid }, req.body)
        .then(data => {
          return res.send(handleResponse(action, { message: 'Successfully removed activity from user.' }))
        })
        .catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },

  addUserEvent: {
    path: '/user-events',
    reqType: 'put',
    method(req, res, next) {
      let action = 'Add User Event'
      Users.findOneAndUpdate({ _id: req.session.uid }, req.body)
        .then(user => {
          return res.send(handleResponse(action, { message: 'Successfully added event to user.' }))
        })
        .catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },

  removeUserEvent: {
    path: '/user-events/:eventId',
    reqType: 'put',
    method(req, res, next) {
      let action = 'Remove User Event'
      Users.find({ _id: req.session.uid })
        .then(user => {
          user.activities = user.activities.filter(function (activity) {
            return !(activity.eventId == req.params.eventId)
          })
          //need another .then before update?
          user.update()
            .then(data => {
              return res.send(handleResponse(action, { message: 'Successfully removed event from user.' }))
            })
        })
        .catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },


  // filter activities by user and event server-side instead of on frontend:
  userActivitiesByEventId: {
    path: '/userevents/:eventId/activities',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find User Activities By Event'
      Users.find({ _id: req.session.uid })
        .then(user => {
          Activities.find({ eventId: req.params.eventId, _id: { $in: user.activities } })
            .then(activities => {
              res.send(handleResponse(action, activities))
            })
            .catch(error => {
              return next(handleResponse(action, null, error))
            })
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  adminEvents: {
    path: '/adminevents',
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
    path: '/adminactivities',
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
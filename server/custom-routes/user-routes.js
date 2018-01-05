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
          console.log('user: ', user[0])
          console.log('user events: ', user[0].events)
          Events.find({ _id: { $in: user[0].events } })
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
          Activities.find({ _id: { $in: user[0].activities } })
            .then(activities => {
              res.send(handleResponse(action, activities))
            })
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  userActivitiesByEventId: {
    path: '/user-events/:eventId/activities',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find User Activities by Event Id'
      Users.find({ _id: req.session.uid })
        .then(user => {
          Activities.find({ _id: { $in: user[0].activities }, eventId: req.params.eventId })
            .then(activities => {
              res.send(handleResponse(action, activities))
            })
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  /*
  editUserEvents: {
    path: '/user-events',
    reqType: 'put',
    method(req, res, next) {
      let action = 'Edit User Events'
      Users.findOneAndUpdate({ _id: req.session.uid }, req.body)
        .then(user => {
          return res.send(handleResponse(action, { message: 'Successfully updated user events.' }))
        })
        .catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  */
  // Unfinished, needs testing:
  deleteUserEvents: {
    path: '/user-events/:eventId',
    reqType: 'put',
    method(req, res, next) {
      let action = 'Remove User Event'
      console.log("begun!");
      Activities.find({ eventId: req.params.eventId })
        .then(activities => {
          var activityIdsToRemove = []
          console.log('activities: ', activities)
          for (var i = 0; i < activities.length; i++) {
            var activity = activities[i]
            if (activity.capacity > 0) {
              activity.capacity--
              activityIdsToRemove.push(activity._id)
              activity.update()
            }
          }
          console.log('activity Ids to remove: ', activities)
          Users.find({ _id: req.session.uid })
            .then(user => {
              console.log('user: ', user[0])
              console.log('user event Ids pre-remove: ', user[0].events)
              console.log('user activity Ids pre-remove: ', user[0].activities)
              user[0].activities = user[0].activities.filter((activityId)=>{
                return !activityIdsToRemove.includes(activityId)
              })
              user[0].events = user[0].events.filter((eventId)=>{
                return !(eventId == req.params.eventId)
              })
              user[0].update()
              console.log('user event Ids post-remove: ', user[0].events)
              console.log('user activity Ids post-remove: ', user[0].activities)
              return res.send(handleResponse(action, { message: 'Successfully updated user events.' }))
            })
            .catch(error => {
              return next(handleResponse(action, null, error))
            })
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

  deleteAdminEvents: {
    path: '/admin-events/:eventId',
    reqType: 'delete',
    method(req, res, next) {
      let action = 'Delete Event Created By Admin'
      var eventData = { "error": "Event data not set." }
      Events.findOneAndRemove({ _id: req.params.eventId })
        .then(event => {
          var eventData = event
          Notes.find({ _id: req.params.eventId })
            .then(notes => {
              console.log('notes: ', notes)
              for (var i = 0; i < notes.length; i++) {
                var note = notes[i]
                console.log('note before update: ', note)
                note.eventId = null
                delete note.eventId
                note.update()
                console.log('note after update: ', note)
              }
            }).then(() => {
              res.send(handleResponse(action, eventData))
            })
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
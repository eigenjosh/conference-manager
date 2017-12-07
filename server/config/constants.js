const actions = {
  create: 'Create',
  update: 'Update',
  remove: 'Remove',
  find: 'Find',
  findAll: 'Find All'
}

const models = {
  event: {
    name: 'Event',
    endpoint: 'events',
    useCustomRoutes: true
  },
  activity: {
    name: 'Activity',
    endpoint: 'activites'
  },
  note: {
    name: 'Note',
    endpoint: 'notes'
  },
  user: {
    name: 'User',
    endpoint: 'users',
    preventDefaultApi: true,
    useCustomRoutes: true
  }
}


module.exports = {
  actions,
  models
}
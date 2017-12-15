// LOCAL DEV VARIABLES
let env = {
	NODE_ENV: 'production',
	PORT: 3000,
	DBPROTOCOL: 'mongodb',
	DBUSERNAME: 'admin',
	DBPASSWORD: 'horseuber',
	DBHOST: 'ds044887.mlab.com:44887', //confer: 'ds044907.mlab.com:44907', confer2: 'ds044887.mlab.com:44887'
	DBNAME: 'confer2', //confer, confer2
	SERVERNAME: 'dev-server'
}

// MAPS env TO ACTUAL ENVIRONMENT
Object.keys(env).forEach(v => {
	process.env[v] = process.env[v] || env[v]
}) 


// MongoDb Connection String Builder
env.CONNECTIONSTRING = `${env.DBPROTOCOL}://${env.DBUSERNAME}:${env.DBPASSWORD}@${env.DBHOST}/${env.DBNAME}`
process.env.CONNECTIONSTRING = env.CONNECTIONSTRING

exports = env
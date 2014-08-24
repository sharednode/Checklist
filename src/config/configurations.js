module.exports = {
	database: 	{
		connectionString: 'mongodb://localhost:27017/Tests',
		collections: ["categories", "users", "logs"]
	},
	logger: 		{
		console: { level:'info', colorize: 'true'},
		file:  { filename: 'checklist.log' },
		mongo: { dbUri: 'mongodb://localhost:27017/Tests', collection: 'logs', level: 'info', capped: true, cappedSize: 10000} //min cappedSize is 4096
	},
	webServer:    {
		port: '3001',
		routes: ['/', '/admin', '/account', '/api/category'] 
	},
	authentication:{
		superUser:
		{
			_id: 'admin',
			email: 'checkList@sharednode.com',
			password: 'sharednode123'
		}
	}
}
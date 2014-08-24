var cluster = require('cluster'),
logger = require('../logger'),
cpuNumber = require('os').cpus().length;


cluster.on('exit', function(worker){
	logger.warn('Worker process die (workerid)', worker.id);
		//Start another worker process
		cluster.fork();
	});

cluster.on('online', function(worker){
	logger.info('Start a worker process (workerid) ', worker.id);
});


function clusterLogic (work){
	// Master Process
	if (cluster.isMaster) {
		logger.info('Cluster master (id)', process.pid);
		logger.info('Forking process (number) ', cpuNumber);
		
		// Create a worker for each CPU
		for (var i = 0; i < cpuNumber; ++i) {
			cluster.fork();
		}

		// Worker Process
	} else {
		work();
	}
};


module.exports = clusterLogic;

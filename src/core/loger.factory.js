"use strict"
const factory=(morgan,rfs,fs,path,env)=>
{
	return new Promise((resolve,reject)=>
	{
		try
		{
			if(env.NODE_ENV==='development')
				return resolve({
					status:true,
					use:true,
					name:'Loger Handler',
					message:'Log file anavailable in development environment, Only stdOut',
					module:morgan('dev')
			})
			const logDirectory=path.join(__dirname,'../../',env.LOGER_PATH||'logs')
			const opt={
				interval:env.LOGER_INTERVAL||'1d',
				path:logDirectory
			}
			const accessLogStream=rfs.createStream('access.log',opt)
			if(!fs.existsSync(logDirectory))
				fs.mkdirSync(logDirectory,{recursive:true})
			return resolve({
				status:true,
				use:true,
				name:'Loger Handler',
				message:'Log file path set to '+logDirectory,
				module:morgan('combined',{stream:accessLogStream})
			})
		}
		catch(error)
		{
			return reject(error)
		}
	})
}
module.exports.factory=(morgan,rfs,fs,path,env)=>
{
	return factory.bind(null,morgan,rfs,fs,path,env)
}

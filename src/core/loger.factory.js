"use strict"
const errorsFactory=(morgan,rfs,fs,path,env,options)=>
{
	return new Promise((resolve,reject)=>
	{
		try
		{
			if(env.NODE_ENV==='development')
				return resolve({
					status:true,
					use:true,
					name:'Log Handler',
					message:'Log file anavailable in development environment, Only stdOut',
					module:morgan('dev')
			})
			const logDirectory=path.join(__dirname,options.path||'../../logs')
			const opt={
				interval:options.interval||'1d',
				path:logDirectory
			}
			const accessLogStream=rfs.createStream('access.log',opt)
			if(!fs.existsSync(logDirectory))
				fs.mkdirSync(logDirectory,{recursive:true})
			return resolve({
				status:false,
				name:'Log Handler',
				message:'',
				module:morgan('combined',{stream:accessLogStream})
			})
		}
		catch(error)
		{
			return reject(error)
		}
	})
}
module.exports.factory=(morgan,rfs,fs,path,env,options)=>
{
	return errorsFactory.bind(null,morgan,rfs,fs,path,env,options)
}
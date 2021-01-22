"use strict"
const factory=(errorhandler,env)=>
{
	return new Promise((resolve,reject)=>
	{
		try
		{
			if(env.NODE_ENV==='development')
				return resolve({
					status:true,
					use:true,
					name:'Error Handler',
					message:'',
					module:errorhandler()
			})
			return resolve({
				status:false,
				name:'Error Handler',
				message:'Not in development environment'
			})
		}
		catch(error)
		{
			return reject(error)
		}
	})
}
module.exports.factory=(errorhandler,env)=>
{
	return factory.bind(null,errorhandler,env)
}

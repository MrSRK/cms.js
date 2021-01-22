"use strict"
const factory=(mongoose,env)=>
{
	return new Promise((resolve,reject)=>
	{
		try
		{
			return mongoose.connect(env.MONGODB_URI,{
				useNewUrlParser:true,
				useUnifiedTopology:true,
				useCreateIndex:true,
				useFindAndModify:false
			})
			.then(connection=>{
				return resolve({
					status:true,
					use:false,
					name:'Mongo Handler',
					message:'Connection Established',
					module:connection
				})
			})
			.catch(error=>
			{
				return reject(error)
			})
		}
		catch(error)
		{
			return reject(error)
		}
	})
}
module.exports.factory=(mongoose,env)=>
{
	return factory.bind(null,mongoose,env)
}

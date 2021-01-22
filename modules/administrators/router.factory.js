"use strict"
const factory=(express,modules)=>
{
	return new Promise((resolve,reject)=>
	{
		try
		{
			const router=express.Router()
			resolve(router)
		}
		catch(error)
		{
			return reject(error)
		}
	})
}
module.exports.factory=(express,modules)=>
{
	return factory.bind(null,express,modules)
}

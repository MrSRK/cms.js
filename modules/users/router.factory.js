"use strict"
const factory=(express,core)=>
{
	return new Promise((resolve,reject)=>
	{
		try
		{
			const router=express.Router()
			router.all('*',(req,res)=>
			{
				return res.status(200).json({status:true})
			})
			return resolve(router)
		}
		catch(error)
		{
			return reject(error)
		}
	})
}
module.exports.factory=(express,core)=>
{
	return factory.bind(null,express,core)
}

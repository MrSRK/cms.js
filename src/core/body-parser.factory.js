"use strict"
const factory=(bodyParser,type)=>
{
	return new Promise((resolve,reject)=>
	{
		try
		{
			if(type==='json')
				return resolve({
					status:true,
					use:true,
					name:'Parser Handler',
					message:'Parser listen JSON',
					module:bodyParser.json({limit: '50mb', extended: true})
			})
			if(type==='url')
				return resolve({
					status:true,
					use:true,
					name:'Parser Handler',
					message:'Parser listen URL',
					module:bodyParser.urlencoded({extended:true})
			})
			return reject({
				status:false,
				name:'Error Handler',
				message:'Unknown type or type not set'
			})
		}
		catch(error)
		{
			return reject(error)
		}
	})
}
module.exports.factory=(bodyParser)=>
{
	return factory.bind(null,bodyParser)
}

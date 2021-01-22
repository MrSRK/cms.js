"use strict"
const factory=(model)=>
{
	return new Promise((resolve,reject)=>
	{
		try
		{
			return resolve({
				status:true,
				use:false,
				name:'Model Handler',
				message:'',
				module:{
					model:model,
					get:function(){},
					post:function(){},
					put:function(){},
					patch:function(){},
					delete:function(){},
					login:function(){},
					signUp:function(){},
					signIn:function(){},
					auth:function(){}
				}
			})
		}
		catch(error)
		{
			return reject(error)
		}
	})
}
module.exports.factory=(model)=>
{
	return factory.bind(null,model)
}

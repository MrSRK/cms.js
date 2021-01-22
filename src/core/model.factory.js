"use strict"
const modelFactory=(mongoose,options)=>
{
	return new Promise((resolve,reject)=>
	{
		try
		{
			if(options.schema)
				json=options.schema
			if(options.parent)
				json=Object.assign({parent:{type:String,ref:options.name,autopopulate:true}},json)
			if(!json.order)
				json=Object.assign({order:{type:Number}},json)
			if(!json.active)
				json=Object.assign({active:{type:Boolean}},json)
			if(options.url)
				json.url={
					template:{type:String},
					model:{type:String},
					function:{type:String},
					_id:{type:String},
					query:{},
					external:{type:String},
					_blank:{type:Boolean}
				}
			// Image
			if(options.thumbnail)
				json.images=[{
					originalname:{type:String},
					destination:{type:String},
					filename:{type:String},
					path:{type:String},
					thumbnail:{
						jpg:{
							name:{type:String},
							path:{type:String}
						},
						png:{
							name:{type:String},
							path:{type:String}
						},
						webp:{
							name:{type:String},
							path:{type:String}
						}
					}
				}]
			// user Profile
			if(options.user)
			{
				json.name={type:String}
				json.email={type:String},
				json.password={type:String}
			}
			const schema=new mongoose.Schema(json,
			{
				timestamps:true,
				versionKey:false
			})
			if(!options.name)
				throw new Error('Model name not set')
			return resolve({model:mongoose.model(options.name,schema),schema:schema})
		}
		catch(error)
		{
			return reject(error)
		}
	})
}
const factory=(mongoose)=>
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
				module:modelFactory.bind(null,mongoose)
			})
		}
		catch(error)
		{
			return reject(error)
		}
	})
}
module.exports.factory=(mongoose)=>
{
	return factory.bind(null,mongoose)
}

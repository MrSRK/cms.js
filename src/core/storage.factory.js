"use strict"
const errorsFactory=(multer,fs,path)=>
{
	return new Promise((resolve,reject)=>
	{
		try
		{
			
		}
		catch(error)
		{
			return reject(error)
		}
	})
}
module.exports.factory=(multer,fs,path)=>
{
	return errorsFactory.bind(null,multer,fs,path)
}

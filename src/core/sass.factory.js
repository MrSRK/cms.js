"use strict"
const errorsFactory=(sassmiddleware,env,path)=>
{
	return new Promise((resolve,reject)=>
	{
		try
		{
			const options={
                outputStyle:env.SASS_OUTPUT||'compressed',
                src:path.join(__dirname,'../../'+env.SASS_SRC),
                dest: path.join(__dirname,'../../'+env.SASS_DEST),
				maxAge:parseInt(env.SASS_MAXAGE),
				force:true
			}
			return resolve({
				status:true,
				use:true,
				name:'SASS Handler',
				message:'Ready to put css at '+env.SASS_DEST,
				module:sassmiddleware(options)
			})
		}
		catch(error)
		{
			return reject(error)
		}
	})
}
module.exports.factory=(sassmiddleware,env,path)=>
{
	return errorsFactory.bind(null,sassmiddleware,env,path)
}

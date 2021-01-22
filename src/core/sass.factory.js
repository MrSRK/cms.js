"use strict"
const factory=(sassmiddleware,env,path)=>
{
	return new Promise((resolve,reject)=>
	{
		try
		{
			const options={
                outputStyle:env.SASS_OUTPUT||'compressed',
                src:path.join(__dirname,'../../',env.SASS_SRC||'public/sass'),
                dest: path.join(__dirname,'../../',env.SASS_DEST||'public/css'),
				maxAge:parseInt(env.SASS_MAXAGE||null),
				force:true
			}
			return resolve({
				status:true,
				use:true,
				name:'SASS/CSS Handler',
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
	return factory.bind(null,sassmiddleware,env,path)
}

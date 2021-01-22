"use strict"
const factory=(express,fs,path,env,core)=>
{
	return new Promise((resolve,reject)=>
	{
		try
		{
			let views=[]
			let routes=[]
			views.push(path.join(__dirname,'../../',env.PUG_VIEWS||'views/'))
			const mpath=path.join(__dirname,'../../',env.APP_MODULES||'modules/')
			return fs.access(mpath,error=>
			{
				if(error)
					return reject(error)
				return fs.readdir(mpath,(error,files)=>
				{
					if(error)
						return reject(error)
					for(let file of files)
					{
						routes[file]=require(path.join(mpath,file,'/router.factory')).factory(express,core)
						views.push(path.join(mpath,file,'/views/'))
					}
					return resolve({views:views,routes:routes})
				})
			})
		}
		catch(error)
		{
			return reject(error)
		}
	})
}
module.exports.factory=(express,fs,path,env,core)=>
{
	return factory.bind(null,express,fs,path,env,core)
}

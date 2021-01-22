"use strict"
const factory=(multer,fs,path,env,root,fileName)=>
{
	return new Promise((resolve,reject)=>
	{
		try
		{
			return resolve({
				status:true,
				use:false,
				emped:'saveFile',
				name:'Store Handler',
				message:'Storage function empeded to app [array app.saveFile(root,name)]',
				module:multer({storage:multer.diskStorage(
				{
					destination:(req,file,next)=>
					{
						const filepath=path.join(__dirname,'../../',env.STORAGE_ROOT,root)
						return fs.exists(filepath,exists=>
						{
							if(!exists)
								return fs.mkdir(filepath,{recursive:true},error=>
								{
									if(error)
										throw(error)
									return next(null,filepath)
								})
							else
								return next(null,filepath)
						})
					},
					filename:(req,file,next)=>
					{
						const filepath=path.join(__dirname,'../../',env.STORAGE_ROOT,root)
						let ext=''
						if(file.originalname.lastIndexOf('.')>=0)
							ext='.'+file.originalname.split('.').reverse()[0]
						if(typeof req.files==undefined||!req.files)
							req.files={}
						var name=Date.now()+'-'+ext
						file.filename=name
						file.path=filepath+'/'+name
						req.files[name]=file
						return next(null,name)
					}
				})}).single(fileName)
			})
		}
		catch(error)
		{
			return reject(error)
		}
	})
}
module.exports.factory=(multer,fs,path,env)=>
{
	return factory.bind(null,multer,fs,path,env)
}

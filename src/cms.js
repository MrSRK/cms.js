const fs=require('fs')
const path=require('path')
const chalk = require('chalk')
const express=require('express')
const errorhandler=require('errorhandler')
const morgan=require('morgan')
const rfs=require('rotating-file-stream')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const sassmiddleware=require('node-sass-middleware')
const multer=require('multer')

const app=express()


module.exports=env=>
{
	const errors=require('./core/errors.factory').factory(errorhandler,env)
	const loger=require('./core/loger.factory').factory(morgan,rfs,fs,path,env)
	const database=require('./core/database.factory').factory(mongoose,env)
	const parser=require('./core/body-parser.factory').factory(bodyParser)
	const sass=require('./core/sass.factory').factory(sassmiddleware,env,path)
	//To use
	const storage=require('./core/storage.factory').factory(multer,fs,path,env)
	const loader=require('./core/loader.factory').factory(express,fs,path,env)
	const model=require('./core/model.factory').factory(mongoose)
	const controller=require('./core/controller.factory').factory()
	Promise
	.all([
		errors(),
		loger(),
		database(),
		parser('json'),
		parser('url'),
		sass(),
		storage(),
		model()
	])
	.then(modules=>
	{
		let mods=[]
		console.log(chalk.red('-- Core Module Loader'))
		for(let module of modules)
		{
			process.stdout.write(`${chalk.blue('\t-- Module')} [${chalk.yellow(module.name)}\t]\t`)
			process.stdout.write(`${chalk.blue('Status')}: [ ${module.status?chalk.bgGreen(module.status):chalk.bgRed(module.status)} ] `)
			process.stdout.write(`Module${module.status?'':' not'} loaded`)
			process.stdout.write(module.message?chalk.gray(': ('+module.message+')'):'')
			process.stdout.write('\n')
			if(!module.status)
				continue
			if(module.use)
				app.use(module.module)
			if(module.emped)
				app[module.emped]=module.module
			mods.push(module.module)
		}
		return mods
	})
	.then(modules=>
	{
		console.log(chalk.red('-- Module Loader'))
		return loader()
		.then(data=>
		{
			let routers=[]
			for(route in data.routes)
			{
				routers.push(data.routes[route]())
				console.log('\t',chalk.green('✔ '),chalk.blue('Module'),' ',chalk.yellow(route))
			}
			return Promise.all(routers)
			.then(routes=>
			{
				for(route of routes)
					app.use(route)
				return data
			})
			.then(data=>
			{
				console.log(chalk.red('-- Views Directories Loader'))
				for(view of data.views)
					console.log('\t',chalk.green('◎ '),chalk.magenta('Views'),' ',chalk.yellow(view))
				app.set('views',data.views)
				return modules
			})
			.catch(error=>
			{
				console.log('\t',chalk.red('✖  Error'))
				console.log('\t',error)
				return error
			})
		})
	})
	.then(modules=>
	{
		return app.listen(env.EXPRESS_PORT,_=>{
			console.log(chalk.red('-- Application Start'))
			console.log('\t',chalk.green('◎  Listening Port:'),'\t',chalk.blue(80))
			console.log('\t',chalk.green('◎  Core Modules load:'),'\t',chalk.blue(modules.length))
		})
	})
	.catch(error=>
	{
		console.log(chalk.red('--Error:'))
		console.log(error)
	})
}
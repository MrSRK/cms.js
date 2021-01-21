const fs=require('fs')
const path=require('path')
const chalk = require('chalk')
const dotenv=require('dotenv')
const express=require('express')
const errorhandler=require('errorhandler')
const morgan=require('morgan')
const rfs=require('rotating-file-stream')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const sassmiddleware=require('node-sass-middleware')
const multer=require('multer')

dotenv.config()
const app=express()

const errors=require('./core/errors.factory').factory(errorhandler,process.env)
const loger=require('./core/loger.factory').factory(morgan,rfs,fs,path,process.env)
const database=require('./core/database.factory').factory(mongoose,process.env)
const parser=require('./core/body-parser.factory').factory(bodyParser)
const sass=require('./core/sass.factory').factory(sassmiddleware,process.env,path)
//To use
const storage=require('./core/storage.factory').factory(multer,fs,path,process.env)
Promise
.all([
	errors(),
	loger(),
	database(),
	parser('json'),
	parser('url'),
	sass(),
	storage()
])
.then(modules=>
{
	for(let module of modules)
	{
		process.stdout.write(`${chalk.blue('Module')} [${chalk.yellow(module.name)}\t]\t`)
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
	}
})
.catch(error=>
{
	console.log(chalk.red('--Error:'))
	console.log(error)
})
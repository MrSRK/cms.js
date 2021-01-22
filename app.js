"use strict"
const dotenv=require('dotenv')
const cms=require('./src/cms')
try
{
	dotenv.config()

	cms(process.env)
}
catch(error)
{
	console.log(error)
}
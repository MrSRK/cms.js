"use strict"
class Config
{
	instance=null
	pug=[
		{
			route:"/",
			view:'home'
		},
		{
			route:"/contact",
			view:'contact'
		}
		,
		{
			route:"/administrator",
			view:'home-admin'
		},
		{
			route:"/administrator/login",
			view:'login'
		},
		{
			route:"/administrator/logout",
			view:'logout'
		},
		{
			route:"/administrator/register",
			view:'register'
		},
		{
			route:"/administrator/:model",
			view:'table'
		},
		{
			route:"/administrator/:model/new",
			view:'new'
		},
		{
			route:"/administrator/:model/:_id",
			view:'edit'
		},
		{
			route:"/:model",
			view:'list'
		},
		{
			route:"/:model/:_id",
			view:'show'
		}
	]
	routes=[
		{
			route:'/js/lib',
			src:'/node_modules/angular'
		},
		{
			route:'/js/lib',
			src:'/node_modules/ng-webworker/src'
		},
		{
			route:'/js/lib',
			src:'/node_modules/popper.js/dist/umd'
		},
		{
			route:'/js/lib',
			src:'/node_modules/bootstrap/dist/js'
		},
		{
			route:'/js/lib',
			src:'/node_modules/jquery/dist'
		},
		{
			route:'/js/lib',
			src:'/node_modules/angular-cookies'
		},
		{
			route:'/webfonts',
			src:'/node_modules/@fortawesome/fontawesome-free/webfonts'
		},
		{
			route:'/favicon.ico',
			src:'/public/images/favicon.ico'
		},
		{
			route:'/robots.txt',
			src:'/public/txt/robots.txt'
		},
		{
			route:'/images',
			src:'/public/images'
		},
		,
		{
			route:'/img',
			src:'/uploads/images'
		},
		{
			route:'/thumbnail/',
			src:'/uploads/images'
		},
		{
			route:'/js',
			src:'/public/js'
		}
	]
	security=
	{
        csrf:{
            angular:true,
            cookie:
            {
                options:
                {
                	httpOnly: false,
					secure: true,
                 	SameSite:'Strict'
                }
            }
        },
        xframe:"SAMEORIGIN",
        csp:
        {
            policy:
            [
                "default-src 'self'",
                "connect-src 'self' *.google-analytics.com",
                "img-src 'self' data: *.google-analytics.com",
                "script-src 'self' 'unsafe-inline' 'unsafe-eval' *.google-analytics.com",
                "style-src 'self' 'unsafe-inline' *.googleapis.com",
				"font-src 'self' *.gstatic.com"
            ]

        },
        p3p:null,
        hsts:
        {
            maxAge:31536000,
            includeSubDomains:true,
            preload:true
        },
        xssProtection:true,
        nosniff:true,
        referrerPolicy:"same-origin"
	}
	multer=
	{
		root:process.env.STORAGE_ROOT||'uploads/',
		subroot:'',
		name:'file'
	}
	constructor()
	{
	}
}
module.exports=Config
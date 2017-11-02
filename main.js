const electron = require("electron");
const {app, BrowserWindow, dialog} = electron;
const path = require("path");
const url = require("url");
const isDev = () => process.env.NODE_ENV === 'development';
process.env['APP_PATH'] = app.getAppPath();
const directory = isDev()?process.cwd().concat('/app'):process.env.APP_PATH;

var server = require('./server/app');
var Constants = require("./server/helpers/Constants.js");
var Helper = require("./server/helpers/helper");
var app_config = app.getAppPath()+'/server/app.json';

global.APP_PATH = app.getAppPath();
let win

<<<<<<< HEAD
function createWindow(options,callback){

	options = options || {};
	var config = {
		icon:path.join(directory,'/assests/icon.png'),
		width:options.width || 800,
		height:options.height || 600
	};
	for(var key in options){
		if(!(key in config)){
			config[key] = options[key];
		}
	}
	win = new BrowserWindow(config);
=======
function createWindow(){
	win = new BrowserWindow({
		icon:__dirname+'/assests/icon.png',
		width:800,
		height:600
	});
>>>>>>> ee868d777be0b4941377f5f47b106e53f609292b
	win.loadURL(url.format({
		pathname:path.join(directory,options.url || 'public/index.html'),
		protocol:'file',
		slashes:true
	}));
	//Open devtools
	win.webContents.openDevTools();

	win.on("closed",()=>{
		win = null;
<<<<<<< HEAD
		app.quit();
=======
>>>>>>> ee868d777be0b4941377f5f47b106e53f609292b
	})
	const ses = win.webContents.session;

	win.once('ready-to-show', () => {
	 	win.show();
	});
<<<<<<< HEAD
	if(callback!=undefined){
		callback(win);
	}
	return win;
=======
>>>>>>> ee868d777be0b4941377f5f47b106e53f609292b
}

app.on("ready",function(){

	Helper.readFile(app_config)
	.then(function(config){
		server(config)
		.then(function(){
			createWindow();
		},function(err){
			dialog.showMessageBox(win,{
				title:'Error',
				message:app_config
			});
		});	
	},function(err){
	    if(err){
	    	createWindow({
	    		url:'public/error.html',
	    		backgroundColor:"#f85662"
	    	},function(){
				dialog.showMessageBox(win,{
					title:'Error al leer archivo',
					message:app_config
				});
	    	});
	    }
	});
});
app.on("window-all-closed",()=>{
	if(process.platform !== 'drawin'){
		app.quit()
	}
})
app.on("active",()=>{
	if(win===null){
<<<<<<< HEAD
		//createWindow()
	}
})
exports.directory = directory;
exports.Msg = function(config){
	dialog.showMessageBox(win,config);
};
=======
		createWindow()
	}
})
>>>>>>> ee868d777be0b4941377f5f47b106e53f609292b

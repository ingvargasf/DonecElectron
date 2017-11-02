/**
* @Helpers: Funciones para reutilizar
*/
var pluralizeES= require('pluralize-es');
var pluralizeEN = require('pluralize');
var capitalize = require('string-capitalize');
var jsonfile = require('jsonfile')
const fs = require("fs");


function getFilesizeInBytes(filename) {
    const stats = fs.statSync(filename)
    const fileSizeInBytes = stats.size
    return fileSizeInBytes
}

module.exports = {
	CONFIG_DB:"./database/ManagerDB",
	APP_CONFIG:'./server/app.json',
	isEmpty:function(obj){
	  var empty=true;
	  if(obj!=undefined){
	  	for(var key in obj){
		    if(obj[key]!=undefined){ empty=false; break;}
		}
	  }
	  return empty;
	},
	pluralize:function (lang,val){
		var _val = val;
		switch(lang){
			case "es":
				_val=pluralizeES(_val);
			break;
			case "en":
				_val=pluralizeEN(_val);
			break;
		}
		return _val;
	},
	capitalize:function(str){
		return capitalize(str);
	},
	readFile:function(file){

		return new Promise(function(resolve,reject){
			if (!fs.existsSync(file)) {
			    reject("El archivo no existe.");
			    return;
			}else{
				if(getFilesizeInBytes(file)==0){
					console.log(getFilesizeInBytes(file)==0);
					reject("El archivo está vacio.");
					return;
				}
			}	
			try{
				jsonfile.readFile(file,function(err,obj){
					if(err){ reject(err); return;}
					resolve(obj);
				});
				console.log("read file: ",file);
			}catch(err){
				console.log("faild read file: ",file);
				reject(err);	
			}
		});
	},
	writeFile:function(file,obj){
		if (!fs.existsSync(file)) {
		    reject("El archivo no existe.");
		    return;
		}
		return new Promise(function(resolve,reject){
			console.log("write file:",file);
			try{
				jsonfile.writeFile(file,obj,function(err){
					if(err){ reject(err); return;}
					resolve();
				});
			}catch(err){
				console.log("faild read file: ",file);
				reject(err);	
			}
		});
	},
	getFilesize:getFilesizeInBytes 
}
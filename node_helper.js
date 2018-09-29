/* Magic Mirror
 * Node Helper: MMM-SoundBites
 *
 * By
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");

module.exports = NodeHelper.create({

	init: function() {
		console.log("Initializing MMM-SoundBites module helper ...");
	},

	start: function() {
		this.extraRoutes();
	},

	extraRoutes: function() {
		this.expressApp.get("/music", function(req, res) {
			var fs = require("fs");
			var path = require("path");

			var files = [];

			fs.readdir("modules/MMM-SoundBites/music", (err, data) => {
				for(i = 0; i < data.length; i++){
					if(path.extname(data[i]) === ".mp3"){
						files.push(data[i]);
					}
				}

				res.send(files);
			});
		});
	}

});

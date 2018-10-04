/* global Module */

/* Magic Mirror
 * Module: MMM-SoundBites
 *
 * By
 * MIT Licensed.
 */

Module.register("MMM-SoundBites", {
	// Default module config.
	defaults:
	{
		startingVolume: 50,
		fadeDuration: 1,
		playDelay: 5 * 60
	},

	requiresVersion: "2.1.0", // Required version of MagicMirror

	start: function() {
		this.songs = [];
		this.playIndex = 0;
		this.loaded = false;
		this.suspended = false;
		this.stopped = true;
	},

	getDom: function() {
		var wrapper = document.createElement("div");
		var audioElement = document.createElement("audio");
		var musicWrapper = document.createElement("div");
		var currentlyPlaying = document.createElement("div");

		musicWrapper.className = "music";
		currentlyPlaying.className = "playing";

		wrapper.appendChild(audioElement);
		wrapper.appendChild(musicWrapper);

		musicWrapper.appendChild(currentlyPlaying);

		$(currentlyPlaying).hide();

		var startingVolume = this.config.startingVolume / 100; // between 0.0 and 1.0
		var fadeDuration = this.config.fadeDuration * 1000; // in microseconds

		if (this.loaded && (!this.suspended || !this.stopped)) {
			$(currentlyPlaying).html(this.songs[this.playIndex]).fadeIn(fadeDuration);
			$(audioElement).attr("src", "modules/MMM-SoundBites/music/" + this.songs[this.playIndex]);
			$(audioElement).prop("volume", (startingVolume));
			$(audioElement).trigger("load");
			$(audioElement).trigger("play");
			$(audioElement).on("ended", function() {
			   $(currentlyPlaying).fadeOut(fadeDuration);
			});
		}

		return wrapper;
	},

	getScripts: function() {
		return ["modules/MMM-SoundBites/js/jquery.js", "modules/MMM-SoundBites/js/jquery-ui.min.js"];
	},

	getStyles: function () {
		return [
			"MMM-SoundBites.css",
		];
	},

	/* suspend()
	 * This method is called when a module is hidden.
	 */
	suspend: function () {
		if (!this.suspended) {
			this.suspended = true;
			this.stop();
		}
	},

	/* resume()
	 * This method is called when a module is shown.
	 */
	resume: function () {
		if (this.suspended) {
			this.suspended = false;
			this.play();
		}
	},


	// Load translations files
	getTranslations: function() {
		return {
			en: "translations/en.json",
			es: "translations/es.json"
		};
	},

	notificationReceived: function (notification, payload, sender)
	{
		if (sender === undefined && notification === "DOM_OBJECTS_CREATED")
		{
			// start
			this.getSongs(this.processSongs);
		}
		else if (notification === "POWER_SAVE") {
			if (payload === true) {
				this.stop();
			}
			else if (payload === false && !this.suspended && this.stopped) {
				var self = this;
				setTimeout(function() {
					self.play();
				}, 2000);
			}

		}
	},

	playAnother: function ()
	{
		this.playIndex = Math.floor(Math.random() * this.songs.length);
		this.stopped = false;
		this.updateDom();
	},

	play: function ()
	{
		this.playAnother();
		// set the timer schedule
		let delay = this.config.playDelay * 1000; // in microseconds
		var self = this;
		this.interval = setInterval(function () {
			self.playAnother();
		}, delay);
	},

	stop: function ()
	{
		clearInterval(this.interval);
		this.stopped = true;
		this.updateDom();
	},

	getSongs: function (callback)
	{
		var self = this;
		$.ajax(
			{
				url: "/music",
				type: "GET",
				success: function (data) {
					callback.call(self, data);
				}
			}
		);
	},

	processSongs: function (result)
	{
		if (result && result.length > 0)
		{
			this.songs = result;
			this.loaded = true;
			this.play();
		}
	}

});

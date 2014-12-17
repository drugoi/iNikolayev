//iNikolayev background script
(function() {
	var self = {
		//Get saved setting and initialize GUI items
		init: function() {
			chrome.storage.sync.get({
				activate: true,
				contextmenu: true
			}, function(items) {
				self.updateContextMenu(items);
			});
			chrome.runtime.onInstalled.addListener(self.onInstalled);
			chrome.runtime.onMessage.addListener(self.onMessageReceived);
		},
		//On first install
		onInstalled: function(details) {
			if (details.reason == "install") {
				self.openOptions();
			}
		},
		//On message received
		onMessageReceived: function(message, sender, sendResponse) {
			//Option page saved
			if (message.type == "options") {
				self.updateContextMenu(message.items);
			}
		},
		//Update GUI
		updateContextMenu: function(items) {
			if (items.contextmenu && items.activate) {
				chrome.contextMenus.create({
					"id": "iNikolayevInactivate",
					"title": chrome.i18n.getMessage("contextMenuInactivate"),
					"contexts": ["page"],
					"onclick": function(e) {
						self.openOptions();
					}
				});
			} else {
				chrome.contextMenus.remove("iNikolayevInactivate");
			}
		},
		//Opens the options tab
		openOptions: function() {
			var optionsUrl = chrome.extension.getURL('inikolayev/options/options.html');
			chrome.tabs.query({
				url: optionsUrl
			}, function(tabs) {
				if (tabs.length) {
					chrome.tabs.update(tabs[0].id, {
						active: true
					});
					chrome.windows.update(tabs[0].windowId, {
						focused: true
					});
				} else {
					chrome.tabs.create({
						url: optionsUrl
					});
				}
			});
		}
	};
	self.init();
})();
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-15665299-28']);
_gaq.push(['_trackPageview']);
(function() {
	var ga = document.createElement('script');
	ga.type = 'text/javascript';
	ga.async = true;
	ga.src = 'https://ssl.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(ga, s);
})();
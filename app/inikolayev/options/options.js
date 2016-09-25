(function() {
  self = {
    //Bind events
    init: function() {
      document.title = chrome.i18n.getMessage("optionsHeader");
      var langs = ["optionsPageActivate", "optionsPageContextLink"];
      for (var i = 0; i < langs.length; i++) {
        var message = chrome.i18n.getMessage(langs[i]);
        document.getElementById(langs[i]).textContent = message;
      }
      document.addEventListener('DOMContentLoaded', self.restoreOptions);
      document.getElementById('chkActivate').addEventListener('change', self.saveOptions);
      document.getElementById('chkUseContextMenu').addEventListener('change', self.saveOptions);
    },
    //Save to storage
    saveOptions: function() {
      var activate = document.getElementById('chkActivate').checked;
      var contextmenu = document.getElementById('chkUseContextMenu').checked;
      var items = {
        activate: activate,
        contextmenu: contextmenu
      };
      chrome.storage.sync.set(items, function() {
        self.setStatus(activate);
        setTimeout(function() {}, 750);
      });
      //Notify bg.js
      chrome.runtime.sendMessage({
        type: "options",
        items: items
      }, function(response) {});
    },
    //Load from storage
    restoreOptions: function() {
      chrome.storage.sync.get({
        activate: true,
        contextmenu: true
      }, function(items) {
        document.getElementById('chkActivate').checked = items.activate;
        document.getElementById('chkUseContextMenu').checked = items.contextmenu;
        self.setStatus(items.activate);
      });
    },
    //Update page with status
    setStatus: function(active) {
      var url;
      if (active) {
        url = chrome.extension.getURL('inikolayev/options/on.jpg');
      } else {
        url = chrome.extension.getURL('inikolayev/options/off.jpg');
      }
      document.querySelector('.options__image').src = url;
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

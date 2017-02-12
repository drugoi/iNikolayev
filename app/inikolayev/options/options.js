((() => {
  self = {
    // Bind events
    init() {
      document.title = chrome.i18n.getMessage('optionsHeader');
      const langs = ['optionsPageActivate', 'optionsPageContextLink'];
      for (let i = 0; i < langs.length; i++) {
        const message = chrome.i18n.getMessage(langs[i]);
        document.getElementById(langs[i]).textContent = message;
      }
      document.addEventListener('DOMContentLoaded', self.restoreOptions);
      document.getElementById('chkActivate').addEventListener('change', self.saveOptions);
      document.getElementById('chkUseContextMenu').addEventListener('change', self.saveOptions);
    },
    // Save to storage
    saveOptions() {
      const activate = document.getElementById('chkActivate').checked;
      const contextmenu = document.getElementById('chkUseContextMenu').checked;
      const items = {
        activate,
        contextmenu,
      };
      chrome.storage.sync.set(items, () => {
        self.setStatus(activate);
        setTimeout(() => {}, 750);
      });
      // Notify bg.js
      chrome.runtime.sendMessage({
        type: 'options',
        items,
      }, (response) => {});
    },
    // Load from storage
    restoreOptions() {
      chrome.storage.sync.get({
        activate: true,
        contextmenu: true,
      }, (items) => {
        document.getElementById('chkActivate').checked = items.activate;
        document.getElementById('chkUseContextMenu').checked = items.contextmenu;
        self.setStatus(items.activate);
      });
    },
    // Update page with status
    setStatus(active) {
      let url;
      if (active) {
        url = chrome.extension.getURL('inikolayev/options/on.jpg');
      } else {
        url = chrome.extension.getURL('inikolayev/options/off.jpg');
      }
      document.querySelector('.options__image').src = url;
    },
  };
  self.init();
}))();

const _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-15665299-28']);
_gaq.push(['_trackPageview']);

((() => {
  const ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  const s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
}))();

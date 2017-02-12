// iNikolayev background script
((() => {
  const self = {
    // Get saved setting and initialize GUI items
    init() {
      chrome.storage.sync.get({
        activate: true,
        contextmenu: true,
      }, (items) => {
        self.updateContextMenu(items);
      });
      chrome.runtime.onInstalled.addListener(self.onInstalled);
      chrome.runtime.onMessage.addListener(self.onMessageReceived);
    },
    // On first install
    onInstalled(details) {
      if (details.reason == 'install') {
        self.openOptions();
      }
    },
    // On message received
    onMessageReceived(message, sender, sendResponse) {
      // Option page saved
      if (message.type == 'options') {
        self.updateContextMenu(message.items);
      }
    },
    // Update GUI
    updateContextMenu(items) {
      if (items.contextmenu && items.activate) {
        chrome.contextMenus.create({
          'id': 'iNikolayevInactivate',
          'title': chrome.i18n.getMessage('contextMenuInactivate'),
          'contexts': ['page'],
          'onclick'(e) {
            self.openOptions();
          },
        });
      } else {
        chrome.contextMenus.remove('iNikolayevInactivate');
      }
    },
    // Opens the options tab
    openOptions() {
      const optionsUrl = chrome.extension.getURL('inikolayev/options/options.html');
      chrome.tabs.query({
        url: optionsUrl,
      }, (tabs) => {
        if (tabs.length) {
          chrome.tabs.update(tabs[0].id, {
            active: true,
          });
          chrome.windows.update(tabs[0].windowId, {
            focused: true,
          });
        } else {
          chrome.tabs.create({
            url: optionsUrl,
          });
        }
      });
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

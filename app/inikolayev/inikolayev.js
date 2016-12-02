var active = true;
//Content script, image replacer
chrome.storage.sync.get({
  activate: true
}, function(items) {
  active = items.activate;
  if (active) {
    // iNikolayev
    var self = {
      iNikolayevImgs: ['https://pp.vk.me/c622828/v622828098/45819/VOkbW4sFnpg.jpg'],
      //Handles all images on page with an interval of time
      handleImages: function(lstImgs, time) {
        var siteImages = document.getElementsByTagName('img');
        var siteImagesCount = siteImages.length;
        for (var i = 0; i < siteImagesCount; i++) {
          var currentImg = siteImages[i];
          var currentSrc = currentImg.src;
          self.replaceImages(lstImgs, currentImg, currentSrc);
        }
        // Keep replacing
        if (time > 0) {
          setTimeout(function() {
            self.handleImages(lstImgs, time);
          }, time);
        }
      },
      replaceImages: function(lstImgs, currentImg, currentSrc) {
        // Skip if image is already replaced
        if (lstImgs.indexOf(currentSrc) == -1) {
          var imageHeight = currentImg.clientHeight;
          var imageWidth = currentImg.clientWidth;
          // If image loaded
          if (imageHeight > 0 && imageWidth > 0) {
            self.handleImg(currentImg, lstImgs);
          }
        } else {
          // Replace image when loaded
          currentImg.onload = function() {
            if (lstImgs.indexOf(currentSrc) == -1) {
              self.handleImg(currentImg, lstImgs);
            }
          };
        }
      },
      //Replace one image
      handleImg: function(item, lstImgs) {
        item.onerror = function() {
          self.handleBrokenImg(item, lstImgs);
        };
        self.setRandomImg(item, lstImgs);
      },
      //Set a random image from lstImgs to item
      setRandomImg: function(item, lstImgs) {
        var imageWidth = item.clientWidth;
        var imageHeight = item.clientHeight;
        item.style.width = imageWidth + 'px';
        item.style.height = imageHeight + 'px';
        item.style.objectFit = 'cover'
        item.src = lstImgs[Math.floor(Math.random() * lstImgs.length)];
      },
      //Removed broken image from lstImgs, run handleImg on item
      handleBrokenImg: function(item, lstImgs) {
        var brokenImage = item.src;
        var index = lstImgs.indexOf(brokenImage);
        if (index > -1) {
          lstImgs.splice(index, 1);
        }
        _gaq.push(['_trackEvent', brokenImage, 'broken-image']);
        self.setRandomImg(item, lstImgs);
      }
    };
    // Start when page is load
    document.addEventListener('DOMContentLoaded', self.handleImages(self.iNikolayevImgs, 3000));
    // end iNikolayev
  }
});
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

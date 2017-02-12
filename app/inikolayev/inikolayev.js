let active = true;
// Content script, image replacer
chrome.storage.sync.get({
  activate: true,
}, (items) => {
  active = items.activate;
  if (active) {
    // iNikolayev
    const self = {
      iNikolayevImgs: ['http://www.livestory.com.ua/images/igor_nikolaev_2.jpg', 'http://kto-zhena.ru/wp-content/uploads/2014/07/RIA-684655-Originalc.jpg', 'http://www.newsmusic.ru/uploads/i/n/inikolaev.jpg', 'http://myslo.ru/Content/OldNews/art_images/874/dg_005.jpg', 'http://img.zaycev.fm/photos/000/318/707/original/igor-nikolaev.jpg', 'http://www.mega-stars.ru/img/starsnews/pictures/2013.11.08-belij_royal_i_bassejn_na_chetvyortom_etazhe..jpg', 'http://www.kleo.ru/items/planetarium/img/img_7466_23171325.jpg', 'http://donbass.ua/multimedia/images/news/original/2012/10/05/nikolaev_dtp.jpg', 'http://minusovochka.com/css/site/images/nikolaev.jpg', 'http://s019.radikal.ru/i622/1302/00/9c40bac9dea9.jpg', 'http://www.telesem.ru/images/stories/784/hope.jpg', 'https://upload.wikimedia.org/wikipedia/commons/5/55/RIAN_archive_876389_%22Flowers_from_a_Star%22_holiday_event.jpg', 'http://s5.pikabu.ru/images/big_size_comm/2014-12_2/14178893096531.jpg', 'http://hochu.ua/images/articles/46526_89067.jpg', 'http://newsofstars.ru/wp-content/uploads/2012/10/niqolaev.jpg', 'http://infinitiv.ru/assets/images/artists/nikolaev/artist/nikolaev-artist_b.jpg', 'http://www.kleo.ru/img/items/nikolaev_igor.jpg', 'http://img.ntv.ru/home/news/20131121/nikolaev.jpg', 'http://fan-club-alla.ru/wp-content/uploads/2010/10/8c94853892f7.jpg', 'http://t1.moskva.fm/uimg/artists/source/b5/b59a7678469b73a6ad85204e730d123f.jpeg', 'http://debonton.ru/images/stories/m34/z99.jpg', 'http://www.buro247.ru/local/images/buro/img_8259_jpg_1319406637.jpg', 'http://i.ytimg.com/vi/uVnxHRalzvE/maxresdefault.jpg', 'http://i.ytimg.com/vi/oM5J4v0wFUI/maxresdefault.jpg', 'http://0.avatars.yandex.net/get-music-content/3eee6aa1.p.167031/m1000x1000', 'http://i.imgur.com/gBReaAT.jpg', 'http://i.imgur.com/3drDnRt.jpg', 'http://i.imgur.com/xQ3UC5q.jpg'],
      // Handles all images on page with an interval of time
      handleImages(lstImgs, time) {
        const siteImages = document.getElementsByTagName('img');
        const siteImagesCount = siteImages.length;
        for (let i = 0; i < siteImagesCount; i++) {
          const currentImg = siteImages[i];
          const currentSrc = currentImg.src;
          self.replaceImages(lstImgs, currentImg, currentSrc);
        }
        // Keep replacing
        if (time > 0) {
          setTimeout(() => {
            self.handleImages(lstImgs, time);
          }, time);
        }
      },
      replaceImages(lstImgs, currentImg, currentSrc) {
        // Skip if image is already replaced
        if (!lstImgs.includes(currentSrc)) {
          const imageHeight = currentImg.clientHeight;
          const imageWidth = currentImg.clientWidth;
          // If image loaded
          if (imageHeight > 0 && imageWidth > 0) {
            self.handleImg(currentImg, lstImgs);
          }
        } else {
          // Replace image when loaded
          currentImg.onload = () => {
            if (!lstImgs.includes(currentSrc)) {
              self.handleImg(currentImg, lstImgs);
            }
          };
        }
      },
      // Replace one image
      handleImg(item, lstImgs) {
        item.onerror = () => {
          self.handleBrokenImg(item, lstImgs);
        };
        self.setRandomImg(item, lstImgs);
      },
      // Set a random image from lstImgs to item
      setRandomImg(item, lstImgs) {
        const imageWidth = item.clientWidth;
        const imageHeight = item.clientHeight;
        item.style.width = `${imageWidth}px`;
        item.style.height = `${imageHeight}px`;
        item.style.objectFit = 'cover';
        item.style.objectPosition = '0 0';
        item.src = lstImgs[Math.floor(Math.random() * lstImgs.length)];
      },
      // Removed broken image from lstImgs, run handleImg on item
      handleBrokenImg(item, lstImgs) {
        const brokenImage = item.src;
        const index = lstImgs.indexOf(brokenImage);
        if (index > -1) {
          lstImgs.splice(index, 1);
        }
        _gaq.push(['_trackEvent', brokenImage, 'broken-image']);
        self.setRandomImg(item, lstImgs);
      },
    };
    // Start when page is load
    document.addEventListener('DOMContentLoaded', self.handleImages(self.iNikolayevImgs, 3000));
    // end iNikolayev
  }
});
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

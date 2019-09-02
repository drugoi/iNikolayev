let active = true;
// Content script, image replacer
chrome.storage.sync.get(
    {
      activate: true,
    },
    (items) => {
      active = items.activate;
      if (active) {
      // iNikolayev
        const self = {
          images: [
            'http://www.livestory.com.ua/images/igor_nikolaev_2.jpg',
            'http://kto-zhena.ru/wp-content/uploads/2014/07/RIA-684655-Originalc.jpg',
            'http://www.newsmusic.ru/uploads/i/n/inikolaev.jpg',
            'http://myslo.ru/Content/OldNews/art_images/874/dg_005.jpg',
            'http://img.zaycev.fm/photos/000/318/707/original/igor-nikolaev.jpg',
            'http://www.mega-stars.ru/img/starsnews/pictures/2013.11.08-belij_royal_i_bassejn_na_chetvyortom_etazhe..jpg',
            'http://www.kleo.ru/items/planetarium/img/img_7466_23171325.jpg',
            'http://donbass.ua/multimedia/images/news/original/2012/10/05/nikolaev_dtp.jpg',
            'http://minusovochka.com/css/site/images/nikolaev.jpg',
            'http://s019.radikal.ru/i622/1302/00/9c40bac9dea9.jpg',
            'http://www.telesem.ru/images/stories/784/hope.jpg',
            'https://upload.wikimedia.org/wikipedia/commons/5/55/RIAN_archive_876389_%22Flowers_from_a_Star%22_holiday_event.jpg',
            'http://s5.pikabu.ru/images/big_size_comm/2014-12_2/14178893096531.jpg',
            'http://hochu.ua/images/articles/46526_89067.jpg',
            'http://newsofstars.ru/wp-content/uploads/2012/10/niqolaev.jpg',
            'http://infinitiv.ru/assets/images/artists/nikolaev/artist/nikolaev-artist_b.jpg',
            'http://www.kleo.ru/img/items/nikolaev_igor.jpg',
            'http://img.ntv.ru/home/news/20131121/nikolaev.jpg',
            'http://fan-club-alla.ru/wp-content/uploads/2010/10/8c94853892f7.jpg',
            'http://t1.moskva.fm/uimg/artists/source/b5/b59a7678469b73a6ad85204e730d123f.jpeg',
            'http://debonton.ru/images/stories/m34/z99.jpg',
            'http://www.buro247.ru/local/images/buro/img_8259_jpg_1319406637.jpg',
            'http://i.ytimg.com/vi/uVnxHRalzvE/maxresdefault.jpg',
            'http://i.ytimg.com/vi/oM5J4v0wFUI/maxresdefault.jpg',
            'http://0.avatars.yandex.net/get-music-content/3eee6aa1.p.167031/m1000x1000',
            'http://i.imgur.com/gBReaAT.jpg',
            'http://i.imgur.com/3drDnRt.jpg',
            'http://i.imgur.com/xQ3UC5q.jpg',
            'http://img.amur.info/res/articles/5985/660x440/873ba345d080159662902f7dcb3635bb.jpg',
          ],
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

        const date = new Date();
        // 3 September
        if (date.getMonth() === 8 && date.getDate() === 3) {
          self.images = [
            'https://s11.stc.all.kpcdn.net/share/i/12/10431697/inx960x640.jpg',
            'https://images11.cosmopolitan.ru/upload/img_cache/670/670b226c0028aab24d9c2b46fc3d90d9_ce_1600x1061x0x0_fitted_740x0.jpg',
            'https://s1.afisha.ru/mediastorage/f4/f3/fa1c7643e7fe40fc804af61ff3f4.jpg',
            'https://n1s1.starhit.ru/6d/a8/9c/6da89cff04f127762a2d1f4396274181/480x497_0_427c369a44a1760fffc176f1024fdb4b@480x497_0x0a330c9a_7046198001523019316.jpeg',
            'https://simferopol.kassa24.ru/upload/additional/original/7/b/7bce03167a16ddaf4997f80a4e35f2af.jpg',
            'https://images.aif.ru/014/801/2d2716433e48b6e6ddcc06c6d048323f.jpg',
            'https://cdn-st4.rtr-vesti.ru/vh/pictures/gallery/163/177/7.jpg',
            'https://vesti-ukr.com/img/article/2336/21_main.jpg',
            'https://n1s2.starhit.ru/5c/df/b2/5cdfb24695635ea4d5f42ee667d43e98/480x497_0_5acdab221cd1b5b8b3c73ef47d9e3fcb@480x497_0x0a330c9a_19623013161517505145.jpeg',
            'https://s16.stc.all.kpcdn.net/share/i/12/10639731/inx960x640.jpg',
            'https://www.womanhit.ru/media/CACHE/images/articleimage2/2018/10/6a1a0a685530a54c02226a3ab52160c8/102f6952cab65777088f10002bd67744.png',
            'https://actionlist.ru/img/artist/27529/5.jpg',
            'https://www.iphones.ru/wp-content/uploads/2018/09/ECFFDAC0-427C-41E7-99A4-3ACA7147FF9E.jpeg',
            'https://www.vokrug.tv/pic/post/6/1/8/f/rsz800x800_618fe9ba9ed2a0ad10b508f047bcb531.jpeg',
            'https://img.icity.life/upload/2018/359/f7d/776/full/f7d7768a0619da2a9e3e8d4a1aaaba83.jpg',
            'http://cdn.iz.ru/sites/default/files/styles/900x506/public/news-2018-10/BED_9086.JPG.jpg?itok=6Mqr2_JO',
            'https://images.aif.ru/005/848/cccb94542da9df97c6015b1fb4c9f0b2.jpg',
            'https://www.afisha.uz/ui/materials/2019/07/0536759_b.jpeg',
            'https://abrgen.ru/attachments/Image/Mihail-Shufutinskiy-4.jpg?template=generic',
            'https://dorognoe.ru/upload/editor/01/2019/c0/c3/5d3eee0a3e075_ol9776956.jpg',
            'http://v.img.com.ua/b/1100x999999/2/75/d135993907888eb7e8ec80c24ff77752.jpg',
          ];
        }

        // Start when page is load
        document.addEventListener(
            'DOMContentLoaded',
            self.handleImages(self.images, 3000)
        );
      // end iNikolayev
      }
    }
);
const _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-15665299-28']);
_gaq.push(['_trackPageview']);
(() => {
  const ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  const s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
})();

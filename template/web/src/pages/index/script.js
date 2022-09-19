import "../../_public/public.scss";
import "swiper/swiper-bundle.min.css"
import "./style.scss";
import Swiper from "swiper/bundle";

(function() {
  // 轮播初始化播放
  new Swiper("#team_swiper", {
    autoplay: true,
    loop: true
  });
})();
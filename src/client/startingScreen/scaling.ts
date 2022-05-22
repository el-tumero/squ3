import $ from "jquery"
// scroll opacity function for arrow

$(document).ready(function(){
  $(document).scrollTop(0);
  // $('html,body').scrollTop(0);
});

export default function scalingOnScroll(){

    $(window).scroll(function() {
      
      var scrollTop:number = $(this).scrollTop() as number;
        // console.log(scrollTop)
    
        $('#page1-arrow').css({
          opacity: function() {

            if(scrollTop > 100 && window.scrollY < 250){
              arrow_btn!.style.transform = `scale(0)`
            }
            if(scrollTop < 35){
              arrow_btn!.style.transform = `scale(1)`
            }

            var elementHeight:number = $(this).height() as number;
            return 0 + (elementHeight - scrollTop/2.5) / elementHeight;
          }
        });
      });
    

    // scroll scale function for play button
    const play_btn: HTMLElement | null = document.getElementById('play-btn')
    const arrow_btn: HTMLElement | null = document.getElementById('page1-arrow')
    const nft_1: HTMLElement | null = document.getElementById('nft-image-1')
    const nft_2: HTMLElement | null = document.getElementById('nft-image-2')
    const nft_3: HTMLElement | null = document.getElementById('nft-image-3')
    
    window.onscroll = (event) => {
        const x = window.scrollY / 1000;

        if(window.scrollY >= 1000){
          nft_1!.style.transform = `scale($0.38)`
          play_btn!.style.transform = `scale(0)`
          // document.getElementById('disconnect')?.classList.remove('hidden');
        }
        if(window.scrollY >= 605) {
          play_btn!.classList.add('disable-click')
        }
        if(window.scrollY < 605 ){
          play_btn!.classList.remove('disable-click')
        }

        if(window.scrollY < 1000){
          play_btn!.style.transform = `scale(${0.8 - (x/1.5)})`;

          nft_1!.style.transform = `scale(${0.2 + x/2})`;
          nft_2!.style.transform = `scale(${0.2 + x/2})`;
          nft_3!.style.transform = `scale(${0.2 + x/2})`;
        }
      };


    //   const nft1: HTMLElement | null = document.getElementById('nft-image-1')
    
    // window.onscroll = (event) => {
    //     const nftscroll1 = window.scrollY / 1000;
    //     nft1!.style.transform = `scale(${0.8 + (nftscroll1/1.5)})`;
    //   };
}


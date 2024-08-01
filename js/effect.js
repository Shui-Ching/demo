    // 啟用平滑滾動條
    // const Scrollbar = window.Scrollbar;
    // const myScrollbar = document.querySelector('.my-scrollbar')
    // const scrollInstance = Scrollbar.init(myScrollbar, {
    //     damping: 0.03, 
    // });
// 卡頓度
    // 設定 vw 變數，視窗寬度，下方用於處理 RWD 樣式變動
		function setViewWidth () {
			document.documentElement.style.setProperty("--vw", document.body.clientWidth + "px");
		}

		window.addEventListener("resize", (()=>{
			setViewWidth()
		}))

   // 啟用圖片動畫特效
		function initAnimation(id) {
			const element = document.getElementById(id);

			function activate() {
				requestAnimationFrame((() => {
					element.classList.add("scrollFx--active");
				}))
				setTimeout(finish, 2e3); // 設定動畫持續時間 / 毫秒。2e3 = 2000ms 2 * 10 ^ 3 次方
			}

			function finish() {
				element.classList.add("scrollFx--done");
			}

			let observer

			let options = {
				root: null,
				rootMargin: "0px",
				threshold: [0, 0.25, 0.5, 0.75, 1],
			};

			let callback = (entries, observer) => {
				entries.forEach((entry) => {
					// 元素進入視窗
					if (entry.isIntersecting) {
						activate();
						observer.unobserve(entry.target);
					}
				});
			};

			observer = new IntersectionObserver(callback, options);
			observer.observe(element);
		}


		// 滾動放大圖片
		function initScrollEnlarge() {
			const container = document.querySelector(".page__cover__fv");
			const scrollRange = container.getBoundingClientRect().height - window.innerHeight;

			// const imageWrappers = document.querySelectorAll(".page__cover__image img");
			// const scrollContent = document.querySelector(".scroll-content");
			const productListWrapper = document.querySelector('.block-newproduct');/**區塊定格**/
			const sliderWrapper = document.querySelector('.page__cover');/**區塊定格**/

			// 設定最大放大倍率
			const maxScale = 1.2;

			const callback = (mutationList, observer) => {
				for (const mutation of mutationList) {
					if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
						const offset = mutation.target.style.transform.split(',')[1];
						const change = Math.round(offset.slice(2, -2));

						console.log(change)
						const SLIDER_BASE = 0; // page__cover 開始定格的座標


						// 區塊內容 fix，4495 是 .block-newproduct 結束定格的座標
						if (change > SLIDER_BASE && change < 1000) {
							sliderWrapper.style.transform = `translateY(${change - SLIDER_BASE}px)`;
						} else {
							sliderWrapper.style.transform = 'translateY(0)';
						}

						console.log(change)
						const NEW_PRODUCT_BASE = 3800; // block-newproduct 開始定格的座標


						// 區塊內容 fix，4495 是 .block-newproduct 結束定格的座標
						if (change > NEW_PRODUCT_BASE && change < 4900) {
							productListWrapper.style.transform = `translateY(${change - NEW_PRODUCT_BASE}px)`;
						} else {
							productListWrapper.style.transform = 'translateY(0)';
						}

						const ELEMENT_HEIGHT = 475; // footer 元素的高度
						const FOOTER_BASE = 4900; // footer 開始出現的座標

						// footer 內容 fix，5200 是footer底部的座標
						if (change > FOOTER_BASE && change < 5375) {
							const footer = document.querySelector('.footer');
							footer.style.transform = `translateY(${change - FOOTER_BASE - ELEMENT_HEIGHT}px)`;
						}

						// imageWrappers.forEach((wrapper) => {
						// 	if (!wrapper.style.scale) {
						// 		wrapper.style.scale = 1;
						// 	} else if (offset && Number(wrapper.style.scale) <= maxScale) {
						// 		const divisor = (maxScale - 1) / scrollRange * change;

						// 		if (divisor <= maxScale - 1) {
						// 			wrapper.style.scale = 1 + divisor;
						// 		}
						// 	}
						// })
					}
				}
			};

			const observer = new MutationObserver(callback);
			// observer.observe(scrollContent, { attributes: true });
		}

		// 啟用圖片動畫、放大效果
		(function init () {
			initAnimation('page-cover-image');
			initAnimation('esg-image1');
            initAnimation('brand-image1');
            initAnimation('brand-image2');
            initAnimation('brand-image3');
            initAnimation('brand-image4');
            initAnimation('brand-image5');
            initAnimation('brand-image6');
            initAnimation('brand-image7');
            initAnimation('brand-image8');
            initScrollEnlarge();
			setViewWidth();
		})();

   

    // 滾動隱藏導覽列
    window.addEventListener("wheel", ((event)=>{
        // const scrollContent = document.querySelector(".scroll-content");
        const nav = document.querySelector(".l-nav_main");
        const dialog = document.querySelector('#contentDialog');

        // 彈窗開啟時新增該屬性，防止觸發滾動效果
        // if (myScrollbar.attributes['data-prevent-scroll']) {
        //     return;
        // }

        if (event.deltaY > 0 && !nav.classList.contains("js-header-hidden")) {
            nav.classList.add("js-header-hidden");
        } else if (event.deltaY < 0 && nav.classList.contains("js-header-hidden")) {
            nav.classList.remove("js-header-hidden");
        }
    }))

    // 導覽列樣式
    const navList = document.querySelector('.header__navbar');
	const subMenus = document.querySelectorAll('.sub-menu');
	const mainLinks = navList.querySelectorAll('.main-menu > a');

	navList.addEventListener('mouseover', (event) => {
		const target = event.target;
		const current = document.querySelector('.l-nav_main-current');
		
		const navLeft = navList.getBoundingClientRect().x;
		const nextLeft = target.getBoundingClientRect().x;

		// 調整滑動條至 <li> 上的位置與寬度
		if (target.classList.contains('main-menu')) {
			mainLinks.forEach((a) => {
				a.classList.remove('active');
			});
			target.querySelector('a').classList.add('active');

			current.style.left = `${nextLeft - navLeft + 4}px`;
			current.style.width = `${target.offsetWidth - 8}px`;
			return;
		}

		// 調整滑動條至 <a> 上的位置與寬度
		if (target.parentElement.classList.contains('main-menu') && target.tagName === 'A') {
			mainLinks.forEach((a) => {
				a.classList.remove('active');
			});
			target.parentElement.querySelector('a').classList.add('active');

			current.style.left = `${nextLeft - navLeft - 11}px`;
			current.style.width = `${target.offsetWidth + 22}px`;
		}
	});

	navList.addEventListener('mouseleave', () => {
		const current = document.querySelector('.l-nav_main-current');

		// 移至導覽列外時，將樣式歸位
		current.style.left = '22px'; // 連動 .l-nav_main-current 的 left
		current.style.width = '82px';
		
		mainLinks.forEach((a) => {
			a.classList.remove('active');
		});
		navList.querySelector('.main-menu > a').classList.add('active');
	});

    // 防止滾動條在彈窗開啟時滾動
    // function setScrollMomentum () {
    //     scrollInstance.setMomentum(0, 0);
    // }

    // 彈窗開關
    const dialogButton = document.querySelector('.l-nav_full-list-btn');

    dialogButton.addEventListener('click', () => {
        const dialog = document.querySelector('#contentDialog');
        dialog.showModal();

        // window.addEventListener('wheel', setScrollMomentum);
    });

    const dialogCloseButton = document.querySelector('.dialog-close-btn');

    dialogCloseButton.addEventListener('click', () => {
        const dialog = document.querySelector('#contentDialog');
        dialog.close();

        // window.removeEventListener('wheel', setScrollMomentum);
    });

	// chat彈窗開關
    const dialogButton1 = document.querySelector('.chat-btn');

    dialogButton1.addEventListener('click', () => {
        const dialog = document.querySelector('#chatDialog');
        dialog.showModal();
    });

    const dialogCloseButton1 = document.querySelector('.chat-close-btn');

    dialogCloseButton1.addEventListener('click', () => {
        const dialog = document.querySelector('#chatDialog');
        dialog.close();
		
    });


    // 滑鼠移動跟隨效果
		const productList = document.querySelector('.newproduct-list');
		const mouseBall = document.querySelector('.mouse-ball');
		let isDragging = false;

		productList.addEventListener('pointermove', (event) => {
			const { x, y } = productList.getBoundingClientRect();
			const mouseX = event.clientX - x;
			const mouseY = event.clientY - y;

			// 只在最新商品的區域做内移動
			if (mouseX >= 0 && mouseX <= productList.offsetWidth && mouseY >= 0 && mouseY <= productList.offsetHeight) {
				mouseBall.classList.add('mouse-ball-hover');
				mouseBall.style.opacity = 1;
				mouseBall.style.left = `${mouseX}px`;
				mouseBall.style.top = `${mouseY}px`;
			}

			// 調整滑鼠球位置，使其位於滑鼠指針的左下方
			const OFFSET = 0;
			mouseBall.style.left = `${mouseX - mouseBall.offsetWidth - OFFSET}px`;
			mouseBall.style.top = `${mouseY + OFFSET}px`;
		});

		productList.addEventListener('pointerleave', () => {
			const target = document.querySelector('.mouse-ball');
			target.classList.remove('mouse-ball-hover');
			target.style.opacity = '0';
		});

		// 滑鼠移入商品列表顯示對應圖片
		const images = document.querySelectorAll('.list-item');

		images.forEach((image) => {
			image.addEventListener('pointerenter', (event) => {
				const target = event.target;
				const index = target.dataset.index - 1;
				const listImageItems = document.querySelectorAll('.block-brand-item');

				listImageItems.forEach((image) => {
					image.style.opacity = 0;
					image.classList.remove('active');
				});

				listImageItems[index].style.opacity = 1;
				listImageItems[index].classList.add('active');
			});
		});


		//gsap//
		// gsap.from('.block-newproduct', {
		// 	x: 1000,
		// 	duration: 1
		// })

gsap.registerPlugin(ScrollTrigger);

// gsap.from(".block-newproduct", {
// 	x: 1000,
// 	duration: 1,
// 	scrollTrigger: {
// 		trigger: ".block-newproduct",
// 		start: "top bottom", 
// 		end: "top +=400",
// 		pin: false, 
// 		scrub: true,
// 		toggleClass: "active", 
// 	}
// });

//微動畫//
gsap.utils.toArray( '[data-aos^=fade]' ).forEach( ( ele ) => {
	const direction = ele.dataset.aos.split('-')[1],
		  proxy = {
			up: [0, 50],
			down: [0, -50],
			left: [50, 0],
			right: [-50, 0],
		  };
	gsap.from( ele, {
	  scrollTrigger: {
		trigger: ele,
		start: 'top bottom',
		end: "top +=300", 
		scrub: false,
		toggleActions: 'play none none reverse'
		// markers: true
	  },
	  duration: 1,
	  opacity: 0.5,
	  xPercent: proxy[direction][0],
	  yPercent: proxy[direction][1],
	});
  });

  
//倒數動畫//
	let start = { val: 0 };
  gsap.utils.toArray( '.tal' ).forEach( function ( label ) {
	start.val = 0;
	// 這個作法的目的是歸零 start 的起始值，讓它可以重複利用
	gsap.to( start, {
	  // 這裡需要注意的是，要變化的是 start.val 的數值，而不是改變 label 的物件
	  duration: 3,
	  scrollTrigger: {
		// 設定觸發條件
		trigger: label,
		// 以當前的 label 作為觸發條件
		toggleActions: "play none none none",
		// 不需要有任何回溯的效果，所以只有單向的 play
		start: "top center",
		// 當觸發選擇器的頂端碰到檢視區正中間時啟用
		end: "top +=200", 
		// markers: true
	  },
	  val: label.dataset.end,
	  // 選取 data-end 資料屬性的值作為終點
	  onUpdate: ( function () {
		label.innerHTML = Math.floor( Number( start.val ) );
		// 當 val 數值變更時，用 Math.floor 讓數字以整數形式呈現。
	  } )
	} );
  } );



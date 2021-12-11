document.addEventListener("DOMContentLoaded", function () {
	let mainSldier = new Swiper(".main-slider", {
		slidesPerView: "auto",
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		centeredSlides: true,
	});

	let arrSliderCourses = document.querySelectorAll(".courses-sldier");

	if (arrSliderCourses.length > 0) {
		arrSliderCourses.forEach((element) => {
			let slider = element.querySelector(".courses-sldier__container");
			let next = element.querySelector(".courses-sldier__next");
			let prev = element.querySelector(".courses-sldier__prev");
			let loopActive = slider.querySelectorAll(".courses-sldier__slide").length > 5 ? true : false;

			let coursSldier = new Swiper(slider, {
				slidesPerView: 2,
				watchOverflow: true,
				spaceBetween: 10,
				loop: loopActive,

				navigation: {
					nextEl: next ? next : "",
					prevEl: prev ? prev : "",
				},

				breakpoints: {
					1170: {
						slidesPerView: "auto",
						spaceBetween: 20,
					},

					900: {
						slidesPerView: 4,
						spaceBetween: 20,
					},

					650: {
						slidesPerView: 3,
						spaceBetween: 10,
					},
				},
			});
		});
	}

	let sliderScheduleControls = new Swiper(".slider-schedule-controls", {
		slidesPerView: "auto",
		watchOverflow: true,
		spaceBetween: 30,
	});

	let mainMenu = document.querySelector(".main-nav ul");
	let menu = document.querySelector("#menu");

	if (mainMenu != null && menu != null) {
		menu.append(mainMenu.cloneNode(true));
	}

	let mmenu = new Mmenu("#menu", {
		navbar: {
			title: "Меню",
		},
	});

	let mmenuApi = mmenu.API;

	mmenuApi.bind("open:start", function () {
		document.querySelector("html").classList.add("lock");
	});

	mmenuApi.bind("close:finish", function () {
		document.querySelector("html").classList.remove("lock");
	});

	let elHeder = document.querySelector(".header");

	if (elHeder != null) {
		if (window.pageYOffset > 0) {
			elHeder.classList.add("scrolled");
		} else {
			elHeder.classList.remove("scrolled");
		}

		window.addEventListener("scroll", function (e) {
			if (window.pageYOffset > 0) {
				elHeder.classList.add("scrolled");
			} else {
				elHeder.classList.remove("scrolled");
			}
		});
	}

	let arrRangeSliders = Array.prototype.slice.call(document.querySelectorAll(".filter-search-range"));

	if (arrRangeSliders.length > 0) {
		arrRangeSliders.forEach((element) => {
			let rangeSlider = element.querySelector(".filter-search-range__slider");
			let inputSlider = element.querySelector(".filter-search-range__input");
			let inputsSlider = [inputSlider];
			let minValue = parseInt(inputSlider.dataset.minValue);
			let maxValue = parseInt(inputSlider.dataset.maxValue);
			let step = Number(inputSlider.dataset.step);
			
			noUiSlider.create(rangeSlider, {
				start: maxValue / 2,
				connect: 'lower',
				step: step,
				tooltips: [true],
				range: {
					min: minValue,
					max: maxValue,
				},

				format: {
					to: function (value) {
						return value;
					},
					from: function (value) {
						return Number(value) ;
					}
				}
			});

			rangeSlider.noUiSlider.on("update", function (values, handle) {
				inputsSlider[handle].value = Math.round(values[handle]);
			});
		});
	}

	let lightgalleryAll = document.querySelectorAll(".lightgallery");

	if (lightgalleryAll.length > 0) {
		lightgalleryAll.forEach(element => {
			lightGallery(element, {
				selector: "a",
				addClass: "lightGallery-white-theme",
				exThumbImage: "data-external-thumb-image",
				speed: 500,
				plugins: [lgFullscreen, lgThumbnail],
			});
		});
	}

	//Табы 
	let tabContainers = Array.prototype.slice.call(document.querySelectorAll(".js-tab-container"));

	if (tabContainers.length > 0) {
		tabContainers.forEach((element) => {
			let tabItem = Array.prototype.slice.call(element.querySelectorAll(".js-tab-control"));
			let tabContent = Array.prototype.slice.call(element.querySelectorAll(".js-tab-content"));

			tabItem.forEach((el, index, array) => {
				el.addEventListener("click", (e) => {
					if (!el.classList.contains("active")) {
						e.preventDefault();

						let dataId = el.dataset.tabItem;

						let tabContentItem = tabContent.find((item) => {
							if (item.dataset.tabContent == dataId) {
								return item;
							} else {
								return null;
							}
						});

						if (tabContentItem != null) {
							tabItem.forEach((el) => el.classList.remove("active"));
							tabContent.forEach((el) => el.classList.remove("active"));

							el.classList.add("active");

							tabContentItem.classList.add("active");
						}
					}
				});
			});
		});
	}

	//Видео в карточке 
	let videoPrev = document.querySelector(".product-course__video-prev");
	let videoEl = document.querySelector(".product-course__video-item");

	if (videoPrev != null && videoEl != null) {
		videoPrev.addEventListener("click", function() {
			videoPrev.style.opacity = "0";
			videoPrev.style.visibility = "hidden";

			setTimeout(() => {
				videoEl.play();
			}, 500)
		});
	}

	document.addEventListener("click", function (e) {
		let element = e.target;
		let body = document.querySelector("body");

		if (element.closest(".main-burger")) {
			mmenuApi.open();
		}

		if (element.closest(".main-search")) {
			let searchPanel = document.querySelector(".search-panel");
			
			if (searchPanel != null) {
				searchPanel.classList.toggle("active");
				body.classList.toggle("lock");
			}
		}

		if (element.classList.contains("search-panel")) {
			element.classList.toggle("active");
			body.classList.toggle("lock");
		}

		if (element.closest(".filter-search__name")) {
			let toggleEl = element.closest(".filter-search").querySelector(".filter-search__wrap");

			if (toggleEl != null) {
				element.closest(".filter-search__name").classList.toggle("--show");
				_slideToggle(toggleEl, 500);
			}
		}

		if (element.closest(".search-panel__filter-title")) {
			let toggleEl = document.querySelector(".search-panel__middle");

			if (toggleEl != null) {
				element.closest(".search-panel__filter-title").classList.toggle("--show");
				_slideToggle(toggleEl, 500);
			}
		}
	});

	let _slideUp = (target, duration = 500) => {
		if (!target.classList.contains("--slide")) {
			target.classList.add("--slide");
			target.style.transitionProperty = "height, margin, padding";
			target.style.transitionDuration = duration + "ms";
			target.style.height = target.offsetHeight + "px";
			target.offsetHeight;
			target.style.overflow = "hidden";
			target.style.height = 0;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			window.setTimeout(() => {
				target.hidden = true;
				target.style.removeProperty("height");
				target.style.removeProperty("padding-top");
				target.style.removeProperty("padding-bottom");
				target.style.removeProperty("margin-top");
				target.style.removeProperty("margin-bottom");
				target.style.removeProperty("overflow");
				target.style.removeProperty("transition-duration");
				target.style.removeProperty("transition-property");
				target.classList.remove("--slide");
			}, duration);
		}
	};

	let _slideDown = (target, duration = 500) => {
		if (!target.classList.contains("--slide")) {
			target.classList.add("--slide");
			if (target.hidden) {
				target.hidden = false;
			}
		}
		let height = target.offsetHeight;
		target.style.overflow = "hidden";
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + "ms";
		target.style.height = height + "px";
		target.style.removeProperty("padding-top");
		target.style.removeProperty("padding-bottom");
		target.style.removeProperty("margin-top");
		target.style.removeProperty("margin-bottom");

		window.setTimeout(() => {
			target.style.removeProperty("height");
			target.style.removeProperty("overflow");
			target.style.removeProperty("transition-duration");
			target.style.removeProperty("transition-property");
			target.classList.remove("--slide");
		}, duration);
	};

	let _slideToggle = (target, duration = 500) => {
		if (target.hidden) {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	};
});

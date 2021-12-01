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
				slidesPerView: 1,
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

					450: {
						slidesPerView: 2,
						spaceBetween: 10,
					},
				},
			});
		});
	}

	// let mainMenu = document.querySelector(".main-nav ul");
	// let menu = document.querySelector("#menu");

	// if (mainMenu != null && menu != null) {
	// 	menu.append(mainMenu.cloneNode(true));
	// }

	// let mmenu = new Mmenu("#menu", {
	// 	navbar: {
	// 		title: "Меню",
	// 	},
	// });

	// let mmenuApi = mmenu.API;

	// mmenuApi.bind("open:start", function () {
	// 	document.querySelector("html").classList.add("lock");
	// });

	// mmenuApi.bind("close:finish", function () {
	// 	document.querySelector("html").classList.remove("lock");
	// });

	// document.addEventListener("click", function (e) {
	// 	let element = e.target;

	// 	if (element.closest(".main-burger")) {
	// 		mmenuApi.open();
	// 	}
	// });

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
});

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /**
     * Scroll top button
     */
    let scrollTop = document.querySelector(".scroll-top");

    function toggleScrollTop() {
        if (scrollTop) {
            window.scrollY > 100
                ? scrollTop.classList.add("active")
                : scrollTop.classList.remove("active");
        }
    }
    scrollTop.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });

    window.addEventListener("load", toggleScrollTop);
    document.addEventListener("scroll", toggleScrollTop);

    /**
     * Preloader
     */
    const preloader = document.querySelector("#preloader");
    if (preloader) {
        window.addEventListener("load", () => {
            preloader.remove();
        });
    }

    /**
     * Apply .scrolled class to the body as the page is scrolled down
     */
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");

    function toggleScrolled() {
        if (
            !selectHeader.classList.contains("scroll-up-sticky") &&
            !selectHeader.classList.contains("sticky-top") &&
            !selectHeader.classList.contains("fixed-top")
        )
            return;
        window.scrollY > 100
            ? selectBody.classList.add("scrolled")
            : selectBody.classList.remove("scrolled");
    }

    document.addEventListener("scroll", toggleScrolled);
    window.addEventListener("load", toggleScrolled);

    /**
     * Scroll up sticky header to headers with .scroll-up-sticky class
     */
    let lastScrollTop = 0;
    window.addEventListener("scroll", function () {
        if (!selectHeader.classList.contains("scroll-up-sticky")) return;

        let scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;

        if (
            scrollTop > lastScrollTop &&
            scrollTop > selectHeader.offsetHeight
        ) {
            selectHeader.style.setProperty("position", "sticky", "important");
            selectHeader.style.top = `-${header.offsetHeight + 50}px`;
        } else if (scrollTop > selectHeader.offsetHeight) {
            selectHeader.style.setProperty("position", "sticky", "important");
            selectHeader.style.top = "0";
        } else {
            selectHeader.style.removeProperty("top");
            selectHeader.style.removeProperty("position");
        }
        lastScrollTop = scrollTop;
    });

    /**
     * Mobile nav toggle
     */
    const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

    function mobileNavToogle() {
        document.querySelector("body").classList.toggle("mobile-nav-active");
        mobileNavToggleBtn.classList.toggle("bi-list");
        mobileNavToggleBtn.classList.toggle("bi-x");
    }
    mobileNavToggleBtn.addEventListener("click", mobileNavToogle);

    /**
     * Hide mobile nav on same-page/hash links
     */
    document.querySelectorAll("#navmenu a").forEach((navmenu) => {
        navmenu.addEventListener("click", () => {
            if (document.querySelector(".mobile-nav-active")) {
                mobileNavToogle();
            }
        });
    });

    /**
     * Toggle mobile nav dropdowns
     */
    document.querySelectorAll(".navmenu .has-dropdown i").forEach((navmenu) => {
        navmenu.addEventListener("click", function (e) {
            if (document.querySelector(".mobile-nav-active")) {
                e.preventDefault();
                this.parentNode.classList.toggle("active");
                this.parentNode.nextElementSibling.classList.toggle(
                    "dropdown-active"
                );
                e.stopImmediatePropagation();
            }
        });
    });

    /**
     * Correct scrolling position upon page load for URLs containing hash links.
     */
    window.addEventListener("load", function (e) {
        if (window.location.hash) {
            if (document.querySelector(window.location.hash)) {
                setTimeout(() => {
                    let section = document.querySelector(window.location.hash);
                    let scrollMarginTop =
                        getComputedStyle(section).scrollMarginTop;
                    window.scrollTo({
                        top: section.offsetTop - parseInt(scrollMarginTop),
                        behavior: "smooth",
                    });
                }, 100);
            }
        }
    });

    /**
     * Initiate glightbox
     */
    const glightbox = GLightbox({
        selector: ".glightbox",
    });

    /**
     * Initiate Pure Counter
     */
    new PureCounter();

    /**
     * Init isotope layout and filters
     */
    function initIsotopeLayout() {
        document
            .querySelectorAll(".isotope-layout")
            .forEach(function (isotopeItem) {
                let layout =
                    isotopeItem.getAttribute("data-layout") ?? "masonry";
                let filter =
                    isotopeItem.getAttribute("data-default-filter") ?? "*";
                let sort =
                    isotopeItem.getAttribute("data-sort") ?? "original-order";

                let initIsotope = new Isotope(
                    isotopeItem.querySelector(".isotope-container"),
                    {
                        itemSelector: ".isotope-item",
                        layoutMode: layout,
                        filter: filter,
                        sortBy: sort,
                    }
                );

                isotopeItem
                    .querySelectorAll(".isotope-filters li")
                    .forEach(function (filters) {
                        filters.addEventListener(
                            "click",
                            function () {
                                isotopeItem
                                    .querySelector(
                                        ".isotope-filters .filter-active"
                                    )
                                    .classList.remove("filter-active");
                                this.classList.add("filter-active");
                                initIsotope.arrange({
                                    filter: this.getAttribute("data-filter"),
                                });
                                if (typeof aosInit === "function") {
                                    aosInit();
                                }
                            },
                            false
                        );
                    });
            });
    }
    window.addEventListener("load", initIsotopeLayout);

    /**
     * Frequently Asked Questions Toggle
     */
    document
        .querySelectorAll(".faq-item h3, .faq-item .faq-toggle")
        .forEach((faqItem) => {
            faqItem.addEventListener("click", () => {
                faqItem.parentNode.classList.toggle("faq-active");
            });
        });

    /**
     * Init swiper sliders
     */
    function initSwiper() {
        document.querySelectorAll(".swiper").forEach(function (swiper) {
            let config = JSON.parse(
                swiper.querySelector(".swiper-config").innerHTML.trim()
            );
            new Swiper(swiper, config);
        });
    }
    window.addEventListener("load", initSwiper);

    /**
     * Animation on scroll function and init
     */
    function aosInit() {
        AOS.init({
            duration: 600,
            easing: "ease-in-out",
            once: true,
            mirror: false,
        });
    }
    window.addEventListener("load", aosInit);
});

// Graficos

// Generar valores aleatorios para las opciones
// Función para generar un valor aleatorio utilizando una distribución normal
function randomNormalDistribution(mean, standardDeviation) {
    let u = 0,
        v = 0;
    while (u === 0) u = Math.random(); //Convierte [0,1) a (0,1)
    while (v === 0) v = Math.random();
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return num * standardDeviation + mean;
}

// Generar valores aleatorios para las opciones
const options = [
    "Préstamos no solicitados",
    "Transacciones desconocidas virtuales",
    "Transacciones desconocidas TDC",
    "Intereses o saldos",
    "Cuentas bloqueadas",
    "Transferencia Daviplata",
    "Pagos no aplicados",
    "Suplantación",
];

// Generar valores aleatorios para cada opción
let totalValue = 100;
let minPercent = 5;
const maxPercent = 45;
const data = options.map((option, index) => {
    // Calcular el valor máximo posible para la opción actual
    let maxPossibleValue = Math.min(
        totalValue - (options.length - index - 1) * minPercent,
        totalValue - minPercent,
        maxPercent
    );
    // Calcular el valor medio y la desviación estándar para la distribución normal
    let mean = (minPercent + maxPossibleValue) / 2;
    let standardDeviation = (maxPossibleValue - minPercent) / 6; // Ajuste este valor según su preferencia
    // Generar valor aleatorio utilizando la distribución normal
    let value = Math.round(randomNormalDistribution(mean, standardDeviation));
    // Asegurar que el valor esté dentro del rango permitido
    value = Math.max(Math.min(value, maxPossibleValue), minPercent);
    // Si es la última opción, asegurarse de que la suma total sea 100%
    if (index === options.length - 1) {
        value = totalValue;
    } else {
        totalValue -= value; // Restar el valor asignado de la suma total
    }
    return {
        option: option,
        value: value,
    };
});

// Mostrar el diagrama de barras
const chart = document.getElementById("chart");
data.forEach((item) => {
    const barWidth = item.value + "%";
    const bar = `
      <div class="col-md-6">
          <div class="option-name">${item.option}</div>
      </div>
      <div class="col-md-6">
          <div class="progress">
              <div class="progress-bar bg-secondary" role="progressbar" style="width: ${barWidth}">${item.value}%</div>
          </div>
      </div>
  `;
    chart.innerHTML += bar;
});

// Diagrama de torta

// Función para generar datos aleatorios que suman 100
function generarDatos() {
    const valores = [];
    const opciones = ["Alta", "Media", "Baja"];
    for (let i = 0; i < opciones.length; i++) {
        const valor = Math.floor(Math.random() * 100);
        valores.push(valor);
    }
    // Normalizar los valores para que sumen 100
    const total = valores.reduce((a, b) => a + b, 0);
    const factor = 100 / total;
    const datosNormalizados = valores.map((valor) =>
        Math.round(valor * factor)
    );
    return { opciones: opciones, valores: datosNormalizados };
}

// Obtener los elementos canvas y sus contextos
const canvas1 = document.getElementById("pieChart1");
const ctx1 = canvas1.getContext("2d");

const canvas2 = document.getElementById("pieChart2");
const ctx2 = canvas2.getContext("2d");

const canvas3 = document.getElementById("pieChart3");
const ctx3 = canvas3.getContext("2d");

const canvas4 = document.getElementById("pieChart4");
const ctx4 = canvas4.getContext("2d");

const canvas5 = document.getElementById("pieChart5");
const ctx5 = canvas5.getContext("2d");

const canvas6 = document.getElementById("pieChart6");
const ctx6 = canvas6.getContext("2d");

const canvas7 = document.getElementById("pieChart7");
const ctx7 = canvas7.getContext("2d");

const canvas8 = document.getElementById("pieChart8");
const ctx8 = canvas8.getContext("2d");

// Generar datos iniciales para cada gráfico
const datos1 = generarDatos();
const datos2 = generarDatos();
const datos3 = generarDatos();
const datos4 = generarDatos();
const datos5 = generarDatos();
const datos6 = generarDatos();
const datos7 = generarDatos();
const datos8 = generarDatos();

// Configuración de cada diagrama de torta
const config1 = generarConfiguracion(datos1, ["#9acfdd", "#76abb8", "#528693"]);
const config2 = generarConfiguracion(datos2, ["#9acfdd", "#76abb8", "#528693"]);
const config3 = generarConfiguracion(datos3, ["#9acfdd", "#76abb8", "#528693"]);
const config4 = generarConfiguracion(datos3, ["#9acfdd", "#76abb8", "#528693"]);
const config5 = generarConfiguracion(datos3, ["#9acfdd", "#76abb8", "#528693"]);
const config6 = generarConfiguracion(datos3, ["#9acfdd", "#76abb8", "#528693"]);
const config7 = generarConfiguracion(datos3, ["#9acfdd", "#76abb8", "#528693"]);
const config8 = generarConfiguracion(datos3, ["#9acfdd", "#76abb8", "#528693"]);

// Crear cada diagrama de torta
const myPieChart1 = new Chart(ctx1, config1);
const myPieChart2 = new Chart(ctx2, config2);
const myPieChart3 = new Chart(ctx3, config3);
const myPieChart4 = new Chart(ctx4, config4);
const myPieChart5 = new Chart(ctx5, config5);
const myPieChart6 = new Chart(ctx6, config6);
const myPieChart7 = new Chart(ctx7, config7);
const myPieChart8 = new Chart(ctx8, config8);

// Función para generar la configuración del diagrama de torta
function generarConfiguracion(datos, colores) {
    return {
        type: "pie",
        data: {
            labels: datos.opciones,
            datasets: [
                {
                    label: "Porcentaje",
                    data: datos.valores,
                    backgroundColor: colores,
                    borderColor: colores,
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: false,
            legend: {
                display: false,
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        var dataset = data.datasets[tooltipItem.datasetIndex];
                        var total = dataset.data.reduce(function (
                            previousValue,
                            currentValue,
                            currentIndex,
                            array
                        ) {
                            return previousValue + currentValue;
                        });
                        var currentValue = dataset.data[tooltipItem.index];
                        var percentage = Math.floor(
                            (currentValue / total) * 100 + 0.5
                        );
                        return percentage + "%";
                    },
                },
            },
        },
    };
}

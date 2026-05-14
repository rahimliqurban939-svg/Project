// 1. ФУНКЦИЯ ПОЛУЧЕНИЯ ЗНАЧЕНИЙ КУРСОВ
async function fetchRealRates() {
    try {
        // Запрашиваем данные у открытого API (базовая валюта - USD)
        const response = await fetch('https://er-api.com');
        const data = await response.json();
        
        if (data && data.rates) {
            liveRates = data.rates;
            console.log("Курсы успешно обновлены!");
        }
    } catch (error) {
        console.log("Ошибка сети. Используем сохраненные курсы.");
    }
}

// 2. ОБНОВЛЕНИЕ ТАБЛИЦЫ КУРСОВ (страница rates.html)
function loadRates() {
    const list = document.getElementById('ratesList');
    if (!list) return;

    let html = '<ul style="list-style:none; padding:0; font-size:20px;">';
    const cur = ['EUR', 'RUB', 'AZN', 'GBP', 'JPY', 'CNY'];
    
    cur.forEach(c => {
        const rate = liveRates[c] ? liveRates[c].toFixed(2) : "0.00";
        html += `<li style="margin:10px">1 USD = <b style="color:#27ae60">${rate}</b> ${c}</li>`;
    });
    list.innerHTML = html + '</ul>';
}

// 3. ГЛАВНАЯ ЛОГИКА КАЛЬКУЛЯТОРА (страница calc.html)
function updateCalc() {
    const result = document.getElementById('result');
    if (!result) return;

    const amount = document.getElementById('amount').value;
    const from = document.getElementById('fromCurrency').value;
    const to = document.getElementById('toCurrency').value;

    if (!amount || amount < 0) {
        result.innerText = "0.00";
        return;
    }

    // Рассчитываем через реальный кросс-курс из liveRates
    const rate = liveRates[to] / liveRates[from];
    result.innerText = (amount * rate).toFixed(2);
}

// 4. ЗАПУСК ПРИ ЗАГРУЗКЕ
document.addEventListener('DOMContentLoaded', async () => {
    // Сначала скачиваем курсы
    await fetchRealRates();
    
    // Затем отрисовываем данные
    loadRates();
    updateCalc();

    // Следим за вводом данных
    ['amount', 'fromCurrency', 'toCurrency'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', updateCalc);
            el.addEventListener('change', updateCalc);
        }
    });

    // Работа формы контактов
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nameVal = document.getElementById('name').value;
            document.getElementById('formStatus').innerText = `Спасибо, ${nameVal}! Мы свяжемся с вами.`;
            contactForm.reset();
        });
    }
});
// 1. ЗАПАСНЫЕ КУРСЫ (на случай, если интернет пропадет)
const fallbackRates = {
    "USD": 1, "EUR": 0.92, "RUB": 91.50, "AZN": 1.70, "GBP": 0.79, "JPY": 154.50, "CNY": 7.24
};

// Сюда мы скачаем живые данные
let liveRates = fallbackRates;

// 2. ФУНКЦИЯ ПОЛУЧЕНИЯ ЖИВЫХ КУРСОВ
async function fetchRealRates() {
    try {
        // Запрашиваем данные у открытого API (базовая валюта - USD)
        const response = await fetch('https://er-api.com');
        const data = await response.json();
        
        if (data && data.rates) {
            liveRates = data.rates;
            console.log("Курсы успешно обновлены!");
        }
    } catch (error) {
        console.log("Ошибка сети. Используем сохраненные курсы.");
    }
}

// 3. ОБНОВЛЕНИЕ ТАБЛИЦЫ КУРСОВ (страница rates.html)
function loadRates() {
    const list = document.getElementById('ratesList');
    if (!list) return;

    let html = '<ul style="list-style:none; padding:0; font-size:20px;">';
    const cur = ['EUR', 'RUB', 'AZN', 'GBP', 'JPY', 'CNY'];
    
    cur.forEach(c => {
        const rate = liveRates[c] ? liveRates[c].toFixed(2) : "0.00";
        html += `<li style="margin:10px">1 USD = <b style="color:#27ae60">${rate}</b> ${c}</li>`;
    });
    list.innerHTML = html + '</ul>';
}

// 4. ГЛАВНАЯ ЛОГИКА КАЛЬКУЛЯТОРА (страница calc.html)
function updateCalc() {
    const result = document.getElementById('result');
    if (!result) return;

    const amount = document.getElementById('amount').value;
    const from = document.getElementById('fromCurrency').value;
    const to = document.getElementById('toCurrency').value;

    if (!amount || amount < 0) {
        result.innerText = "0.00";
        return;
    }

    // Рассчитываем через реальный кросс-курс из liveRates
    const rate = liveRates[to] / liveRates[from];
    result.innerText = (amount * rate).toFixed(2);
}

// 5. ЗАПУСК ПРИ ЗАГРУЗКЕ
document.addEventListener('DOMContentLoaded', async () => {
    // Сначала скачиваем курсы
    await fetchRealRates();
    
    // Затем отрисовываем данные
    loadRates();
    updateCalc();

    // Следим за вводом данных
    ['amount', 'fromCurrency', 'toCurrency'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', updateCalc);
            el.addEventListener('change', updateCalc);
        }
    });

    // Работа формы контактов
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nameVal = document.getElementById('name').value;
            document.getElementById('formStatus').innerText = `Спасибо, ${nameVal}! Мы свяжемся с вами.`;
            contactForm.reset();
        });
    }
});


const initialTime = 24 * 60 * 60; // Начальное время в секундах (24 часа)
let totalSeconds = initialTime;

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function startTimer() {
  const timerElement = document.getElementById('timer');

  // Проверяем, есть ли сохраненное время в Local Storage
  const savedTime = localStorage.getItem('remainingTime');
  if (savedTime !== null) {
    totalSeconds = parseInt(savedTime, 10); // Загружаем оставшееся время
  } else {
    totalSeconds = initialTime; // Устанавливаем начальное время, если ничего не сохранено
  }

  // Обновляем отображение таймера
  timerElement.textContent = formatTime(totalSeconds);

  const interval = setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds--;
      timerElement.textContent = formatTime(totalSeconds);
      // Сохраняем текущее время в Local Storage
      localStorage.setItem('remainingTime', totalSeconds);
    } else {
      // Таймер завершился, перезапускаем с начального времени
      totalSeconds = initialTime;
      timerElement.textContent = formatTime(totalSeconds);
      localStorage.setItem('remainingTime', totalSeconds);
    }
  }, 1000); // Интервал 1000 миллисекунд (1 секунда)
}

window.onload = startTimer;


document.getElementById("scrollButton").addEventListener("click", function () {
  document.getElementById("targetElement").scrollIntoView({ behavior: 'smooth' });
});
document.getElementById('readMoreBtn').addEventListener('click', function () {
  const moreText = document.querySelector('.more-text');
  const btnText = document.getElementById('readMoreBtn');

  if (moreText.style.display === "none") {
    moreText.style.display = "inline";
    btnText.textContent = "Скрыть";
  } else {
    moreText.style.display = "none";
    btnText.textContent = "Читать далее";
  }
});

const validator = new JustValidate('#contact-Form')
Inputmask('+7 (999) 999-99-99').mask(document.getElementById('tel1'));
validator
  .addField('#name1', [
    {
      rule: 'required',
      errorMessage: "Обязательно"
    },
    {
      rule: 'minLength',
      value: 2,
      errorMessage: "Напишите правильно имя"
    },
    {
      rule: 'maxLength',
      value: 25,
      errorMessage: "Напишите правильно имя"
    },
  ])
  .addField('#tel1', [
    {
      validator: (value) => {
        const phone = document.getElementById('tel1').inputmask.unmaskedvalue();
        return Boolean(Number(phone) && phone.length > 0);
      },
      errorMessage: 'Обязательно'
    },
    {
      validator: (value) => {
        const phone = document.getElementById('tel1').inputmask.unmaskedvalue();
        return Boolean(Number(phone) && phone.length === 10);
      },
      errorMessage: 'Введите телефон полностью'
    },
  ])
  .onSuccess(async function () {
    let data = {
      name1: document.getElementById("name1").value,
      tel1: document.getElementById("tel1").value
    }

    let response = await fetch("php/sendmassage.php", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    });

    if (!response.ok) {
      swal("Ошибка!", "Ошибка: " + response.statusText, "error");
    } else {
      let result = await response.text();
      swal("Успех!", result, "success");
    }
  });

const reloadPageComponentList = document.querySelectorAll('.reload-page-component');

const addNewTimeTimer = (to, newTime) => {
  to.innerHTML = newTime;
};

const translateDateToNumber = (date) => {
  let minute, second;
    
    minute = Number(date.slice(0, 2));
    second = Number(date.slice(3));

  return {
    minute,
    second,
  };
};
// Функция принимает числа, обрабатывает их и возвращает строку для дальнейшего отображения в DOM узле
const subtractionTimer = (min, sec) => {
  let resultMinute, resultSecond;
  // Проверка, что вычитать - минутный или секундный параметр
  // Если секунда - это 00, то вычитать минуту и ставить секунды в 59
  if (sec !== 0) {
    (sec <= 10) ? resultSecond = `0${sec -= 1}` : resultSecond = `${sec -= 1}`;
    (min <= 9) ? resultMinute = `0${min}` : resultMinute = min;
  } else {
    resultSecond = 59;
    (min <= 10) ? resultMinute = `0${min -= 1}` : resultMinute = `${min -= 1}`;
  }
  return `${resultMinute}:${resultSecond}`
};

reloadPageComponentList.forEach(item => {
  const itemBtn = item.querySelector('.reload-page-component__btn');
  const timer = item.querySelector('.reload-page-component__date-span');

  timer.innerText = item.getAttribute('data-reload-page-timer');
  timer.setAttribute('datetime', item.getAttribute('data-reload-page-timer'));

  itemBtn.addEventListener('click', (e) => {
    itemBtn.disabled = true;

    setInterval(() => {
      // Положил в переменные данные с типом Number для передачи их в функцию substractionTimer
      let minute = translateDateToNumber(timer.innerText).minute;
      let second = translateDateToNumber(timer.innerText).second;

      if (minute === 0 && second === 1) clearInterval(window.location.reload());

      addNewTimeTimer(timer, subtractionTimer(minute, second))
    }, 1000)
  })
});
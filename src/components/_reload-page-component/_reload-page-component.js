(function() {
  const reloadPageComponentList = document.querySelectorAll('.reload-page-component');

  const addNewTimeTimer = (to, newTime) => {
    to.innerText = newTime;
  };

  const translateDateToNumber = (date) => {
    let minute, second;

      const dateArr = date.split(':');

      minute = Number(dateArr[0].trim());
      second = Number(dateArr[1].trim());

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
    return `${resultMinute} : ${resultSecond}`
  };

  reloadPageComponentList.forEach(item => {
    const itemBtn = item.querySelector('.reload-page-component__btn');
    const timer = item.querySelector('.reload-page-component__date-span');
    const thisTimerTime = item.getAttribute('data-reload-page-timer');
    // Функция которая задаёт первое значение таймера при загрузки страницы в нужном формате
    const setTimerTime = () => {
      const dateArr = thisTimerTime.split(':');

      const minute = dateArr[0].trim();
      const second = dateArr[1].trim();

      return `${minute} : ${second}`;
    };
    // Добавление значений таймера и аттрибута в тег time из data аттрибута
    addNewTimeTimer(timer, setTimerTime());
    timer.setAttribute('datetime', thisTimerTime);

    itemBtn.addEventListener('click', (e) => {
      itemBtn.disabled = true;

      setInterval(() => {
        // Положил в переменные данные с типом Number для передачи их в функцию substractionTimer
        let minute = translateDateToNumber(timer.innerText).minute;
        let second = translateDateToNumber(timer.innerText).second;
        // Если время становится в 00 : 01 - выполнить перезагрузку страницы
        if (minute === 0 && second === 1) clearInterval(window.location.reload());
        // Иначе запускать функцию вычитания времени и рендерить новое значение
        addNewTimeTimer(timer, subtractionTimer(minute, second))
      }, 1000);
    });
  });
})();
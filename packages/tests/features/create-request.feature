# language: ru

Функционал: Создание заявки

  Предыстория:
    #  почта пользователя и пароль берется от пользователя которого мы регистирировали ранее
    Дано я нахожусь на странице входа "/auth"
    И почта пользователя "superman@mail.ru" будет введено в поле с айди "login_email"
    Также пароль пользователя "some_password" будет введено в поле с айди "login_password"
    Когда я нажимаю на кнопку с текстом "Войти"
    Тогда я жду пока пользователь зайдет в сессию

  Сценарий: Успешное создание заявки как клиент
    Когда я нахожусь на странице "/appeals"
    То я нажимаю на кнопку с текстом "Новая заявка"
    Далее я нажимаю на селект тематики "add-appeal_topicId"
    Допустим выберу тематику заявки "Тех. поддержка" из списка тематик "div"
    Далее я нажимаю на селект клиента "add-appeal_clientId"
    Допустим выберу клиента заявки "Пользователь Тестирующий" из списка клиентов "div"
    Далее я нажимаю на селект статуса "add-appeal_status"
    Допустим выберу статус заявки "Выполняется" из списка статусов "div"
    Также введу в поле заголовка "add-appeal_title" текст "Заявка от пользователя superman!"
    Далее я нажимаю на селект приоритета "add-appeal_priority"
    И выберу приоритет заявки "Критично" из списка приоритетов "div"
    Затем введу в поле с айди "add-appeal_description" текст "Описание проблемы пользователя superman!"
    Когда я нажимаю на кнопку с текстом "Создать заявку"
    Далее меня переместит на страницу "/appeals"
    То увижу созданную заявку от "Пользователь Тестирующий"
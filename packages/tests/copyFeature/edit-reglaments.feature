# language: ru

Функционал: edit reglaments
  Сценарий:
    #  почта пользователя и пароль берется от пользователя которого мы регистирировали ранее
    Дано я нахожусь на странице входа "/auth"
    И почта пользователя "superman@mail.ru" будет введено в поле с айди "login_email"
    Также пароль пользователя "some_password" будет введено в поле с айди "login_password"
    Когда я нажимаю на кнопку с текстом "Войти"
    Тогда я жду пока пользователь зайдет в сессию
    То я вижу что нахожусь на странице "/appeals"
    То я нажму  на ссылку "a" аттрибут "/settings" с текстом "Настройки"
    То я теперь на странице справочники "Справочники:"
    Затем я нажму на иконку "svg" аттрибут "menu-fold"
    То я жму селект "setting" выпадающего списка "div"
    Затем я выберу "По регламенту" из выпадающего списка "div"
    Затем я проверю путь "/settings/reglaments"
    Затем я нажму кнопку "a" аттрибут "nofollow" с текстом "3"
    Затем я нажму кнопку "a" id "29" с текстом "3"
    То я  жму ссылку "a" с id "29" и с текстом "Редактировать"
    То откроется форма редактирования регламента "Форма"
    Затем в поле название с айди "add-appeal_title" введу текст "Регламент Тестовый"
    Затем в поле темы с айди "add-appeal_topicTitle" введу текст "Отчетность Тестовая"
    Затем в поле стандартный срок с айди "add-appeal_standart" введу текст "47"
    Затем в поле средний срок с айди "add-appeal_middle" введу текст "35"
    Затем в поле высокий срок с айди "add-appeal_high" введу текст "23"
    Затем в поле критично срок с айди "add-appeal_incident" введу текст "10"
    Затем я жму кнопку с текстом "Обновить регламент"
    То я далее перемещусь на "/settings/reglaments"
    То увижу отредактированный регламент "Регламент Тестовый"
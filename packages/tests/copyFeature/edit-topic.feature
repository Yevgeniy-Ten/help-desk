# language: ru

Функционал: edit тематики
  Сценарий:
    #  почта пользователя и пароль берется от пользователя которого мы регистирировали ранее
    Дано я нахожусь на странице входа "/auth"
    И почта пользователя "superman@mail.ru" будет введено в поле с айди "login_email"
    Также пароль пользователя "some_password" будет введено в поле с айди "login_password"
    Когда я нажимаю на кнопку с текстом "Войти"
    Тогда я жду пока пользователь зайдет в сессию
    То я теперь нахожусь на странице заявок "/appeals"
    То я на ссылку нажму "a" аттрибут "/settings" с текстом "Настройки"
    То я перемещусь на страницу справочники "Справочники:"
    Затем я проверю путь "/settings/topics"
    То я жму ссылку "a" аттрибут "Отчетность" с текстом "Редактировать"
    То откроется форма редактирования тематики "Форма"
    Затем в поле редактирования тематики с айди "add-appeal_title" введу текст "Отчетность edit"
    Затем я  нажму  кнопку с  текстом "Обновить"
    То я вернусь обратно на страницу "/settings/topics"
    То увижу отредактированную тематику "Отчетность edit"
# language: ru

Функционал: edit user role
  Сценарий:
    #  почта пользователя и пароль берется от пользователя которого мы регистирировали ранее
    Дано я нахожусь на странице входа "/auth"
    И почта пользователя "superman@mail.ru" будет введено в поле с айди "login_email"
    Также пароль пользователя "some_password" будет введено в поле с айди "login_password"
    Когда я нажимаю на кнопку с текстом "Войти"
    Тогда я жду пока пользователь зайдет в сессию
    То я теперь нахожусь на странице заявок "/appeals"
    То я жму на ссылку "a" аттрибут "/users" с текстом "Контакты"
    То я нажму ссылку "a" аттрибут "Jhon Doe" с текстом "Редактировать"
    То я перемещусь на страницу редактирования и увижу "Дополнительная информация"
    Когда я нажимаю на текст "Дополнительная информация"
    То я нажму на селект роль "edit-user_userRoleId"
    Допустим выберу роль "admin" из списка ролей "div"
    Затем я нажму кнопку с текстом "Обновить данные"
    То меня переместит на страницу с таблицей "/users/"
    То увижу текст в таблице "Jhon Doe"
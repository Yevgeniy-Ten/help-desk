# language: ru

Функционал: Создание user
  Сценарий:
    #  почта пользователя и пароль берется от пользователя которого мы регистирировали ранее
    Дано я нахожусь на странице входа "/auth"
    И почта пользователя "superman@mail.ru" будет введено в поле с айди "login_email"
    Также пароль пользователя "some_password" будет введено в поле с айди "login_password"
    Когда я нажимаю на кнопку с текстом "Войти"
    Тогда я жду пока пользователь зайдет в сессию
    Когда я нахожусь на странице заявок "/appeals"
    То я нажимаю на ссылку "a" аттрибут "/users" с текстом "Контакты"
    То я перемещусь на страницу контакты "Контакты"
    То я нажму на кнопку с текстом "Создать пользователя"
    То я перемещусь на страницу форма создания "/users/create"
    Затем введу в поле с айди "register_lastName" текст "Jhon"
    Затем введу в поле с айдишником "register_firstName" текст "Doe"
    Затем введу в поле email с айди "register_email" текст "jhondoe@mail.ru"
    Затем введу в поле телефон с айди "register_phoneNumber" номер "+77773332211"
    То я нажимаю на селект комапнии "register_companuId"
    Затем выберу комапнию "BPContact" из списка комапнии "div"
    Затем введу в поле пароля с айди "register_firstName" пароль "123456"
    Когда я нажиму на кнопку с текстом "Создать"
    То меня переместит на страницу "/users"
    То увижу сообщение "Регистрация прошла успешно! Как только вы будете потверждены администратором, то сможете подавать заявки!"
1. Для начала устанавливаем sequeilize-cli для автоматизации работы sequelize библиотеки командой 
   sudo npm install -g sequelize-cli
2. В проекте настроен пользователь который может редактировать базу, чтобы создать пользователя, и дать ему права доступа к базе, прописываем команды:
   * sudo mysql
   * CREATE USER 'esdp-user'@'localhost' IDENTIFIED BY 'esdp-user'
   * GRANT ALL PRIVILEGES ON *.* TO 'esdp-user'@'localhost'
   
3. sequelize db:create  // Команда автоматом создаст sql-базу 
4. sequelize db:drop // Команда автоматом удалит sql-бзау
5. Для генерации новых сущностей можно воспользоваться командой: sequelize model:generate пример использования:
   sequelize model:generate --name User --attributes token:string, first_name:string, last_name:string, role:string email:string, password:string, photo:string
6. Для создания фикстур определенной сущности sequelize-cli seed:generate --name (имя фикстуры)
7. sequelize db:seed:all чтобы запустить фикстуры

Все примеры приведены в проекте.




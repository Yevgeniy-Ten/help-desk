1. Для начала устанавливаем sequeilize-cli для автоматизации работы sequelize библиотеки командой 
   sudo npm install -g sequelize-cli
   
2. В проекте настроен пользователь который может редактировать базу, чтобы создать пользователя, и дать ему права доступа к базе, прописываем команды:
   * sudo mysql
   * CREATE USER 'esdp-user'@'localhost' IDENTIFIED BY 'esdp-user'
   * GRANT ALL PRIVILEGES ON *.* TO 'esdp-user'@'localhost'
   
3. sequeilize db:create  // Команда автоматом создаст sql-базу 
4. sequeilize db:migrate // Команда автоматом создаст все таблицы в базе данных.
5. Для генерации новых сущностей можно воспользоваться командой: sequeilize model:generate пример использования:
   sequelize model:generate --name User --attributes token:string, first_name:string, last_name:string, role:string email:string, password:string, photo:string
6. Для создания фикстур определенной сущности sequelize-cli seed:generate --name (имя фикстуры)
7. sequelize db:seed:all чтобы запустить фикстуры

Все примеры приведены в проекте.




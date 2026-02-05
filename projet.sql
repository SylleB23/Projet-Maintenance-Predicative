CREATE USER if not exists 'malik'@'%' IDENTIFIED BY 'festo';
GRANT ALL PRIVILEGES ON basededonnees.* TO 'malik'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
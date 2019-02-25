-- Create a table to store user accounts in.
CREATE TABLE accounts (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(50) NOT NULL,
	password VARCHAR(255) NOT NULL,
	CONSTRAINT usernameUnique UNIQUE (username)
);


CREATE TABLE movieposts (
	title VARCHAR(50) NOT NULL, 
	post VARCHAR(255) NOT NULL, 
	username VARCHAR(30) NOT NULL
);



-- Create a dummy account for testing.
INSERT INTO accounts (username, password) VALUES ("Alice", "abc123");
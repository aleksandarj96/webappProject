-- Create a table to store user accounts in.
CREATE TABLE accounts (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(50) NOT NULL,
	password VARCHAR(255) NOT NULL,
	CONSTRAINT usernameUnique UNIQUE (username),

);

CREATE TABLE movieposts (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(50) NOT NULL, 
	post VARCHAR(255) NOT NULL, 
	username VARCHAR(50) NOT NULL
);

CREATE TABLE comments (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	comment VARCHAR(255) NOT NULL,
	postid INT UNSIGNED NOT NULL,
	username VARCHAR(50) NOT NULL,
	FOREIGN KEY (postId) REFERENCES movieposts(id),
	FOREIGN KEY (username) REFERENCES accounts(username)
);

SHOW ENGINE INNODB STATUS;
-- Create a dummy account for testing.





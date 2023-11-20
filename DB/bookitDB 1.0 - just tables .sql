CREATE SCHEMA IF NOT EXISTS `bookit`;
USE `bookit`;

CREATE TABLE IF NOT EXISTS users (
	userID INT NOT NULL AUTO_INCREMENT,
	first_name VARCHAR(255) NOT NULL,
	last_name VARCHAR(255) NOT NULL,
	email_address VARCHAR(255) NOT NULL,
	phoneNumber VARCHAR(15),
	PRIMARY KEY (userID)
);
CREATE TABLE IF NOT EXISTS userPassword (
	userID INT NOT NULL,
	passwordHash VARCHAR(255) NOT NULL,
	FOREIGN KEY (userID) REFERENCES users (userID)
);


CREATE TABLE IF NOT EXISTS company (
	companyID INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
	location VARCHAR(255) NOT NULL,
	companyMail VARCHAR(255) UNIQUE, 
	companyDescription TEXT, 
	phoneNumber VARCHAR(15)
);
CREATE TABLE IF NOT EXISTS companyPassword (
	companyID INT NOT NULL, 
	passwordHash VARCHAR(255) NOT NULL, 
	FOREIGN KEY (companyID) REFERENCES company(companyID)
);
CREATE TABLE IF NOT EXISTS employee (
	employeeID INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
	companyID INT NOT NULL, 
	employeeFName VARCHAR(255) NOT NULL, 
	employeeLName VARCHAR(255) NOT NULL
);
CREATE TABLE IF NOT EXISTS companyEmployee (
	companyID INT NOT NULL, 
	employeeID INT NOT NULL, 
	FOREIGN KEY (companyID) REFERENCES company(companyID), 
	FOREIGN KEY (employeeID) REFERENCES employee(employeeID)
);

CREATE TABLE IF NOT EXISTS calendarEvents (
	calendarEventsID INT NOT NULL ,
	companyID INT NOT NULL AUTO_INCREMENT,
	eventName VARCHAR(255) NOT NULL,
	eventDescription TEXT,
	eventDateTime DATETIME NOT NULL,
	duration TIME,
	price INT CHECK (price > 0 ),
	PRIMARY KEY (calendarEventsID),
	FOREIGN KEY (companyID) REFERENCES company (companyID)
);
CREATE TABLE IF NOT EXISTS eventEmployee (
	calendarEventsID INT NOT NULL,
	employeeID INT NOT NULL,
	FOREIGN KEY (calendarEventsID) REFERENCES calendarEvents (calendarEventsID),
	FOREIGN KEY (employeeID) REFERENCES employee (employeeID)
);
CREATE TABLE IF NOT EXISTS userEvents (
	userID INT NOT NULL,
	calendarEventsID INT NOT NULL,
	status ENUM ('ended', 'created', 'waiting', 'accepted', 'denied', 'canceled') NOT NULL DEFAULT 'created',
	FOREIGN KEY (userID) REFERENCES users (userID),
	FOREIGN KEY (calendarEventsID) REFERENCES calendarEvents (calendarEventsID)
);

CREATE TABLE IF NOT EXISTS tags (
tagID INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
tagName VARCHAR(255)
);
CREATE TABLE IF NOT EXISTS companyTags (
companyID INT NOT NULL, 
tagID INT NOT NULL, 
FOREIGN KEY (companyID) REFERENCES company(companyID), 
FOREIGN KEY (tagID) REFERENCES tags(tagID)
);
CREATE TABLE IF NOT EXISTS toAccept (
companyID INT NOT NULL, 
userID INT NOT NULL, 
calendarEventsID INT NOT NULL, 
FOREIGN KEY (companyID) REFERENCES company(companyID), 
FOREIGN KEY (userID) REFERENCES users(userID), 
FOREIGN KEY (calendarEventsID) REFERENCES calendarEvents(calendarEventsID)
);

show tables;
#describe users;
#describe userpassword;

#Insert into users (userID, firstName, lastName, emailAddress, phoneNumber) VALUE ('1', 'Test', 'Testowski', 'aa@bb.c','12345');
#SELECT * FROM users;




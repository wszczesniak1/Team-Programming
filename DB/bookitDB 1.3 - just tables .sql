CREATE SCHEMA IF NOT EXISTS `bookit`;
USE `bookit`;
#w
CREATE TABLE IF NOT EXISTS users (
	userID INT NOT NULL AUTO_INCREMENT,
	firstName VARCHAR(255) NOT NULL,
	lastName VARCHAR(255) NOT NULL,
	emailAddress VARCHAR(255) NOT NULL UNIQUE,
	phoneNumber VARCHAR(15),
	PRIMARY KEY (userID)
);
CREATE TABLE IF NOT EXISTS userpassword (
	userID INT NOT NULL UNIQUE,
	passwordHash VARCHAR(255) NOT NULL,
	FOREIGN KEY (userID) REFERENCES users (userID)
);

#k
CREATE TABLE IF NOT EXISTS company (
	companyID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
   	companyName VARCHAR(255) NOT NULL,
	location VARCHAR(255) NOT NULL,
	companyMail VARCHAR(255) NOT NULL UNIQUE,
	companyDescription TEXT, 
	phoneNumber VARCHAR(15)
);
CREATE TABLE IF NOT EXISTS companypassword (
	companyID INT NOT NULL UNIQUE,
	passwordHash VARCHAR(255) NOT NULL, 
	FOREIGN KEY (companyID) REFERENCES company(companyID)
);
CREATE TABLE IF NOT EXISTS employee (
	employeeID INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
	companyID INT NOT NULL, 
	employeeFName VARCHAR(255) NOT NULL, 
	employeeLName VARCHAR(255) NOT NULL,
	FOREIGN KEY (companyID) REFERENCES company(companyID)
);

#w
CREATE TABLE IF NOT EXISTS eventdetails (
	eventdetailsID INT NOT NULL AUTO_INCREMENT,
	companyID INT NOT NULL,
	eventName VARCHAR(255) NOT NULL,
	eventDescription TEXT,
	duration TIME,
	price INT CHECK (price > 0 ),
	PRIMARY KEY (eventdetailsID),
	FOREIGN KEY (companyID) REFERENCES company (companyID)
);
CREATE TABLE IF NOT EXISTS calendarevents (
	calendarEventsID INT NOT NULL AUTO_INCREMENT,
	eventdetailsID INT NOT NULL,
	eventDateTime DATETIME NOT NULL,
	isAvailable BOOLEAN DEFAULT true,
	PRIMARY KEY (calendarEventsID),
	FOREIGN KEY (eventdetailsID) REFERENCES eventdetails (eventdetailsID)
);
CREATE TABLE IF NOT EXISTS eventemployee (
	calendarEventsID INT NOT NULL,
	employeeID INT NOT NULL,
	FOREIGN KEY (calendarEventsID) REFERENCES calendarEvents (calendarEventsID),
	FOREIGN KEY (employeeID) REFERENCES employee (employeeID)
);
CREATE TABLE IF NOT EXISTS userevents (
	userID INT NOT NULL,
	calendarEventsID INT NOT NULL UNIQUE,
	status ENUM ('ended', 'created', 'waiting', 'accepted', 'denied', 'canceled') NOT NULL DEFAULT 'created',
	FOREIGN KEY (userID) REFERENCES users (userID),
	FOREIGN KEY (calendarEventsID) REFERENCES calendarEvents (calendarEventsID)
);

#k
CREATE TABLE IF NOT EXISTS tags (
tagID INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
tagName VARCHAR(255)
);
CREATE TABLE IF NOT EXISTS companytags (
companyID INT NOT NULL, 
tagID INT NOT NULL, 
FOREIGN KEY (companyID) REFERENCES company(companyID), 
FOREIGN KEY (tagID) REFERENCES tags(tagID)
);
CREATE TABLE IF NOT EXISTS toaccept (
companyID INT NOT NULL, 
userID INT NOT NULL, 
calendarEventsID INT NOT NULL UNIQUE,
FOREIGN KEY (companyID) REFERENCES company(companyID), 
FOREIGN KEY (userID) REFERENCES users(userID), 
FOREIGN KEY (calendarEventsID) REFERENCES calendarEvents(calendarEventsID)
);

show tables;
#describe users;
#describe userpassword;

#Insert into users (userID, firstName, lastName, emailAddress, phoneNumber) VALUE ('1', 'Test', 'Testowski', 'aa@bb.c','12345');
#SELECT * FROM users;




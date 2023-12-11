CREATE SCHEMA IF NOT EXISTS `bookit`;
USE `bookit`;

CREATE TABLE IF NOT EXISTS users (
	userID INT NOT NULL AUTO_INCREMENT,
	first_name VARCHAR(255) NOT NULL,
	last_name VARCHAR(255) NOT NULL,
	email_address VARCHAR(255) NOT NULL UNIQUE,
	phoneNumber VARCHAR(15),
	PRIMARY KEY (userID)
);
CREATE TABLE IF NOT EXISTS userpassword (
	userID INT NOT NULL UNIQUE,
	passwordHash VARCHAR(255) NOT NULL,
	FOREIGN KEY (userID) REFERENCES users (userID)
);


CREATE TABLE IF NOT EXISTS company (
	companyID INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
	location VARCHAR(255) NOT NULL,
	companyMail VARCHAR(255) NOT NULL UNIQUE, 
	companyDescription TEXT, 
	phoneNumber VARCHAR(15)
);
CREATE TABLE IF NOT EXISTS companyPassword (
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


CREATE TABLE IF NOT EXISTS eventEmployee (
	calendarEventsID INT NOT NULL,
	employeeID INT NOT NULL,
	FOREIGN KEY (calendarEventsID) REFERENCES calendarEvents (calendarEventsID),
	FOREIGN KEY (employeeID) REFERENCES employee (employeeID)
);
CREATE TABLE IF NOT EXISTS userEvents (
	userID INT NOT NULL,
	calendarEventsID INT NOT NULL UNIQUE,
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

DROP TRIGGER IF EXISTS tadd_calendarevents;
DELIMITER $$
CREATE TRIGGER tadd_calendarevents
    BEFORE INSERT ON calendarevents
    FOR EACH ROW
BEGIN
 IF NEW.eventDateTime <= NOW() THEN
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Event needs to be in the future';
 END IF;
END $$
DELIMITER ;

DROP TRIGGER IF EXISTS tdelete_user;
DELIMITER $$
CREATE TRIGGER tdelete_user
    BEFORE DELETE ON users
    FOR EACH ROW
BEGIN
DELETE FROM userpassword WHERE userID = OLD.userID;
DELETE FROM userevents WHERE userID = OLD.userID;
DELETE FROM toaccept WHERE userID = OLD.userID;
END $$
DELIMITER ;

DROP TRIGGER IF EXISTS tdelete_calendarevents;
DELIMITER $$
CREATE TRIGGER tdelete_calendarevents
    BEFORE DELETE ON calendarevents
    FOR EACH ROW
BEGIN
DELETE FROM userevents WHERE calendarEventsID = OLD.calendarEventsID;
DELETE FROM toaccept WHERE calendarEventsID = OLD.calendarEventsID;
DELETE FROM eventemployee WHERE calendarEventsID = OLD.calendarEventsID;
END $$
DELIMITER ;

DROP TRIGGER IF EXISTS tdelete_userevents;
DELIMITER $$
CREATE TRIGGER tdelete_userevents
    AFTER DELETE ON userevents
    FOR EACH ROW
BEGIN
DELETE FROM toaccept WHERE userID = OLD.userID AND calendarEventsID = OLD.calendarEventsID;
END $$
DELIMITER ;

DROP TRIGGER IF EXISTS tadd_userevent;
DELIMITER $$
CREATE TRIGGER tadd_userevent
    BEFORE INSERT ON userevents
    FOR EACH ROW
BEGIN
	DECLARE evAvail BOOLEAN;
	SELECT 	isAvailable INTO evAvail FROM calendarevents WHERE calendarEventsID = NEW.calendarEventsID;
    IF NEW.status IN ('denied', 'canceled') THEN
			SELECT 	isAvailable INTO evAvail FROM calendarevents WHERE calendarEventsID = NEW.calendarEventsID;
    ELSE
		IF evAvail = 1 THEN
				UPDATE calendarevents SET isAvailable = 0 WHERE calendarEventsID = NEW.calendarEventsID;
		ELSE
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Event is not available';
		END IF;
	END IF;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS add_caleventWITHevemployee;
DELIMITER $$
CREATE PROCEDURE add_caleventWITHevemployee(
IN PeventdetailsID INT, PeventDateTime DATETIME, PemployeeID INT)
BEGIN
DECLARE eID INT;
DECLARE EXIT HANDLER FOR SQLEXCEPTION
        	BEGIN
            		ROLLBACK;
            		RESIGNAL;
        	END;
	START TRANSACTION;
INSERT INTO calendarevents (eventdetailsID, eventDateTime) VALUES (PeventdetailsID, PeventDateTime);
   		SET eID = LAST_INSERT_ID();
		INSERT INTO eventemployee (calendarEventsID, employeeID) VALUES (eID, PemployeeID);
	COMMIT;
END$$
DELIMITER ;


DROP PROCEDURE IF EXISTS add_userWITHpassword;
DELIMITER $$
CREATE PROCEDURE add_userWITHpassword(
IN PfirstName VARCHAR(255), PlastName VARCHAR(255), PemailAddress VARCHAR(255),   PphoneNumber VARCHAR(255), PpassHash VARCHAR(255))
BEGIN
	   DECLARE uID INT;
DECLARE EXIT HANDLER FOR SQLEXCEPTION
        	BEGIN
            		ROLLBACK;
            		RESIGNAL;
        	END;
	START TRANSACTION;
INSERT INTO users (firstName, lastName, emailAddress, phoneNumber) VALUES (PfirstName, PlastName, PemailAddress, PphoneNumber);
   		SET uID = LAST_INSERT_ID();
		INSERT INTO userpassword (userID, passwordHash) VALUES (uID, PpassHash);
	COMMIT;
END$$
DELIMITER ;

DROP PROCEDURE IF EXISTS add_usereventWITHquestion;
DELIMITER $$
CREATE PROCEDURE add_usereventWITHquestion(
IN PuserID INT, PcalendarEventsID INT)
BEGIN
DECLARE compID INT;
DECLARE EXIT HANDLER FOR SQLEXCEPTION
        	BEGIN
            		ROLLBACK;
            		RESIGNAL;
        	END;
	START TRANSACTION;
SELECT ed.companyID INTO compID FROM eventdetails ed
JOIN calendarevents ce ON ed.eventdetailsID = ce.eventdetailsID
WHERE ce.calendarEventsID = PcalendarEventsID;
    		INSERT INTO toaccept(companyID, userID, calendarEventsID) VALUES (compID, PuserID, PcalendarEventsID);
INSERT INTO userevents (userID, calendarEventsID, status) VALUES (PuserID, PcalendarEventsID, 'waiting');
	COMMIT;
END$$
DELIMITER ;


DROP PROCEDURE IF EXISTS add_caleventANDemployee;
DELIMITER $$
CREATE PROCEDURE add_caleventANDemployee(
IN  PeventdetailsID INT, PeventDateTime DATETIME, PcompanyID int, PemployeeFName VARCHAR(255), PemployeeLName VARCHAR(255))
BEGIN
    	DECLARE cID INT;
    	DECLARE eID INT;
DECLARE EXIT HANDLER FOR SQLEXCEPTION
        	BEGIN
            		ROLLBACK;
            		RESIGNAL;
        	END;
START TRANSACTION;
INSERT INTO calendarevents (eventdetailsID, eventDateTime) VALUES (PeventdetailsID, PeventDateTime);
    		SET cID = LAST_INSERT_ID();
INSERT INTO employee (companyID, employeeFName, employeeLName) VALUES (PcompanyID, PemployeeFName, PemployeeLName);
    		SET eID = LAST_INSERT_ID();
		INSERT INTO eventemployee (calendarEventsID, employeeID) VALUES (cID, eID);
COMMIT;
END$$
DELIMITER ;
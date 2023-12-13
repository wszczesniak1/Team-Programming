CREATE VIEW v AS (SELECT e.eventdetailsID, e.eventName, c.companyDescription, e.eventDescription, ce.eventDateTime, e.duration, e.price FROM eventdetails e LEFT JOIN company c ON e.companyID = c.companyID LEFT JOIN calendarevents ce ON e.eventdetailsID = ce.eventdetailsID);

DROP PROCEDURE IF EXISTS display_event_info;
DELIMITER $$
CREATE PROCEDURE display_event_info(IN p_eventdetailsID INT)
BEGIN
SELECT * FROM v WHERE v.eventdetailsID = p_eventdetailsID;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS add_employee;
DELIMITER $$
CREATE PROCEDURE add_employee_to_company(IN p_companyID INT, p_employeeFName  VARCHAR(255), p_employeeLName  VARCHAR(255))
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
        BEGIN
            ROLLBACK;
            RESIGNAL;
        END;
        START TRANSACTION;
	INSERT INTO employee (companyID, employeeFName, employeeLName) VALUES (p_companyID, p_employeeFName, p_employeeLName);
        COMMIT WORK;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS add_company;
DELIMITER $$
CREATE PROCEDURE add_company(IN p_passwordHash VARCHAR(255), p_location VARCHAR(255), p_companyMail VARCHAR(255), p_companyDescription TEXT, p_phoneNumber VARCHAR(15))
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
        BEGIN
            ROLLBACK;
            RESIGNAL;
        END;
        START TRANSACTION;
 	INSERT INTO company (location, companyMail, companyDescription, phoneNumber)
    	VALUES (p_location, p_companyMail, p_companyDescription, p_phoneNumber);

    	INSERT INTO companyPassword (companyID, passwordHash)
    	VALUES (LAST_INSERT_ID(), p_passwordHash);
        COMMIT WORK;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS change_event_status;
DELIMITER $$
CREATE PROCEDURE change_event_status(IN p_calendarEventsID INT, p_st ENUM('ended', 'created', 'waiting', 'accepted', 'denied', 'canceled'))
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
        BEGIN
            ROLLBACK;
            RESIGNAL;
        END;
        START TRANSACTION;
	UPDATE userevents SET status = p_st WHERE userevents.calendarEventsID = p_calendarEventsID;
	IF p_st IN ('denied', 'canceled') THEN
		UPDATE calendarevents SET isAvailable = 1 WHERE calendarevents.calendarEventsID = p_calendarEventsID; 
	ELSEIF p_st IN ('created', 'waiting') THEN
		UPDATE calendarevents SET isAvailable = 0 WHERE calendarevents.calendarEventsID = p_calendarEventsID;
	ELSE
		UPDATE calendarevents SET isAvailable = 0 WHERE calendarevents.calendarEventsID = p_calendarEventsID;
		DELETE FROM toaccept WHERE toaccept.calendarEventsID = p_calendarEventsID;
	END IF;
        COMMIT WORK;
END $$
DELIMITER ;


DROP PROCEDURE IF EXISTS add_event;
DELIMITER $$
CREATE PROCEDURE add_event(IN companyID INT, eventName VARCHAR(255), eventDescription TEXT, duration TIME, price INT, eventDateTime DATETIME, isAvailable TINYINT(1), employeeID INT)
BEGIN
     DECLARE eventdID INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
        BEGIN
            ROLLBACK;
            RESIGNAL;
        END;
        START TRANSACTION;
        INSERT INTO eventdetails (companyID, eventName, eventDescription, duration, price) VALUES (companyID, eventName, eventDescription, duration, price);
         SET eventdID = LAST_INSERT_ID();
        INSERT INTO calendarevents (eventdetailsID, eventDateTime, isAvailable) VALUES (eventdID, eventDateTime, isAvailable);
        INSERT INTO eventemployee (calendarEventsID, employeeID) VALUES (eventdID, employeeID);
        COMMIT WORK;
END $$
DELIMITER ;

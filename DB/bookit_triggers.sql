DROP TRIGGER IF EXISTS tdelete_employee;
DELIMITER $$
CREATE TRIGGER delete_employee
BEFORE DELETE ON employee
FOR EACH ROW
BEGIN
DELETE FROM eventemployee WHERE OLD.employeeID = employeeID;
END $$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER delete_company
AFTER DELETE ON company
FOR EACH ROW
BEGIN
DELETE FROM employee WHERE OLD.companyID = companyID;
DELETE FROM companytags WHERE OLD.companyID = companyID;
DELETE FROM eventdetails WHERE OLD.companyID = companyID;
DELETE FROM companypassword WHERE OLD.companyID = companyID;
DELETE FROM toaccept WHERE OLD.companyID = companyID;
END $$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER delete_tags
BEFORE DELETE ON tags
FOR EACH ROW
BEGIN
DELETE FROM companytags WHERE OLD.tagID = tagID;
END $$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER delete_event_details
BEFORE DELETE ON teventdetails
FOR EACH ROW
BEGIN
DELETE FROM calendarevents WHERE OLD.eventdetailsID = eventdetailsID;
END $$
DELIMITER ;

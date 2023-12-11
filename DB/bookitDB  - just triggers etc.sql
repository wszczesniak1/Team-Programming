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
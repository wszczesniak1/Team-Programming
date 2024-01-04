INSERT INTO users (userID, firstName, lastName, emailAddress, phoneNumber) VALUES ('1', 'Test', 'Testowski', 'aa@bb.c', '123456789');
INSERT INTO users (firstName, lastName, emailAddress, phoneNumber) VALUES ('Anna', 'Nowak', 'annaNow@cos.pl','666879111' ), ('Janusz', 'Kowalski', 'ba@bbb.c', '112233456'), ('Adam', 'Małysz', 'nie@skoczek.sad', '234565432'), ('Anna', 'Gbur', 'gbur@bogrur.c', null);

INSERT INTO company (companyID ,companyName, location, companyMail, companyDescription, phoneNumber) VALUE ('1','FirmaTest', 'Pogodna 14, Wrocław', 'firma@mail', 'to test', '111222333');
INSERT INTO company (companyName, location, companyMail, companyDescription, phoneNumber) VALUES ('Solarix','Upalna 3, Wrocław', 'solarix@mail.pl', 'Solarne miejsce','333444555'), ('Fryzjerix','Parkowa 5, Wrocław', 'fryzjerix@mail.pl', 'Same super fryzury','999887766');

INSERT INTO employee (employeeID, companyID, employeeFName, employeeLName) VALUES ('1','1','Testa', 'Testowa'); 
INSERT INTO employee (companyID, employeeFName, employeeLName) VALUES ('1','Tte', 'Testowany'), ('2','Asia', 'Tomczyk'), ('3','Michael', 'Angel'), ('3','Angela', 'Dwujniak'), ('3','Ejdżej', 'Koszar');

INSERT INTO eventdetails (eventdetailsID, companyID, eventName, eventDescription, duration, price) VALUE ('1', '1', 'Testowannie Testów', 'to taki test', '00:05:00', '15'); 
INSERT INTO eventdetails (companyID, eventName, eventDescription, duration, price) VALUES ('2', 'solarium 15min', 'cos', '00:15:00', '15'), ('3', 'strzyzenie', 'skrocenie włosów z myciem', '01:25:00', '150'), ('3', 'mycie', null, '00:30:00', '20'), ('3', 'upiecie', 'nowe uczesanie', '02:00:00', '100');

INSERT INTO calendarevents (calendarEventsID, eventdetailsID, eventDateTime) VALUE ('1', '1', '2024-01-13 14:00:00');
INSERT INTO calendarevents (eventdetailsID, eventDateTime) VALUES ('2', '2024-01-21 12:00:00'), ('2', '2024-02-12 14:05:00'), ('3', '2024-02-01 08:45:00'), ('3', '2024-02-01 10:45:00'), ('4', '2024-01-22 08:40:00');

INSERT INTO eventemployee (calendarEventsID, employeeID) VALUE ('1', '1');
INSERT INTO eventemployee (calendarEventsID, employeeID) VALUES ('2', '3'), ('3', '3'), ('4', '5'), ('5', '4'), ('6', '5'), ('6', '6');

INSERT INTO userevents (userID, calendarEventsID, status) VALUE ('1', '1', 'denied');
INSERT INTO userevents (userID, calendarEventsID, status) VALUES ('2', '2', default),  ('2', '6', default);

INSERT INTO toaccept (companyID, userID, calendarEventsID) VALUES ('2', '2', '2'), ('3', '2', '6');

INSERT INTO tags (tagID, tagName) VALUE ('1', 'testowyTag');
INSERT INTO tags (tagName) VALUES ('fryzjer'),('inne');

INSERT INTO companytags (companyID, tagID) VALUES ('1','1'), ('2','3'), ('3','2');

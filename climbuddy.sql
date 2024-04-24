CREATE DATABASE climbuddy;
CREATE USER db_user WITH ENCRYPTED PASSWORD 'example';
\c climbuddy;
GRANT ALL ON SCHEMA public TO db_user;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE gyms(
 id SERIAL PRIMARY KEY,
 gymname TEXT,
 address TEXT,
 openingghours TEXT,
 resetdate DATE
);

CREATE TABLE passes(
 username VARCHAR(20),
 purchasedate DATE,
 expirydate DATE,
 costprice SMALLINT,
 sellingprice SMALLINT,
 quantity SMALLINT,
 gymid INTEGER NOT NULL,
 CONSTRAINT fk_gym FOREIGN KEY (gymid) REFERENCES gyms(id)
);

CREATE TABLE sessions(
 id SERIAL PRIMARY KEY,
 sessiondate DATE,
 hostname VARCHAR(20),
 attendee VARCHAR(20),
 gymid INTEGER NOT NULL,
 CONSTRAINT fk_gym FOREIGN KEY (gymid) REFERENCES gyms(id)
);

CREATE TABLE users(
 username VARCHAR(20) PRIMARY KEY,
 password VARCHAR(50),
 gymid INTEGER NOT NULL,
 sessionid INTEGER NOT NULL,
 CONSTRAINT fk_gym FOREIGN KEY (gymid) REFERENCES gyms(id),
 CONSTRAINT fk_session FOREIGN KEY (sessionid) REFERENCES sessions(id)
);

CREATE TABLE roles(
 role VARCHAR(10) PRIMARY KEY
);

INSERT INTO roles(role) VALUES ('user'),('admin');

INSERT INTO gyms(gymname, address, openingghours) VALUES
	('Adventure HQ', '"2 Yishun Walk, Singapore 767944"', '"Mon Closed; Tue-Fri 2pm-9.30pm; Sat-Sun,PH 10am-9.30pm"'),
	('Arête by Upwall', '"5 Changi Business Park Central 1, #02 14/15/16, Singapore 486038"', 'Mon-Fri 11am-10.30pm; Sat 9.30am-10.30pm; Sun 9.30am-8pm'),
	('Ark Bloc', '"6 Tebing Lane, #01-05, Singapore 828835"', '"Mon-Fri 8am-12pm, 3pm-10pm; Sat-Sun 10am-10pm"'),
	('BFF Climb @ Bendemeer', '"2 Kallang Ave, #01-20 CT Hub @ Kallang, Singapore 339407"', 'Mon 5pm-10.30pm; Tue-Fri 10.30am-10.30pm; Sat-Sun 10am-9pm'),
	('BFF Climb @ Our Tampines Hub', '"#02-81, Our Tampines Hub, 1 Tampines Walk, Singapore 528523"', 'Daily 9.30am - 10.45pm'),
	('BFF Climb @ yo:HA', '"#03-06 Tampines Street 92, yo:HA Commercial @ Tampines, Singapore"', 'Mon - Sun (except Thurs): 9.30am - 10.45pm; Thurs: 5pm - 10.45pm'),
	('Boruda', '991A Alexandra Road #02-06/07 Singapore 119969', '"Mon 1.30pm-10.30pm; Tue-Fri 11.30am-10.30pm; Sat-Sun,PH 9am-9pm"'),
	('Boulder Movement (Bugis+)', '"201 Victoria Street #05-07, Bugis+ Singapore 188067"', '"Mon 5.30pm-10pm; Tue-Fri 12pm-10pm; Sat-Sun,PH 10am-8pm"'),
	('Boulder Movement (OUE Downtown)', '"#B1-03 OUE Downtown, 6A Shenton Way, Singapore 068815"', '"Mon 5.30pm-10pm; Tue-Fri 12pm-10pm; Sat-Sun,PH 10am-8pm"'),
	('Boulder Movement (Tai Seng)', '"#01-09 Mapletree, 18 Tai Seng Street, Singapore 539775"', '"Mon 5.30pm-10pm; Tue-Fri 12pm-10pm; Sat-Sun,PH 10am-8pm"'),
	('Boulder Movement (Tekka Place)', '"2 Serangoon Road #02-12, Tekka Place Singapore 218227"', '"Mon 5.30pm-10pm; Tue-Fri 12pm-10pm; Wed 9am-10pm; Sat-Sun,PH 10am-8pm"'),
	('Boulder Planet (Sembawang)', '"#B1-22/23, Sembawang Shopping Centre, 604 Sembawang Road, Singapore 758459"', '"Mon-Fri 10am-10pm, Sat-Sun 10am-09pm"'),
	('Boulder Planet (Tai Seng)', '"601 MacPherson Rd, #02-07 Grantral Mall, Singapore 368242"', '"Mon-Fri 10am-10pm, Sat-Sun 10am-09pm"'),
	('Boulder World (Paragon)', '"290 Orchard Rd, #06-25/26 Paragon Shopping Centre, Singapore 238859"', 'Mon-Fri 9am-10.30pm; Sat-Sun 9am-10.30pm'),
	('Boulder+ (Aperia)', '"#03-17 The Aperia Mall, 12 Kallang Ave, 339511"', '"Mon 12.30pm-10pm, Tues-Fri 7.30am-10pm, Sat 8am-8pm; Sun 8am-5pm"'),
	('Boulder+ (The Chevrons)', '48 Boon Lay Way #04-01 Singapore 609961', '"Mon 12pm-10pm, Tues-Fri 07:30am-10pm, Sat-Sun 8am-8pm"'),
	('Boys Town Adventure Centre', '624 Upper Bukit Timah Singapore 678212', 'Wed 6.00pm to 10.00pm'),
	('Climb Central (Funan)', '"#B2-19/21 Funan Mall, 107 North Bridge Road, Singapore 179105"', 'Mon-Fri 10am-11pm; Sat-Sun 9am-9pm'),
	('Climb Central (i12 Katong)', '"i12 Katong 112 East Coast Road, #04-01/02 Singapore 428802"', 'Mon-Fri 1pm-8pm; Sat-Sun 9am-9pm'),
	('Climb Central (Kallang Wave Mall)', '"#B1-01 Kallang Wave Mall, 1 Stadium Pl, Singapore 397718"', 'Mon-Fri 11am-11pm; Sat-Sun 9am-9pm'),
	('Climb Central (Novena Square)', '"#03-23 Novena Square, 238 Thomson Road, Singapore 307683"', 'Mon-Fri 11am-11pm; Sat-Sun 9am-9pm'),
	('Climb Central (SAFRA Choa Chu Kang)', '"28 Choa Chu Kang Dr, Singapore 689964"', 'Mon-Fri 11am-11pm; Sat-Sun 9am-9pm'),
	('Climb@T3', '"Airport Boulevard, Changi Airport Terminal 3, #B3-01/02, Singapore 819663"', 'Mon-Fri 12pm-09.30pm; Sat-Sun 10am-09.30pm'),
	('Climba Gym', '"61 Robinson Road, Singapore"', 'Mon-Fri 11am-10pm ; Sat/PH 10am-6pm ; Sun 10am-pm'),
	('Fit Bloc (Depot Heights)', '"108 Depot Rd, #02-01, Singapore 100108"', 'Daily 10am-10.30pm'),
	('Fit Bloc (Kent Ridge)', '"#03-02 The Oasis, 87 Science Park Dr, Singapore 118260"', 'Daily 9.30am-10.30pm'),
	('Ground Up Climbing', '"Level 2, Civil Service Club, 60 Tessensohn Road, 217664"', 'Mon 5pm-11pm; Tues-Fri 12pm-11pm; Sat-Sun 10am-9pm'),
	('Kinetics Climbing', '"511 Serangoon Rd, Singapore 218153"', 'Mon 4pm-10pm; Tues-Fri 1pm-10pm; Sat-Sun 10am-7pm'),
	('Lighthouse Climbing', '"Block B-02, 44 Pasir Panjang Road, Singapore 118504"', 'Mon-Fri 9.30am-10.15pm; Sat-Sun 9.30am-9.15pm'),
	('Outpost Climbing', '"464 Crawford Lane, Singapore"', '"Mon,Wed-Fri 2-10pm ; Tue 5-10pm ; Sat-Sun 9.30am-9pm"'),
	('OYEYO Bouldering Home', '"148 Mackenzie Rd, Singapore 228724"', 'Mon-Fri 1pm-11pm; Sat-Sun 10am-9pm'),
	('Project Send', '8 RAFFLES AVENUE #02-29 ESPLANADE MALL SINGAPORE (039802)', 'Mon-Thu 10.30am-1.30am; Fri-Sat 6.30am-9.30pm; Sun Closed'),
	('SAFRA Yishun Adventure Sports Centre', '"SAFRA Yishun, 60 Yishun Avenue 4, Singapore 769027"', 'Mon-Thurs Closed; Friday 1pm-10pm; Sat-Sun 9am-6pm'),
	('The Cliff @ SnowCity', '"Snow City, 21 Jurong Town Hall Rd, Singapore 609433"', 'Sat-Sun 10am-6pm'),
	('UpWall Climbing', '"#01-105, E!Hub@Downtown East, 1 Pasir Ris Close, Singapore 519599"', 'Mon-Fri 10am-10pm; Sat-Sun 9am-9pm'),
	('Z-Vertigo Boulder Gym', '"#B2-20B, Bukit Timah Shopping Centre, 170 Upper Bukit Timah Road, Singapore 588179"', '"Mon-Thu 11.30pm-10pm, Fri 3pm-10pm, Sat-Sun 10am-8.30pm"');


GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO db_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO db_user;

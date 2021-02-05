-- Seed data with a fake users for testing
INSERT INTO users (name,email,entries,pet,age,joined) VALUES
	 ('em','em@em.com',0,'',0,'2021-01-30 18:47:52.815'),
	 ('bob','bob@em.com',0,'',0,'2021-01-30 18:48:15.459'),
	 ('Spags','spags@bigsky.com',0,'Mr. Wiggles',5,'2021-01-30 18:48:54.900');

INSERT INTO public.login (hash,email) VALUES
	 ('$2a$10$O1skZofLa3McwA2PiXzb0OrGqMUmMdsDbiRUxxkI9pfpMO9HTcoHW','em@em.com'),
	 ('$2a$10$5Ab2KdvMSrsDYip/tPtijed//3Lrf951W9vBcL38fO441LxE0Cc/e','bob@em.com'),
	 ('$2a$10$53iqVVtoajkBydeJRczP3eAEuxlUsncnPkXDkC7Zi./PU2l5tpGf2','spags@bigsky.com');

   --- all paswords are 1234
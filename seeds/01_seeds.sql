-- insert into users (name, email, password)
-- values ('jeff', 'aertaert@g.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
-- ('joe mamma', 'fff@w.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
-- ('deez', 'hi@q.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

-- insert into properties (owner_id, title, description, thumbnail_photo_url,cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
-- values (2, 'big house', 'desc.', 'lol.com', 'mainlol.com', 50, 5, 200, 1, 'spain', 'the hood st.', 'los angeles', 'saskatchewan', '90210'),
-- (2, 'small house', 'desc.', 'losl.com', 'mainol7.com', 50, 5, 200, 1, 'spain', 'the hood st.', 'los angeles', 'saskatchewan', '90210'),
-- (2, 'round house', 'desc.', 'lolf.com', 'main1.com', 50, 5, 200, 1, 'spain', 'the hood st.', 'los angeles', 'saskatchewan', '90210');

-- insert into reservations 
-- (start_date, end_date, property_id, guest_id)
-- values ('1940-02-02', '2024-01-01', 1, 3),
-- ('1940-02-02', '2021-01-01', 1, 3),
-- ('1942-02-02', '2024-01-01', 1, 3);


-- insert into property_reviews (guest_id, property_id, reservation_id, rating, message)
-- values (1, 1, 3, 0, 'hi'), (2, 1, 3, 0, 'hi'), (1, 1, 3, 0, 'bye');
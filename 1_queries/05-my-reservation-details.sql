--Show all reservations for a user.
-- Select the reservation id, property title, reservation start_date, property cost_per_night and the average rating of the property. You'll need data from both the reservations and properties tables.
-- The reservations will be for a single user, so just use 1 for the user_id.
-- Order the results from the earliest start_date to the most recent start_date.
-- Limit the results to 10.

--    id | title| cost_per_night | start_date |average_rating  

select reservations.id as reservation_id, properties.title, properties.cost_per_night, reservations.start_date, avg(property_reviews.rating)

from reservations join properties on property_id = properties.id
join property_reviews on properties.id = property_reviews.property_id

where reservations.guest_id = 71
group by reservations.id, properties.title, properties.cost_per_night
order by reservations.start_date limit 10;
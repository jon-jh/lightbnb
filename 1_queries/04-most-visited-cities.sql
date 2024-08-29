-- Get a list of the most visited cities.

-- Select the name of the city and the number of reservations for that city.
-- Order the results from highest number of reservations to lowest number of reservations.
--city | total_reservations

select city as name, count(reservations.id) as total_reservations
from properties join reservations
on properties.id = reservations.property_id
group by city
order by total_reservations desc;
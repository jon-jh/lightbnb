-- Show specific details about properties located in Vancouver including their average rating.

-- Select the id, title, cost_per_night, and an average_rating from the properties table for properties located in Vancouver.
-- Order the results from lowest cost_per_night to highest cost_per_night.
-- Limit the number of results to 10.
-- Only show listings that have a rating >= 4 stars.

select city, properties.id, title, cost_per_night, avg(property_reviews.rating) as average_rating
from properties
join property_reviews on property_id = properties.id
where city like '%ancouver%'
group by properties.id
having avg(property_reviews.rating) >= 4
order by cost_per_night
limit 10;
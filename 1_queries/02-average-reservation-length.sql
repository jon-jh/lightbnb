--Our product managers want a query to see the average duration of a reservation.

select avg(end_date-start_date) 
as average_duration from reservations;
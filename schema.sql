DELETE DATABASE IF EXISTS workout_tracker;
CREATE DATABASE workout_tracker;

CREATE TABLE workout(
    id serial PRIMARY KEY,
    the_day date,
    type_workout VARCHAR(20),
    exercises text,
    length_hour integer,
    length_min integer
);
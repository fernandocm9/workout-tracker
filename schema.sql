DELETE DATABASE IF EXISTS workout_tracker;
CREATE DATABASE workout_tracker;

DROP TABLE IF EXISTS workout;

CREATE TABLE workout(
    id serial PRIMARY KEY,
    the_day date,
    type_workout VARCHAR(20),
    exercise text,
    sets integer,
    reps integer
);
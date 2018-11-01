-- SQL Instructions for Postgres
-- Create two Databases one for prod and test
CREATE DATABASE thermostat;
CREATE DATABASE thermostat_test;
-- Create Tables
CREATE TABLE temperature(id SERIAL PRIMARY KEY, temp integer, energy_usage_rank integer, energy_usage_text varchar(60), temp_changed_on timestamp);

const fs = require('fs');
const path = require('path');

let query = `
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;


CREATE TABLE public.users (
    id uuid NOT NULL,
    first_name varchar(255),
    last_name varchar(255),
    email varchar(255),
    password varchar(255)
);

ALTER TABLE public.users OWNER TO "manedurphy";


CREATE TABLE public.reviews (
    id uuid NOT NULL,
    date date,
    rating integer,
    content character varying(255),
    space integer,
    user_id uuid
);


ALTER TABLE public.reviews OWNER TO "manedurphy";
`;

fs.writeFile(path.join(__dirname, '..', 'dumps', 'head.sql'), query, (err) => {
    if (err) throw err;

    console.log('DONE!');
});

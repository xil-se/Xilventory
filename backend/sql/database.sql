-- remove for producton

DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS unit;
DROP TABLE IF EXISTS images;

-- //

CREATE TABLE IF NOT EXISTS locations (
	id serial primary key,
	parent_id integer,
	name text,
	notes text
);

CREATE TABLE IF NOT EXISTS items (
	id serial primary key,
	location_id integer,
	price integer,
	quantity integer,
	unit_id integer,
	name text
);

CREATE TABLE IF NOT EXISTS orders (
	items_id integer,
	user_id integer,
	store text,
	url text,
	sn text,
	price integer, -- CONVERTED TO SEK?
	quantity integer
);

CREATE TABLE IF NOT EXISTS unit (
	id serial primary key,
	name TEXT
);

CREATE TABLE IF NOT EXISTS images (
	items_id integer,
	user_id integer,
	url text
);

CREATE OR REPLACE FUNCTION get_location(child_id integer)
	RETURNS TEXT
	LANGUAGE plpgsql
	AS $$
DECLARE 
	ret TEXT;
BEGIN
	WITH RECURSIVE search_graph(id, link, data, depth) AS (
		SELECT g.id, g.parent_id, g.name, 1
		FROM locations g WHERE id = child_id
      		UNION ALL
        	SELECT g.id, g.parent_id, g.name, sg.depth + 1
        	FROM locations g, search_graph sg
        	WHERE g.id = sg.link
	)
	SELECT json_agg(data  ORDER BY depth DESC) FROM search_graph LIMIT 10 INTO ret;

	RETURN ret;
END;
$$;



INSERT INTO locations (parent_id, name) VALUES (null, 'Hackerspace');
INSERT INTO locations (parent_id, name) VALUES (1, 'Rack 1');
INSERT INTO locations (parent_id, name) VALUES (2, 'Box 1');

INSERT INTO locations (parent_id, name) VALUES (1, 'Rack 2');
INSERT INTO locations (parent_id, name) VALUES (4, 'Box 2');


INSERT INTO items (location_id, price, quantity, name) VALUES (3, 10, 10, 'Item 1');
INSERT INTO items (location_id, price, quantity, name) VALUES (3, 10, 10, 'Item 2');
INSERT INTO items (location_id, price, quantity, name) VALUES (5, 10, 10, 'Item somewherelese');


GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public  TO xilventory;


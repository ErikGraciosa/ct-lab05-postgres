DROP TABLE IF EXISTS pinballs;

CREATE TABLE pinballs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    manufacturer TEXT NOT NULL,
    manufactureryear BIGINT NOT NULL,
    multiball BOOLEAN
);


const fs = require('fs');
const path = require('path');

const query = `
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT users_fkey
    FOREIGN KEY (user_id)
    REFERENCES public.users (id)
    ON DELETE CASCADE;

CREATE INDEX space_idx ON public.reviews USING hash (space);
`;

fs.writeFile(path.join(__dirname, '..', 'dumps', 'foot.sql'), query, (err) => {
    if (err) throw err;

    console.log('DONE!');
});

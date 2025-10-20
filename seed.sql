
CREATE TABLE realms (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  description TEXT
);


CREATE TABLE events (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  description TEXT,
  date DATE,
  realm_id INT REFERENCES realms(id)
);



INSERT INTO realms (name, description) VALUES
('Neverland', 'A magical land with fairies and pirates.'),
('Wonderland', 'A strange and whimsical world.'),
('Atlantis', 'A lost underwater city.'),
('Valhalla', 'The majestic hall of warriors.'),
('Narnia', 'A land of talking animals and magic.'),
('Floating Isles', 'Mystical floating islands in the sky.'),
('Crystal Caverns', 'Caves sparkling with crystals and magic.');


INSERT INTO events (title, description, date, realm_id) VALUES
('Festival of Lights', 'A magical festival full of lights and fireworks.', '2025-12-01', 1),     
('Tea Party', 'A whimsical tea party with talking animals.', '2025-11-20', 2),     
('Underwater Parade', 'Atlantis celebrates with an underwater parade of sea creatures.', '2025-10-10', 3),
('Royal Ball', 'A grand ball for all the citizens of Valhalla.', '2025-11-20', 4),             
('Winter Magic Fair', 'A winter fair with magical creatures and games.', '2025-12-15', 5),      
('Sky Festival', 'Floating Isles hosts a festival in the clouds.', '2025-09-30', 6),            
('Crystal Gala', 'A dazzling event inside the sparkling Crystal Caverns.', '2025-10-25', 7);   


SELECT * FROM events
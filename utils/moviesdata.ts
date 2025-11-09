// Define the types for our data structures

export interface CastMember {
  name: string;
  character: string;
  image: string;
}

export interface Movie {
  id: number;
  title: string;
  subtitle: string;
  poster: string;
  match: number;
  year: number;
  duration: string;
  rating: string;
  quality: string;
  synopsis: string;
  cast: CastMember[]; // An array of CastMember objects
}

// Define the type for the root object
export interface MoviesDaat {
  moviesdaat: Movie[]; // An array of Movie objects
}

// Assign the data to a typed constant
const moviesData: MoviesDaat = {
  "moviesdaat": [
    {
      "id": 1,
      "title": "JOHN WICK",
      "subtitle": "CHAPTER 4",
      "poster": "poster1.jpg",
      "match": 95,
      "year": 2023,
      "duration": "2h 49m",
      "rating": "R",
      "quality": "HD",
      "synopsis": "John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.",
      "cast": [
        {
          "name": "Keanu Reeves",
          "character": "John Wick",
          "image": "poster1.jpg"
        },
        {
          "name": "Laurence Fishburne",
          "character": "Bowery King",
          "image": "poster2.jpg"
        },
        {
          "name": "George Georgiou",
          "character": "The Elder",
          "image": "poster3.jpg"
        },
        {
          "name": "Bill Skarsgård",
          "character": "Marquis",
          "image": "poster4.jpg"
        },
        {
          "name": "Ian McShane",
          "character": "Winston",
          "image": "post1.jpg"
        }
      ]
    },
    {
      "id": 2,
      "title": "ARCANE",
      "subtitle": "",
      "poster": "poster4.jpg",
      "match": 98,
      "year": 2021,
      "duration": "40m",
      "rating": "TV-MA",
      "quality": "4K",
      "synopsis": "Set in the utopian region of Piltover and the oppressed underground of Zaun, the story follows the origins of two iconic League of Legends champions and the power that will tear them apart.",
      "cast": [
        {
          "name": "Hailee Steinfeld",
          "character": "Vi",
          "image": "post2.jpg"
        },
        {
          "name": "Ella Purnell",
          "character": "Jinx",
          "image": "post3.jpg"
        },
        {
          "name": "Kevin Alejandro",
          "character": "Jayce",
          "image": "post4.jpg"
        }
      ]
    },
    {
      "id": 3,
      "title": "PEAKY BLINDERS",
      "subtitle": "",
      "poster": "poster2.jpg",
      "match": 92,
      "year": 2013,
      "duration": "55m",
      "rating": "TV-MA",
      "quality": "HD",
      "synopsis": "A gangster family epic set in 1900s England, centering on a gang who sew razor blades in the peaks of their caps, and their fierce boss Tommy Shelby.",
      "cast": [
        {
          "name": "Cillian Murphy",
          "character": "Tommy Shelby",
          "image": "poster3.jpg"
        },
        {
          "name": "Helen McCrory",
          "character": "Polly Gray",
          "image": "poster4.jpg"
        },
        {
          "name": "Paul Anderson",
          "character": "Arthur Shelby",
          "image": "post1.jpg"
        }
      ]
    }
  ]
};

// You can now export this data to use in other files
export default moviesData;
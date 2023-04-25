export const userExample = {
    name: 'Natali Romanova',
    email: 'natalie@gmeilt.com',
    posts: [
      {
        id: '101',
        title: 'Forest',
        photo: require('../assets/images/MountainsPost.jpg'),
        comments: [],
        likesNumber: 153,
        locationRegion: 'Ivano-Frankivsk Region',
        locationCountry: 'Ukraine',
        location: {
          latitude: 48.322821,
          longitude: 24.530243,
        },
      },
      {
        id: '202',
        title: 'Sunset at Black Sea',
        photo: require('../assets/images/SeaPost.jpg'),
        comments: [
            {
              id: '1111',
              ownerId: 'qwertyuiop',
              ownerPhoto: require('../assets/images/userComment.png'),
              date: '09 june, 2020 | 08:40',
              text: 'Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!',
            },
            {
              id: '2222',
              ownerId: '1234567890',
              ownerPhoto: require('../assets/images/userComment2.png'),
              date: '09 june, 2020 | 09:14',
              text: 'A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.',
            },
            {
              id: '3333',
              ownerId: 'qwertyuiop',
              ownerPhoto: require('../assets/images/userComment.png'),
              date: '09 june, 2020 | 09:20',
              text: 'Thank you! That was very helpful!',
            },
          ],
        likesNumber: 200,
        locationRegion: 'Zatoka',
        locationCountry: 'Ukraine',
        location: {
          latitude: 46.059624,
          longitude: 30.448866,
        },
      },
      {
        id: '303',
        title: 'An old house in Venice',
        photo: require('../assets/images/WindowsPost.jpg'),
        comments: [],
        likesNumber: 200,
        locationRegion: 'Venice',
        locationCountry: 'Italy',
        location: {
          latitude: 45.437679,
          longitude: 12.342546,
        },
      },
    ],
  };
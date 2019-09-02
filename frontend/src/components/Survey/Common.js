const common = {
  questions: {
    preferredName: {
      type: 'text',
      name: 'preferredName',
      title: 'If you go by a preferred name, please tell us',
      isRequired: false,
      placeHolder: 'i.e. John',
    },
    interestsMatrix: {
      type: 'matrix',
      name: 'interests',
      title: `In order to match you with fellow Freshers and Parents, we'd like to know a few things about your hobbies and interests. Please fill in the following, with 1 as having no interest whatsoever, to 5 being very strong interest.
            (Note you do not have to fill out every row - unchecked rows will be marked a no interest)`,
      columns: [{
        value: 0,
        text: '1',
      },
      {
        value: 1,
        text: '2',
      },
      {
        value: 2,
        text: '3',
      },
      {
        value: 3,
        text: '4',
      },
      {
        value: 4,
        text: '5',
      },
      ],
      rows: [
        {
          value: 'alcohol',
          text: 'Alcohol - Drinking',
        },
        {
          value: 'anime',
          text: 'Anime',
        },
        {
          value: 'artGraphics',
          text: 'Art and Graphics',
        },
        {
          value: 'baking',
          text: 'Baking',
        },
        {
          value: 'tabletopGames',
          text: 'Board/card games',
        },
        {
          value: 'charity',
          text: 'Charitable causes and Fundraising',
        },
        {
          value: 'clubbing',
          text: 'Clubbing',
        },
        {
          value: 'cooking',
          text: 'Cooking',
        },
        {
          value: 'danceBallroom',
          text: 'Dance - Salsa, Ballroom, other partnered dances',
        },
        {
          value: 'danceContemporary',
          text: 'Dance - Hip hop, ',
        },
        {
          value: 'dramatics',
          text: 'Dramatics e.g. Drama or Musical Theatre',
        },
        {
          value: 'film',
          text: 'Film and Cinematography',
        },
        {
          value: 'finance',
          text: 'Finance and Entrepreneurship',
        },
        {
          value: 'exerciseAndHealth',
          text: 'Gym and Health - Running, Cycling, Swimming, Lifting weights etc',
        },
        {
          value: 'hiking',
          text: 'Hiking',
        },
        {
          value: 'kpop',
          text: 'K-Pop',
        },
        {
          value: 'martialArts',
          text: 'Martial Arts and Self-Defence',
        },
        {
          value: 'performingMusicPopRockJazz',
          text: 'Performing Music - Pop, Rock, Jazz',
        },
        {
          value: 'performingMusicClassical',
          text: 'Performing Music - Classical, Chamber',
        },
        {
          value: 'photography',
          text: 'Photography',
        },
        {
          value: 'politics',
          text: 'Politics',
        },
        {
          value: 'videoGames',
          text: 'Video Games',
        },
        {
          value: 'football',
          text: 'Football (the British one!)',
        },
        {
          value: 'rugby',
          text: 'Rugby',
        },
        {
          value: 'rowing',
          text: 'Rowing',
        },
        {
          value: 'racketSports',
          text: 'Tennis, Squash, Badminton, other racket sports',
        },
        {
          value: 'otherSports',
          text: 'Other sports',
        },
      ],
    },
    selfDescription: {
      type: 'comment',
      name: 'selfDescription',
      title: 'If you\'d like to write a few words about yourself, here is your chance!',
    },
    socialMedia: {
      type: 'text',
      name: 'socialMedia',
      title: 'Feel free to add a link to your social media i.e. Facebook. This the rest of your family to make contacting each other before term time easier',
    },
    gender: {
      type: 'dropdown',
      name: 'gender',
      title: 'Gender',
      isRequired: true,
      choices: [
        {
          value: 'Male',
          text: 'Male',
        },
        {
          value: 'Female',
          text: 'Female',
        },
        {
          value: 'Other',
          text: 'Other',
        },
        {
          value: 'NA',
          text: 'Prefer not to say',
        },
      ],
    },
    course: {
      type: 'dropdown',
      name: 'course',
      title: 'Course',
      isRequired: true,
      choices: [
        {
          value: 'Computing',
          text: 'Computing',
        },
        {
          value: 'JMC',
          text: 'JMC',
        },
      ],
    },
  },
};

export default common;

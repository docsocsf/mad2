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
      title: 'In order to assign you a family, we\'d like to know a few things about your hobbies and interests. Note that you do not have to fill out every row - unchecked rows will be marked a no interest.',
      columns: [
        {
          value: 0,
          text: 'No Interest',
        },
        {
          value: 1,
          text: 'Mild Interest',
        },
        {
          value: 2,
          text: 'Strong Interest',
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
          text: 'Dance - Hip hop, urban, other contemporary dances',
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
      title: 'If you\'d like to write a few words to introduce yourself to the rest of your family, here\'s your chance. Your family will see this once the families have been assigned. If you don\'t want to write anything, don\'t worry, this is purely optional!',
    },
    socialMedia: {
      type: 'text',
      name: 'socialMedia',
      title: 'Social Media link i.e. Facebook so other family members can contact you prior to term time.',
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

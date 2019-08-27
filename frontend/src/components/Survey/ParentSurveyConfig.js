import common from './Common';

const config = {
  pages: [{
    questions: [
      common.questions.preferredName,
      {
        type: 'text',
        name: 'partnerShortcode',
        title: 'Please enter the shortcode of your partner',
        placeHolder: 'Shortcode, i.e. AB2916',
      },
      common.questions.interestsMatrix,
      common.questions.selfDescription,
      common.questions.socialMedia,
    ],
  }],
};

const hobbies = new Set(
  common.questions.interestsMatrix.rows.map(
    (hobby) => hobby.value,
  ),
);

export {
  config,
  hobbies,
};

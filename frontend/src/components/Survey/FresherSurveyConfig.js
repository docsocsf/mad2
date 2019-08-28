import common from './Common';

const config = {
  pages: [
    {
      questions: [
        {
          type: 'text',
          name: 'firstName',
          title: 'Please enter your first name',
          isRequired: true,
          placeHolder: 'i.e. Johnathan',
        },
        {
          type: 'text',
          name: 'lastName',
          title: 'Please enter your last name',
          isRequired: true,
          placeHolder: 'i.e. Smith',
        },
        common.questions.preferredName,
        {
          type: 'text',
          name: 'shortcode',
          title: 'Please enter your shortcode',
          isRequired: true,
          placeHolder: 'Shortcode, i.e. AB2916',
        },
        common.questions.interestsMatrix,
        common.questions.selfDescription,
        common.questions.socialMedia,
      ],
    },
  ],
};

const hobbies = new Set(
  common.questions.interestsMatrix.rows.map(
    (hobby) => hobby.value,
  ),
);

export { config, hobbies };

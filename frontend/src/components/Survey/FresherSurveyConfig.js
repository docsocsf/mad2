import common from './Common';

const {
  preferredName,
  gender,
  course,
  interestsMatrix,
  selfDescription,
  socialMedia,
} = common.questions;

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
        preferredName,
        {
          type: 'text',
          name: 'shortcode',
          title: 'Please enter your shortcode (College Login e.g. ab2916 NOT your 8-number Collede ID)',
          isRequired: true,
          placeHolder: 'i.e. ab2916',
        },
        gender,
        course,
        interestsMatrix,
        selfDescription,
        socialMedia,
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

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
          title: 'Please enter your shortcode (College Login e.g. ab2916 NOT your 8-number College ID)',
          isRequired: true,
          placeHolder: 'i.e. ab2916',
          validators: [
            {
              type: 'regex',
              text: 'Your College Login should be 2-3 letters followed by 2-4 numbers. Please do not input your College ID.',
              regex: '[a-zA-Z]+[0-9]+',
            },
          ],
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

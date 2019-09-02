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
  pages: [{
    questions: [
      preferredName,
      gender,
      course,
      interestsMatrix,
      selfDescription,
      socialMedia,
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

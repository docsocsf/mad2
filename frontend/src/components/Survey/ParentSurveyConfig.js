import common from './Common';

const config = {
  pages: [{
    questions: [
      common.questions.preferredName,
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

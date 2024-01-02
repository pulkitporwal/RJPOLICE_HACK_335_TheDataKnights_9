const fileCyberbullyingComplaint = async (req, res) => {
  const {
    platform,
    userNameOnThePlatform,
    culprit,
    description,
    dateAndTimeOfIncident,
  } = req.body;

  if(!(platform &&
    userNameOnThePlatform &&
    culprit &&
    description &&
    dateAndTimeOfIncident))
};

export { fileCyberbullyingComplaint };

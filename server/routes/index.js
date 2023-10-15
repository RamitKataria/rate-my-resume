const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');
//const {Resume, Review, User, removeForbiddenFields} = require("../db");

router.get('/', function (req, res, next) {
  res.status(200).send({
    isAuthenticated: req.oidc.isAuthenticated()
  });
});

router.get('/user', requiresAuth(), function (req, res, next) {
  const authUser = req.oidc.user;
  res.status(200).send({
    picture: authUser.picture,
    name: "Placeholder Name"
  });
});

router.get('/resume', async function (req, res, next) {
  try {
    const authUser = req.oidc.user;
    const user = await User.findOne({authUserId: authUser.sub}).lean();
    const resume = user.resume.ToJSON();
    resume.score = 0;
    if (!user) {
      return res.status(404).send('User Not found');
    }
    return res.status(200).send(removeForbiddenFields(resume));
  } catch (e) {
    console.log(e);
    return res.status(500).send('Internal server error');
  }
});

router.put('/resume', requiresAuth(), async function (req, res) {
  try {
    const authUser = req.oidc.user;
    const newResumeLink = req.body;
    if (typeof newLink !== "string") {
      return res.status(400).send('Body is not a string');
    }

    const user = await User.findOne({authUserId: authUser.sub});
    if (!user) {
      return res.status(404).send('User Not found');
    }
    user.resume = new Resume();
    user.resume.resourceLink = newResumeLink;
    user.resume.user = authUser.sub;
    user.resume.save();
    return res.status(200).send('Resume set');
  } catch (e) {
    console.log(e);
    return res.status(500).send('Internal server error');
  }
});

//
///**
// * Replace all user ids with user objects
// */
//async function populateUsers(meetingObj) {
//  let userAvailability = []
//  let createdBy = {}
//
//  try {
//    userAvailability = await Promise.all(
//      meetingObj.userAvailability.map(async (availEntry) => {
//        const user = await getUserOrGuest(availEntry.user);
//        return {
//          ...availEntry,
//          userInfo: {
//            name: user.displayName,
//            email: user.email,
//          },
//        }
//      })
//      )
//
//    let createdBy = undefined;
//    try {
//      createdBy = await getUserOrGuest(meetingObj.createdBy);
//    } catch (e) {
//      console.log('Invalid ');
//      console.log(e)
//    }
//    return ({
//      ...meetingObj,
//      createdByInfo: {
//        name: createdBy.displayName,
//        email: createdBy.email,
//      },
//      userAvailability: userAvailability,
//    })
//  } catch (e) {
//    console.log('Failed to populate users in meetingInfo');
//    console.log(e);
//    return meetingObj;
//  }
//}
//
//async function getUserOrGuest(idOrName) {
//  try {
//    user = await getAuth().getUser(idOrName);
//    return user;
//  } catch (e) {
//    if (e.code == 'auth/invalid-uid') {
//      return {
//        name: idOrName,
//        email: '',
//      }
//    }
//    throw e;
//  }
//}

module.exports = router;

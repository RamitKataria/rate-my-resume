const express = require('express').Router();
const { requiresAuth } = require('express-openid-connect');
const router = express.Router();
const {Resume, Review, User, removeForbiddenFields} = require("../db");

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

router.get('/:userId/resume', async function (req, res, next) {
  try {
    const authUser = req.oidc.user;
    const user = await User.findOne({authUserId: authUser.sub}).lean();
    if (!user) {
      return res.status(404).send('User Not found');
    }
    return res.status(200).send(removeForbiddenFields(user.resume));
  } catch (e) {
    console.log(e);
    return res.status(500).send('Internal server error');
  }
});

//router.put('/:userId/resume', requiresAuth(), async function (req, res) {
//  try {
//    const newResume = req.body;
//    if (typeof newLink !== "string") {
//      return res.status(400).send('Body is not a string');
//    }
//
//    const user = await User.findOne({firebaseUId: req.user.uid});
//    if (!user) {
//      return res.status(404).send('User Not found');
//    }
//    user.ics = newLink;
//    return res.status(200).send('Calendar link set');
//  } catch (e) {
//    console.log(e);
//    return res.status(500).send('Internal server error');
//  }
//});

//router.delete('/:userId', confirmAuthenticated, async function (req, res) {
//  try {
//    await deleteUserInFirebase(req.params.firebaseUId);
//    await User.deleteOne({firebaseUId: req.params.firebaseUId});
//    return res.status(200).send('Deleted');
//  } catch (e) {
//    console.log(e);
//    return res.status(404).send('Not found');
//  }
//});
//
//router.post('/', async function (req, res) {
//  try {
//    if (await User.exists({firebaseUId: req.user.uid})) {
//      return res.status(400).send('User already exists');
//    }
//    const newUser = new User({firebaseUId: req.user.uid});
//    await newUser.save();
//    return res.status(200).send(removeForbiddenFields(newUser));
//  } catch (e) {
//    console.log(e);
//    return res.status(500).send('Internal server error');
//  }
//});
//
//router.delete('/:meetingID', confirmAuthenticated, async function (req, res) {
//  try {
//    await Meeting.deleteOne({id: req.params.meetingID});
//    return res.status(200).send('Deleted');
//  } catch (e) {
//    console.log(e);
//    return res.status(404).send('Not found');
//  }
//});
//
///**
// * Modify availability slots of a given user in a given meeting, perserving all other meetingInfo
// */
//router.post("/availability/:meetingID/:userID", async function (req, res) {
//  try {
//    const meeting = await Meeting.findOne({id: req.params.meetingID}).lean();
//    if (!meeting) {
//      return res.status(404).send("Meeting Not Found")
//    }
//    const user = await User.findOne({firebaseUID: req.params.userID});
//    if (!user) {
//      return res.status(404).send("User Not Found")
//    }
//
//    // add avail entry to meeting document
//    const availEntries = meeting.userAvailability;
//    const idx = availEntries.findIndex(entry => entry.user === req.params.userID);
//    if (idx === -1) {
//      availEntries.push(req.body)
//    } else {
//      availEntries[idx] = req.body
//    }
//    const newMeeting = {
//      ...meeting,
//      dateTimeUpdated: new Date(),
//      userAvailability: availEntries,
//      id: req.params.meetingID
//    };
//    console.log('post meeting avail', newMeeting)
//    await Meeting.findOneAndUpdate(
//      {id: req.params.meetingID}, newMeeting
//      );
//
//    await addMeetingToUser(user, req.params.meetingID);
//
//    return res.send(removeForbiddenFields(newMeeting));
//  } catch (e) {
//    console.log(e);
//    res.status(500).send("Internal Server Error\n");
//  }
//});
//
//
///**
// * Fill meeting with available slots using ICS information
// */
//router.put('/availability/ics/:meetingId/:userId', async function (req, res) {
//  let meeting;
//  try {
//    meeting = await Meeting.findOne({id: req.params.meetingId}).lean();
//    const user = await User.findOne({firebaseUID: req.params.userId}).lean();
//
//    // given meeting range & ICS link, return available slots inside meeting range
//    // throw an error if ICS file is empty or invalid.
//    const availSlots = await readICS(meeting.range, user.ics);
//
//    // remove availability of current user.
//    meeting.userAvailability = meeting.userAvailability.filter(object => {
//      return object.user !== req.params.userId;
//    });
//
//    // push new availability from ics.
//    meeting.userAvailability.push({
//      user: req.params.userId,
//      availableSlots: availSlots,
//    })
//
//    meeting.dateTimeUpdated = new Date();
//
//    // save meeting to mongoose
//    await Meeting.findOneAndUpdate(
//      {id: req.params.meetingId}, meeting
//      );
//
//    const populatedMeeting = await populateUsers(meeting);
//
//    // return meeting
//    res.status(200).send(removeForbiddenFields(populatedMeeting));
//  } catch (e) {
//    console.log("Invalid ICS!");
//    console.log(e);
//    res.status(200).send({});
//  }
//})
//
//
//router.patch('/:meetingID', confirmAuthenticated, async function (req, res) {
//  try {
//    const meeting = await Meeting.findOne({id: req.params.meetingID});
//    if (!meeting) {
//      return res.status(404).send('Not found');
//    }
//    const patches = removeForbiddenFields(req.body);
//    Object.assign(meeting, patches);
//    await meeting.save();
//    return res.send(removeForbiddenFields(meeting));
//  } catch (e) {
//    console.log(e);
//    res.status(500).send("Internal Server Error");
//  }
//});
//
//router.get('/:meetingID', async function (req, res) {
//  try {
//    const meetingObj = await Meeting.findOne({id: req.params.meetingID}).lean();
//    if (!meetingObj) {
//      return res.status(404).send('Not found');
//    }
//    const populatedMeeting = await populateUsers(meetingObj)
//    return res.send(removeForbiddenFields(populatedMeeting));
//  } catch (e) {
//    console.log(e);
//    res.status(500).send("Internal Server Error");
//  }
//});
//
///**
// * Create meeting instance, add to user document
// */
//router.post('/', async function (req, res) {
//  try {
//    const newMeeting = new Meeting(removeForbiddenFields(req.body));
//    newMeeting.id = nanoid();
//    await newMeeting.save();
//    const user = await User.findOne({firebaseUID: newMeeting.createdBy});
//
//    if (user) {
//      await addMeetingToUser(user, newMeeting.id);
//    }
//    return res.send(removeForbiddenFields(newMeeting));
//  } catch (e) {
//    console.log(e);
//    res.status(500).send("Internal Server Error");
//  }
//});
//
//
///**
// * add meeting reference to user document if it does not exist
// * @param {User} user
// * @param {*} meetingID
// */
//async function addMeetingToUser(user, meetingID) {
//  try {
//    const meetingIdx = user.meetings.findIndex(meeting => meeting === meetingID);
//    if (meetingIdx === -1) {
//      user.meetings.push(meetingID)
//    }
//    // console.log('Write Availability - User\n' + user)
//    await user.save();
//  } catch (e) {
//    console.log("Failed to add meeting to user: " + user.firebaseUID)
//    console.log(e);
//  }
//}
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

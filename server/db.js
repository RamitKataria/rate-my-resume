const mongoose = require('mongoose');
 mongoose.connect(process.env.MONGODB_URI);
//mongoose.connect("mongodb+srv://" + process.env.ATLAS_USERNAME + ":" + process.env.ATLAS_PASSWORD + "@" + process.env.DB_CLUSTER + ".mongodb.net/?retryWrites=true&w=majority",
//                 {dbName: process.env.DB_NAME});

//const MeetingSchema = new mongoose.Schema({
//    id: {
//        type: String,
//        index: true,
//        unique: true
//    },
//    name: {
//        type: String,
//        required: [true, 'Why no meeting name?']
//    },
//    description: String,
//    dateTimeCreated: Date,
//    dateTimeUpdated: Date,
//    createdBy: {type: String, ref: 'User'},
//    range: [[Date]],
//    userAvailability: [{
//        id: false,
//        user: {type: String, ref: 'User'},
//        availableSlots: [Date]
//    }]
//});
//
//const Meeting = mongoose.model('Meeting', MeetingSchema);
//

const ResumeSchema = new mongoose.Schema({
    id: {type: String, index: true, unique: true},
    user: {type: String, ref: 'User'},
    resourceLink: String,
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}]
});

const ReviewSchema = new mongoose.Schema({
    user: {type: String, ref: 'User'},
    score: Number,
    resume: {type: String, ref: 'Resume'}
})

const UserSchema = new mongoose.Schema({
    resumes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Resume'}],
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}],
    accuracy: Number,
    authUserId: {
        type: String,
        index: true,
        unique: true
    }
});

const Resume = mongoose.model('Resume', ResumeSchema);
const Review = mongoose.model('Review', ReviewSchema);
const User = mongoose.model('User', UserSchema);

function removeForbiddenFields(obj) {
    let retval = obj;
    if (obj.toJSON) {
        retval = obj.toJSON();
    }
    ['_id', '__v', 'authUserId'].forEach(i => delete retval[i]);
    return retval;
}

module.exports = {Resume, Review, User, removeForbiddenFields}

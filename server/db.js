const mongoose = require('mongoose');
 mongoose.connect(process.env.MONGODB_URI);

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
    resumes: {type: mongoose.Schema.Types.ObjectId, ref: 'Resume'},
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

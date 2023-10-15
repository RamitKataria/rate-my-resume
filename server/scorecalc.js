// Import your models and the calculation functions
const { Resume, Review, User, removeForbiddenFields } = require('./your-mongoose-models'); // Replace with the correct path

// Sample user ratings and true ratings (arrays)
const userRatings = [4.5, 3.0, 2.0];
const trueRatings = [5.0, 4.0, 3.0];

// Calculate MAE (Mean Absolute Error)
function calculateMAE(userRatings, trueRatings) {
  if (userRatings.length !== trueRatings.length) {
    throw new Error("Arrays must have the same length");
  }
  
  const n = userRatings.length;
  let sum = 0;
  
  for (let i = 0; i < n; i++) {
    sum += Math.abs(userRatings[i] - trueRatings[i]);
  }
  
  return sum / n;
}

// Calculate RMSE (Root Mean Squared Error)
function calculateRMSE(userRatings, trueRatings) {
  if (userRatings.length !== trueRatings.length) {
    throw new Error("Arrays must have the same length");
  }
  
  const n = userRatings.length;
  let sumSquaredDiff = 0;
  
  for (let i = 0; i < n; i++) {
    const diff = userRatings[i] - trueRatings[i];
    sumSquaredDiff += diff * diff;
  }
  
  return Math.sqrt(sumSquaredDiff / n);
}

// Function to retrieve user accuracy and review scores
async function getUserData(userId) {
  try {
    const user = await User.findOne({ authUserId: userId }).populate('resumes reviews');
    if (!user) {
      throw new Error('User not found');
    }

    const userAccuracy = user.accuracy;
    const reviewScores = user.reviews.map((review) => review.score);

    return { userAccuracy, reviewScores };
  } catch (error) {
    throw error;
  }
}

// Calculate MAE and RMSE for a specific user
async function calculateErrorMetrics(userId) {
  try {
    const userData = await getUserData(userId);
    const { userAccuracy, reviewScores } = userData;

    if (userRatings.length !== reviewScores.length) {
      throw new Error('Arrays must have the same length');
    }

    const mae = calculateMAE(reviewScores, trueRatings);
    const rmse = calculateRMSE(reviewScores, trueRatings);

    return { userAccuracy, mae, rmse };
  } catch (error) {
    throw error;
  }
}

// Usage example
const userId = 'yourUserId'; // Replace with the user's ID you want to calculate error metrics for

calculateErrorMetrics(userId)
  .then((result) => {
    const { userAccuracy, mae, rmse } = result;
    console.log(`User Accuracy: ${userAccuracy}`);
    console.log(`MAE: ${mae}`);
    console.log(`RMSE: ${rmse}`);
  })
  .catch((error) => {
    console.error(error.message);
  });

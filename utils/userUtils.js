// userUtils.js
const { ObjectId } = require("mongodb");
const Color = require("tinycolor2");

function generateUserId(birthDate, favoriteColor) {
    const formattedBirthDate = birthDate.toISOString().slice(0, 10); // Format birth date as YYYY-MM-DD
    const color = Color(favoriteColor); // Parse the color using tinycolor2

    let idString;
    if (color.isValid()) {
        // If the favorite color is a valid color, use its hex code
        idString = color.toHexString();
    } else {
        // If the favorite color is not a valid color, use it as-is
        idString = favoriteColor;
    }

    const objectId = ObjectId.createFromTime(0); // Create an ObjectId with a timestamp of 0
    objectId.id[11] = parseInt(idString.charAt(0), 16); // Set the 12th byte of the ObjectId using the first character of the ID string
    objectId.id[12] = parseInt(idString.charAt(1), 16); // Set the 13th byte of the ObjectId using the second character of the ID string
    objectId.id[13] = parseInt(idString.charAt(2), 16); // Set the 14th byte of the ObjectId using the third character of the ID string
    objectId.id[14] = parseInt(idString.charAt(3), 16); // Set the 15th byte of the ObjectId using the fourth character of the ID string
    objectId.id[15] = parseInt(idString.charAt(4), 16); // Set the 16th byte of the ObjectId using the fifth character of the ID string

    return objectId.toString(); // Return the ObjectId as a string
}

module.exports = {
    generateUserId,
};

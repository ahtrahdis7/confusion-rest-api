const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);


const favouritesSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    favourites: [
        {
            type:[mongoose.Schema.Types.ObjectId],
            ref: 'Dish'
        }
    ],
}, {
    timestamps: true
});


var Favs = mongoose.model('favs', favouritesSchema);
module.exports = Favs;

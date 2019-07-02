// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StationSchema = new Schema({
    _id: Number,
    lat: Number,
    long: Number,
    state: Number,
    name: String,
    address: String,
    zipcode: String,
    city: String,
    network: String,
    created: Date,
    station: Number,
}, {
    collection: 'm_station'
});


// export the new Schema so we could modify it using Node.js
// module.exports.m_bike = mongoose.model("m_bike", BikeSchema);
module.exports.m_station = mongoose.model("m_station", StationSchema);
// module.exports.m_event = mongoose.model("m_event", EventSchema);
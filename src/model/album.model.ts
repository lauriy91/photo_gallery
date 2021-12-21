import Mongoose from "mongoose";

const AlbumSchema = new Mongoose.Schema({
    id: { type: Object },
    name: { type: String, required: true, unique: true },
    userid: { type: String, required: true },
    isprivate: { type: Boolean, required: true, default: true },
    createAct: { type: Date, default: Date.now },
});

export default Mongoose.model("Album", AlbumSchema);
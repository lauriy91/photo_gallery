import Mongoose from "mongoose"

export interface IPhoto {
    _id?: string;
    filename: string;
    userid: string;
    size: number;
    mimeType: string;
    favorite: boolean;
    createdAct?: Date;
    albums: string[];
  }

const PhotoSchema = new Mongoose.Schema({
    id: { type: String, required: true, unique: true },
    filename: { type: String, required: true },
    userid: { type: String, required: true },
    size: { type: Number, required: true },
    // tipo de archivo
    mimeType: { type: String, required: true },
    // fecha de creación
    createdAct: { type: Boolean, required: true, default: false },
    // likes
    favorite: { type: Boolean, required: true, default: false },
    // si eventualmente desea asignar la foto a un album
    albums: { type: Array, required: false, default: [] },
});


export default  Mongoose.model("Photo", PhotoSchema);
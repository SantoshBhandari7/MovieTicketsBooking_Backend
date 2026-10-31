import mongoose, { mongo } from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    // coverImage: {
    //   type: FileList,
    //   required: true,
    // },
  },
  { timestamps: true },
);

const Movie = mongoose.model("movie", movieSchema);
export default Movie;

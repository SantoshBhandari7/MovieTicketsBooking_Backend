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
    poster: {
      type: {
        path: {
          type: String,
          required: [true, "path is required"],
        },
        public_id: {
          type: String,
          required: [true, "public_id is required"],
        },
      },
      default: null,
    },
  },
  { timestamps: true },
);

const Movie = mongoose.model("movie", movieSchema);
export default Movie;

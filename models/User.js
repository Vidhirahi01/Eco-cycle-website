import { Schema, model } from "mongoose";
import { hash, compare } from "bcrypt";

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: String,
  role: {
    type: String,
    enum: ['user', 'admin', 'recycler'],
    default: 'user',
  },
}, { timestamps: true });

// ✅ Hash password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await hash(this.password, 10); // ✅ Await hash correctly
  next();
});

// ✅ Method to compare password during login
userSchema.methods.comparePassword = function (candidatePassword) {
  return compare(candidatePassword, this.password);
};

export default model("User", userSchema);

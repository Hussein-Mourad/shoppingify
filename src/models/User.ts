import { compare, genSalt, hash } from "bcrypt";
import { Model, model, Schema } from "mongoose";
import isStrongPassword from "validator/es/lib/isStrongPassword";

export interface IUser {
  username: string;
  password: string;
}

interface UserModel extends Model<IUser> {
  login(): IUser;
}

const userSchema = new Schema<IUser, UserModel>(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Please enter a username"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minLength: [8, "Minimum length is 8 characters"],
      validate: [
        (str: string) => isStrongPassword(str, { minSymbols: 0 }),
        "Password must contain at least one uppercase, and one number",
      ],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    const salt = await genSalt();
    user.password = await hash(user.password, salt);
  }
  next();
});

userSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });
  if (user) {
    const auth = await compare(password, user.password);
    if (auth) {
      return user;
    }
  }
  throw new Error("Incorrect username and/or password");
};

const User = model("User", userSchema);
export default User;

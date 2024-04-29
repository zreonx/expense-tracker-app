import passport from "passport";
import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import { GraphQLLocalStrategy } from "graphql-passport";

export const configurePassport = async () => {
  passport.serializeUser((user, done) => {
    console.log(`Serializing the user...`);
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    console.log(`Deserializing the user... `);
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  passport.use(
    new GraphQLLocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          throw Error(`Invalid username or password`);
        }
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
          throw Error(`Invalid username or password`);
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );
};

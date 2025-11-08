import * as express from 'express';
import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import { Auth, forgotPassoword, resetPassowrd } from "../models/auth";
import * as bcrypt from "bcrypt";
import * as nodemailer from "nodemailer";
import { format } from "date-fns";
import * as jwt from 'jsonwebtoken';
import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
const crypto = require('crypto');

const configurePassport = () => {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || 'your-secret-key',
  };

  passport.use(
    new Strategy(jwtOptions, async (payload, done) => {
      try {
        const user = await collections?.users?.findOne({ _id: new ObjectId(payload.sub) });

        if (!user) {
          return done(null, false);
        }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    })
  );
};

configurePassport();

const sendEmail = async (to: string, subject: string, text: string, html: string) => {
  const transporterOptions = {
    host: 'smtp.hostinger.com',
    secure: false,
    secureConnection: false,
    tls: {
      ciphers: 'SSLv3',
    },
    port: 587,
    auth: {
      user: 'info@logicrent.ae',
      pass: 'Info@2016',
    },
  } as nodemailer.TransportOptions;

  const transporter = nodemailer.createTransport(transporterOptions);

  const mailOptions = {
    from: 'info@logicrent.ae',
    to,
    subject,
    text,
    html,
  };

  try {
    transporter.sendMail(mailOptions, (error: any, info: any) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export const authRouter = express.Router();
authRouter.use(passport.initialize());
authRouter.use(express.json());

authRouter.get('/protectedRoute', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ message: 'This route is protected with JWT authentication.' });
});

authRouter.post("/signUp", async (req: Request, res: Response) => {
  try {
    if (!collections?.users) {
      return res.status(500).send({ 
        status: 500, 
        message: 'Database not initialized' 
      });
    }

    const { firstName, lastName, email, password, phoneNumber, address, city, locality, area, zipcode } = req.body;
    const date = new Date();
    const formattedDate = format(date, 'dd/MM/yyyy');
    const existingUser = await collections.users.findOne({ email });

    if (existingUser) {
      return res.status(409).send({ status: 409, message: "Email already exists. Please choose a different email." });
    }

    const newUser = new Auth(firstName, lastName, email, password, phoneNumber, address, city, locality, area, zipcode);
    // newUser["date"] = formattedDate;

    const result = await collections.users.insertOne(newUser);

    if (result) {
      const mailOptions = {
        from: 'info@logicrent.ae',
        to: 'info@logicrent.ae',
        subject: 'New Customer Information',
        html: `
        <html>
        <body>
          <h2>New Customer Information:</h2>
          <table>
            <tr>
              <td><strong>First Name:</strong></td>
              <td>${firstName}</td>
            </tr>
            <tr>
              <td><strong>Last Name:</strong></td>
              <td>${lastName}</td>
            </tr>
            <tr>
              <td><strong>Email:</strong></td>
              <td>${email}</td>
            </tr>
            <tr>
              <td><strong>Phone Number:</strong></td>
              <td>${phoneNumber}</td>
            </tr>
            <tr>
              <td><strong>Address:</strong></td>
              <td>${address}</td>
            </tr>
            <tr>
              <td><strong>City:</strong></td>
              <td>${city}</td>
            </tr>
            <tr>
              <td><strong>Locality:</strong></td>
              <td>${locality}</td>
            </tr>
            <tr>
              <td><strong>Area:</strong></td>
              <td>${area}</td>
            </tr>
            <tr>
              <td><strong>Zipcode:</strong></td>
              <td>${zipcode}</td>
            </tr>
          </table>
        </body>
      </html>
        `, 
      };

      await sendEmail('info@logicrent.ae', 'New Customer Information', '', mailOptions.html);

      return res.status(201).send({ status: 201, message: `Successfully created a new User with id ${result.insertedId}` });
    } else {
      return res.status(500).send({ status: 500, message: "Failed to create a new User." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ 
      status: 500, 
      message: "Internal Server Error",
      error: (error as Error).message 
    });
  }
});

authRouter.get("/getAllContactEnquiries", async (req: Request, res: Response) => {
  try {
    if (!collections?.users) {
      return res.status(500).send({ 
        status: 500, 
        message: 'Database not initialized' 
      });
    }

    const result = await collections.users.find().toArray();

    if (result) {
      return res.status(200).send({ status: 200, message: "getAllContactEnquiries", data: result || [] });
    } else {
      return res.status(404).send({ status: 404, message: "No data found", data: [] });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ 
      status: 500, 
      message: "Internal server Error",
      error: (error as Error).message 
    });
  }
});

authRouter.post('/login', async (req: Request, res: Response) => {
  try {
    if (!collections?.users) {
      return res.status(500).send({ 
        status: 500, 
        message: 'Database not initialized' 
      });
    }

    const { email, password } = req.body;
    console.log({email})
    const user = await collections.users.findOne({ email });
    console.log({user})
    if (!user) {
      return res.status(404).send({ status: 404, message: 'User not found. Please check your email or sign up.' });
    }

    const passwordMatch = await bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send({ status: 401, message: 'Invalid password. Please check your password and try again.' });
    }

    const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1h' });
    console.log('Your JWT token is here:', token);

    return res.status(200).send({ status: 200, message: 'Login successful!', token });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ 
      status: 500, 
      message: 'Internal Server Error',
      error: (error as Error).message 
    });
  }
});

authRouter.put("/resetPassword", async (req: Request, res: Response) => {
  try {
    if (!collections?.users) {
      return res.status(500).send({ 
        status: 500, 
        message: 'Database not initialized' 
      });
    }

    const { email, password, newPassword }: resetPassowrd = req.body;
    const user = await collections.users.findOne({ email });

    if (!user) {
      return res.status(404).send({ status: 404, message: "User not found. Please check your email or sign up." });
    }

    const passwordMatch = await bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send({ status: 401, message: "Invalid password. Please check your password and try again." });
    } else {
      const data = new Auth("test", "test", "info@logicrent.ae", "qwert12345", "9347323770", "test", "test", "test", "test", "test");
      const hashPass = data.hashPassword(newPassword);
      const result = await collections.users.updateOne({ email: email }, { $set: { password: hashPass } });

      return res.status(200).send({ status: 200, message: "Password reset successful!" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ 
      status: 500, 
      message: "Internal Server Error",
      error: (error as Error).message 
    });
  }
});

authRouter.put('/forgotPassword', async (req, res) => {
  try {
    if (!collections?.users || !collections?.token) {
      return res.status(500).json({ 
        status: 500, 
        message: 'Database not initialized' 
      });
    }

    const { email } = req.body;

    const user = await collections.users.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const tokens = crypto.randomBytes(32).toString('hex');
    const result = await collections.token.insertOne({ email: email, token: tokens });

    const resetPasswordLink = `https://your-app.com/reset-password/${tokens}`;

    if (result) {
      const mailOptions = {
        from: 'info@logicrent.ae',
        to: `${email}`,
        subject: 'Password Reset Request',
        text: `Click the following link to reset your password: ${resetPasswordLink}`,
      };

      await sendEmail(`${email}`, 'Password Reset Request', mailOptions.text, '');

      return res.status(201).send({ status: 201, message: `Sent email to forgot password. Please reset through the link.` });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      status: 500, 
      message: 'Internal Server Error',
      error: (error as Error).message 
    });
  }
});

authRouter.put('/changePassword', async (req: Request, res: Response) => {
  try {
    if (!collections?.users || !collections?.token) {
      return res.status(500).json({ 
        status: 500, 
        message: 'Database not initialized' 
      });
    }

    const { email, newPassword, token }: forgotPassoword = req.body;
    const user = await collections.users.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const result = await collections.token.findOne({ email: email, token: token });

    if (!result) {
      return res.status(401).send({ status: 401, message: `Not authorized` });
    }

    const data = new Auth("test", "test", "info@logicrent.ae", "qwert12345", "9347323770", "test", "test", "test", "test", "test");
    const hashPass = data.hashPassword(newPassword);
    const result1 = await collections.users.updateOne({ email: email }, { $set: { password: hashPass } });

    if (result1) {
      const removeToken = await collections.token.deleteOne({ email: email });
      return res.status(200).send({ status: 200, message: "Password reset successful!" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ 
      status: 500, 
      message: "Internal Server Error",
      error: (err as Error).message 
    });
  }
});

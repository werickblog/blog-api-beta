import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Auth from "../models/auth";
import {
  validateEmail,
  validatePassword,
  validateString
} from "../helpers/validator";
import config from "../../config";

export const loginAdmin = (req, res) => {
  let data = {
    email: req.body.email,
    password: req.body.password
  };

  let passRes = validatePassword(data.password);
  let emailRes = validateEmail(data.email);

  if (emailRes.correct) {
    if (passRes.correct) {
      Auth.findOne({
        email: data.email,
        role: "Admin"
      }).exec((err, result) => {
        if (err) {
          res.status(400).json({
            message: err.message
          });
        } else {
          if (result) {
            if (bcrypt.compareSync(data.password, result.password)) {
              res.status(200).json({
                token: jwt.sign(
                  {
                    exp: Math.floor(Date.now() / 1000) + 60 * 60,
                    data: data.email
                  },
                  config.secretKey
                ),
                user: {
                  email: result.email,
                  name: result.name
                }
              });
            } else {
              res.status(403).json({
                message: "Wrong credentials"
              });
            }
          } else {
            res.status(404).json({
              message: "User not found"
            });
          }
        }
      });
    } else {
      res.status(400).json({
        message: passRes.message
      });
    }
  } else {
    res.status(400).json({
      message: emailRes.message
    });
  }
};

export const signupUser = (req, res) => {
  let data = {
    email: req.body.email,
    password: req.body.password,
    confirm: req.body.confirm,
    name: req.body.name
  };

  let passRes = validatePassword(data.password);
  let confirmRes = validatePassword(data.confirm);
  let emailRes = validateEmail(data.email);
  let nameRes = validateString(data.name);

  if (emailRes.correct) {
    if (passRes.correct) {
      if (nameRes.correct) {
        if (confirmRes.correct) {
          if (data.confirm === data.password) {
            data.password = bcrypt.hashSync(data.password, 10);
            data.role = 'Admin'

            Auth.findOne({ role: "Admin" }).exec((err, result) => {
              if (err) {
                res.status(400).json({
                  message: err.message
                });
              } else {
                if (result) {
                  res.status(403).json({
                    message: "An admin already exists, ask one to add you"
                  });
                } else {
                  Auth.insert(data, (err, docs) => {
                    if (err) {
                      res.status(400).json({
                        message: err.message
                      });
                    } else {
                      res.status(201).json({
                        user: docs
                      });
                    }
                  });
                }
              }
            });
          } else {
            res.status(400).json({
              message: "Passwords do not match"
            });
          }
        } else {
          res.status(400).json({
            message: confirmRes.message
          });
        }
      } else {
        res.status(400).json({
          message: nameRes.message
        });
      }
    } else {
      res.status(400).json({
        message: passRes.message
      });
    }
  } else {
    res.status(400).json({
      message: emailRes.message
    });
  }
};

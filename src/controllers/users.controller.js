
import { usersDao } from "../dao/factory.js";
import passport from "passport";

export const createUser = async (req, res, next) => {
  try {
    const response = await usersDao.createUser(req.body);
    res.status(200).json({ mensaje: "Usuario creado", usuario: response });
  } catch (error) {
    next(error);
  }
};

export const findUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const response = await usersDao.findUser(email, password);
    res.json({ mensaje: response });
  } catch (error) {
    next(error);
  }
};

export const profileRender = async (req, res, next) => {
  try {
    if (req.session.userInfo.rol === "Administrador") {
      res.render("products", {
        userData: req.session.userInfo,
        adminData: req.session.userInfo.rol,
      });
    } else {
      res.render("products", { userData: req.session.userInfo });
    }
  } catch (error) {
    next(error);
  }
};

export const userLogin = (req, res, next) => {
  passport.authenticate("login", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({ error: info.message });
    }
    req.session.userInfo = user;
    return res.json({ message: "logeado" });
  })(req, res, next);
};

export const userLogOut = async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        res.send("LogOut Error");
      } else {
				res.clearCookie("sessionID")
        res.status(400).redirect("/");
      }
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAllUsers = async (req,res,next) =>{
	try {
		const deleted = await usersDao.deleteAll();
		res.status(200).json({deleted:deleted})
	} catch (error) {
		next(error)
	}
}
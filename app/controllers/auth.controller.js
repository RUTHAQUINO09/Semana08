// app/controllers/auth.controller.js

import db from "../models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import authConfig from "../config/auth.config.js";

const { user: User, role: Role, Sequelize } = db;

// ============================
// 📌 Registro de usuarios
// ============================
export const signup = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 8);

    // Crear usuario
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Manejar roles asignados
    if (roles && roles.length > 0) {
      const foundRoles = await Role.findAll({
        where: { name: { [Sequelize.Op.in]: roles } },
      });

      if (foundRoles.length > 0) {
        await user.setRoles(foundRoles);
      } else {
        // Si no se encontraron roles válidos, asignar "user" por defecto
        const defaultRole = await Role.findOne({ where: { name: "user" } });
        await user.setRoles([defaultRole]);
      }
    } else {
      // Si no se especifican roles, asignar "user" por defecto
      const userRole = await Role.findOne({ where: { name: "user" } });
      await user.setRoles([userRole]);
    }

    res.status(201).json({
      message: "✅ User registered successfully!",
      user: {
        username: user.username,
        email: user.email,
        roles: roles && roles.length ? roles : ["user"],
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============================
// 🔑 Inicio de sesión
// ============================
export const signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Buscar usuario por nombre de usuario
    const user = await User.findOne({
      where: { username },
      include: [{ model: Role, as: "roles" }],
    });

    if (!user) {
      return res.status(404).json({ message: "❌ User not found." });
    }

    // Verificar contraseña
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({
        accessToken: null,
        message: "❌ Invalid password!",
      });
    }

    // Generar token JWT
    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: 86400, // 24 horas
    });

    // Formatear roles
    const authorities = user.roles.map(
      (role) => `ROLE_${role.name.toUpperCase()}`
    );

    // Responder con datos del usuario
    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

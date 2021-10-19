const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { mail, config } = require('./../config');
const UserService = require('./user.service');
const service = new UserService();

class AuthService {
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token,
    };
  }

  async sendRecovery(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const payload = { sub: user.id };
    const token = jwt.sign(payload, mail.jwtSecret, { expiresIn: '15min' });
    const link = `http://myfrontend.com/recovery?token=${token}`;
    await service.update(user.id, { recoveryToken: token });
    const infoEmail = {
      from: mail.user,
      to: `${user.email}`,
      subject: 'Email para recuperar contraseña',
      html: `<b>Ingresa a este link => ${link}</b>`,
    };
    const rta = await this.sendMail(infoEmail);
    return rta;
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, mail.jwtSecret);
      const user = await service.findOne(payload.sub);
      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, { recoveryToken: null, password: hash });
      return { message: 'password changed' };
    } catch (error) {
      throw boom.unauthorized();
    }
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: mail.host,
      secure: true,
      port: mail.port,
      auth: {
        user: mail.user,
        pass: mail.password,
      },
    });
    await transporter.sendMail(infoMail);
    return { message: 'mail sent' };
  }
}

module.exports = AuthService;

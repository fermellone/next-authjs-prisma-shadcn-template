// This file will generate a super admin account with a hashed password

import bcrypt from 'bcryptjs';

const PASSWORD = '';

const hashedPassword = bcrypt.hashSync(PASSWORD, 10);

console.info(hashedPassword);

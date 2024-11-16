import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { NextAuthConfig } from 'next-auth';
import { prisma } from './lib/prisma';

export const authConfig = {
	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {},
			},
			authorize: async (credentials) => {
				let user = null;

				// logic to verify if the user exists
				user = await prisma.user.findUnique({
					where: {
						email: credentials.email as string,
					},
				});

				if (!user) {
					// No user found, so this is their first attempt to login
					// meaning this is also the place you could do registration
					throw new Error('User not found.');
				} else {
					const isPasswordValid = bcrypt.compareSync(
						credentials.password as string,
						user.password as string
					);

					if (!isPasswordValid) {
						throw new Error('Invalid password.');
					}
				}

				// return user object with their profile data
				return user;
			},
		}),
	],
	pages: {
		signIn: '/login',
	},
} satisfies NextAuthConfig;

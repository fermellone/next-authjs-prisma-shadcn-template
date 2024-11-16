import { prisma } from '@/lib/prisma';
import { Prisma, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';
console.log('Seeding database...');

// Users
const users: Prisma.UserCreateInput[] = [
	{
		name: 'Jorge Lopez',
		email: 'jorge@example.com',
		password: 'jorge123',
		role: Role.ADMIN,
	},
	{
		name: 'Cosme Fulanito',
		email: 'cosme@fulanito.com',
		password: '1234567890',
		role: Role.USER,
	},
	{
		name: 'Juan Perez',
		email: 'juan@perez.com',
		password: '1234567890',
		role: Role.USER,
	},
	{
		name: 'Pedro Gomez',
		email: 'pedro@gomez.com',
		password: '1234567890',
		role: Role.ADMIN,
	},
	{
		name: 'Ana Gomez',
		email: 'ana@gomez.com',
		password: '1234567890',
		role: Role.USER,
	},
];

async function seedUsers() {
	await prisma.user.deleteMany();

	await prisma.user.createMany({
		data: users.map((user) => ({
			...user,
			password: bcrypt.hashSync(user.password, 10),
		})),
	});
}

await seedUsers();

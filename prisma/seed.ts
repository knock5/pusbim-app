import 'dotenv/config';
import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
	const adminEmail = 'admin@pusatbimbel.id';

	const existingAdmin = await prisma.user.findUnique({
		where: { email: adminEmail }
	});

	if (existingAdmin) {
		console.log('Admin user already exists. Skipping seeding.');
		return;
	}

	const passwordHash = await bcrypt.hash('admin123', 10);

	await prisma.user.create({
		data: {
			fullName: 'Administrator',
			email: adminEmail,
			passwordHash,
			role: Role.ADMIN
		}
	});

	console.log('Admin user created successfully.');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});

import { auth } from '@/auth';
import { Role } from '@prisma/client';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();

	if (session?.user.role !== Role.SUPER_ADMIN) {
		redirect('/');
	}
	return <>{children}</>;
}

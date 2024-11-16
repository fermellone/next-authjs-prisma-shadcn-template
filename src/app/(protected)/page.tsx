import { auth } from '@/auth';
import { Role } from '@prisma/client';
import SuperAdminHome from '../../components/SuperAdminHome';
import AdminHome from '../../components/AdminHome';
import UserHome from '../../components/UserHome';

export default async function HomePage() {
	const session = await auth();

	return (
		<>
			{session?.user.role === Role.SUPER_ADMIN && <SuperAdminHome />}
			{session?.user.role === Role.ADMIN && <AdminHome />}
			{session?.user.role === Role.USER && <UserHome />}
		</>
	);
}

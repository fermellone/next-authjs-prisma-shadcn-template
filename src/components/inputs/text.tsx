import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control, FieldValues, Path } from 'react-hook-form';

type Props<T extends FieldValues> = {
	formControl: Control<T>;
	name: Path<T>;
	label?: string;
	placeholder?: string;
};

export default function TextInput<T extends FieldValues>({
	label,
	placeholder,
	formControl,
	name,
}: Props<T>) {
	return (
		<FormField
			name={name}
			control={formControl}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Input placeholder={placeholder} autoComplete="off" {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

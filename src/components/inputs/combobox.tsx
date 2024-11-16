import { Combobox } from '@/components/ui/combobox';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Control, FieldValues, Path } from 'react-hook-form';

type Option = {
	value: string;
	label: string;
};

type Props<T extends FieldValues> = {
	options: Option[];
	formControl: Control<T>;
	name: Path<T>;
	label?: string;
	placeholder?: string;
};

export default function CustomCombobox<T extends FieldValues>({
	options,
	label,
	name,
	formControl,
	placeholder = '',
}: Props<T>) {
	return (
		<FormField
			control={formControl}
			name={name}
			render={({ field }) => {
				return (
					<FormItem className="form-item">
						{!!label && <FormLabel className="form-label">{label}</FormLabel>}
						<Combobox
							options={options.filter(
								(option) => !field.value.includes(option.value)
							)}
							onSelect={(value) => field.onChange([...field.value, value])}
							value={field.value}
							placeholder={placeholder}
						/>
						<div className="my-2 flex flex-wrap gap-2">
							{(field.value ?? []).map((itemId: string) => (
								<Badge key={itemId}>
									{options.find((option) => option.value === itemId)?.label}
									<X
										onClick={() =>
											field.onChange(
												field.value.filter((id: string) => id !== itemId)
											)
										}
										className="ml-2 cursor-pointer"
									/>
								</Badge>
							))}
						</div>
					</FormItem>
				);
			}}
		></FormField>
	);
}

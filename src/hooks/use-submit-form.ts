import { useToast } from '@/hooks/use-toast';
import { ActionResult } from '@/types/action-result';

type SuccessNotification = {
	title: string;
	description: string;
};

type Props<FormSchemaType> = {
	values: FormSchemaType;
	action: (data: FormSchemaType) => Promise<ActionResult>;
	successNotification: SuccessNotification;
	onSuccess?: (result: ActionResult) => void;
	onError?: (error: Error) => void;
	onFinish?: () => void;
};

export const useSubmitForm = <FormSchemaType>() => {
	const { toast } = useToast();
	return async ({
		action,
		values,
		successNotification,
		onSuccess,
		onError,
		onFinish,
	}: Props<FormSchemaType>) => {
		try {
			const result = await action(values);
			if (result.success) {
				toast(successNotification);
			} else {
				throw new Error(result.error || 'Ocurrió un error desconocido');
			}
			if (!!onSuccess) {
				onSuccess(result);
			}
		} catch (error) {
			console.error(error);
			toast({
				title: 'Error',
				description:
					error instanceof Error
						? error.message
						: 'Ocurrió un error desconocido',
				variant: 'destructive',
			});
			if (!!onError) {
				onError(error as Error);
			}
		} finally {
			if (!!onFinish) {
				onFinish();
			}
		}
	};
};

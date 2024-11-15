import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';


export default function CreateCategory({ className = '' }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: ''
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('categories'), {
            onFinish: () => reset('name'),
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Create Category
                </h2>
            </header>
             <form onSubmit={submit}>
                <div>
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>
                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Create Category
                    </PrimaryButton>
                </div>
            </form>
        </section>
    )
}
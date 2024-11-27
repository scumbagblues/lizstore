import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function DeleteCategory({ className = '' }) {
    const [confirmingCategoryDeletion, setconfirmingCategoryDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmCategoryDeletion = () => {
        setconfirmingCategoryDeletion(true);
    };

    const deleteCategory = (e) => {
        e.preventDefault();

        destroy(route('categories.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            //onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setconfirmingCategoryDeletion(false);
        clearErrors();
        reset();
    };
  
    return (
        <section className={`space-y-6 ${className}`}>
            <DangerButton onClick={confirmCategoryDeletion}>
                Delete Category
            </DangerButton>

            <Modal show={confirmCategoryDeletion} onClose={closeModal}>
                <form onSubmit={deleteCategory} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Are you sure you want to delete your category?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Once your category is deleted you cannot restore. You need to create a new category again.
                    </p>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Delete Account
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}

import React, { useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';


const Edit = ({category}) => {
    const { data, setData, post, processing, errors } = useForm({
        name: category.name,
        path_category_img: null,
    });

    const [previewImage, setPreviewImage] = useState(
        category.path_category_img ? `/storage/${category.path_category_img}` : null
    );

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('path_category_img', file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('categories.update', category.id), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                Edit Categories
            </h2>
        }
    >
        <Head title="Edit Categories" />
        <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">    
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <InputLabel htmlFor="name" value="Name" />
                                    <TextInput
                                        id="name"
                                        className="mt-1 block w-full"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        isFocused
                                        autoComplete="name"
                                    />
                                    <InputError className="mt-2" message={errors.name} />
                                </div>
                                <div className="mb-4">
                                    <InputLabel htmlFor="name" value="Category Image" />
                                    {previewImage && (
                                        <img src={previewImage} alt="Preview" className="mb-2 h-20 w-20 object-cover" />
                                    )}
                                    <input
                                        type="file"
                                        onChange={handleImageChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600"
                                    />
                                    <InputError className="mt-2" message={errors.path_category_img} />
                                </div>
                                <div className="flex mt-4 items-center gap-4">
                                    <PrimaryButton disabled={processing}>
                                        Update Category
                                    </PrimaryButton>
                                </div>
                                
                            </form>
                        </div>
                    </div>    
                </div>
            </div>
    </AuthenticatedLayout>
    );
};

export default Edit;
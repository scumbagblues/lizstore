import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head } from '@inertiajs/react';

const Create = ({categories, auth, errors}) => {
    const { data, setData, post, processing } = useForm({
        name: '',
        description: '',
        price: '',
        stock: '',
        category_id: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('products.store'));
    };
    
    return (
        <AuthenticatedLayout>
            <Head title="Create Product" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h1 className="text-2xl font-semibold mb-6">Create Product</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
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
                                    {errors.name && <div className="mt-2 text-sm text-red-600">{errors.name}</div>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                                    <textarea
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600"
                                    />
                                    {errors.description && <div className="mt-2 text-sm text-red-600">{errors.description}</div>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price</label>
                                    <TextInput
                                        type="number"
                                        id="price"
                                        name="price"
                                        value={data.price}
                                        className="mt-1 block w-full"
                                        autoComplete="price"
                                        isFocused={true}
                                        onChange={(e) => setData('price', e.target.value)}
                                        required
                                    />
                                    {errors.price && <div className="mt-2 text-sm text-red-600">{errors.price}</div>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Stock</label>
                                    <TextInput
                                        type="number"
                                        id="stock"
                                        name="stock"
                                        value={data.stock}
                                        className="mt-1 block w-full"
                                        autoComplete="stock"
                                        isFocused={true}
                                        onChange={(e) => setData('stock', e.target.value)}
                                        required
                                    />
                                    {errors.stock && <div className="mt-2 text-sm text-red-600">{errors.stock}</div>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                                    <select
                                        value={data.category_id}
                                        onChange={(e) => setData('category_id', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600"
                                        required
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category_id && <div className="mt-2 text-sm text-red-600">{errors.category_id}</div>}
                                </div>
                                <PrimaryButton type="submit" disabled={processing}>
                                    Create Product
                                </PrimaryButton>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;
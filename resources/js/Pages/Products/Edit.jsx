import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head } from '@inertiajs/react';

const Edit = ({ product, categories }) => {
    const { data, setData, post, processing, errors } = useForm({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category_id: product.category_id,
        image1: null,
        image2: null,
        image3: null,
        image4: null,
        image5: null,
    });

    const [previewImages, setPreviewImages] = useState({
        image1: product.image1 ? `/storage/${product.image1}` : null,
        image2: product.image2 ? `/storage/${product.image2}` : null,
        image3: product.image3 ? `/storage/${product.image3}` : null,
        image4: product.image4 ? `/storage/${product.image4}` : null,
        image5: product.image5 ? `/storage/${product.image5}` : null,
    });

    const handleImageChange = (e, imageKey) => {
        const file = e.target.files[0];
        setData(imageKey, file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImages((prev) => ({
                    ...prev,
                    [imageKey]: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('products.update', product.id), {
            forceFormData: true,
        });
    };
   
    return (
        <AuthenticatedLayout>
            <Head title="Edit Product" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h1 className="text-2xl font-semibold mb-6">Edit Product</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600"
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
                                    <input
                                        type="number"
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600"
                                        required
                                    />
                                    {errors.price && <div className="mt-2 text-sm text-red-600">{errors.price}</div>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Stock</label>
                                    <input
                                        type="number"
                                        value={data.stock}
                                        onChange={(e) => setData('stock', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600"
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
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image {i}</label>
                                        {previewImages[`image${i}`] && (
                                            <img src={previewImages[`image${i}`]} alt={`Preview ${i}`} className="mb-2 h-20 w-20 object-cover" />
                                        )}
                                        <input
                                            type="file"
                                            onChange={(e) => handleImageChange(e, `image${i}`)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600"
                                        />
                                        {errors[`image${i}`] && <div className="mt-2 text-sm text-red-600">{errors[`image${i}`]}</div>}
                                    </div>
                                ))}
                                <PrimaryButton type="submit" disabled={processing}>
                                    Update Product
                                </PrimaryButton>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
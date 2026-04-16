// app/dashboard/images/page.js
'use client';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaTrash, FaPlus, FaTimes, FaUpload, FaImage, FaEdit, FaExclamationTriangle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import DashboardLayout from '../page';


// Separate Image Form Modal (for both create and edit)
const ImageFormModal = ({ isOpen, onClose, onSubmit, isLoading, editingImage }) => {
    const [formData, setFormData] = useState({
        title: '',
        photo: null
    });
    const [preview, setPreview] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isOpen && editingImage) {
            setFormData({
                title: editingImage.title || '',
                photo: null
            });
            if (editingImage.photo) {
                setPreview(editingImage.photo);
            }
        } else if (isOpen && !editingImage) {
            setFormData({ title: '', photo: null });
            setPreview(null);
        }
        setErrors({});
    }, [isOpen, editingImage]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, photo: file }));
            
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const submitData = new FormData();
            submitData.append('title', formData.title);
            if (formData.photo) {
                submitData.append('photo', formData.photo);
            }
            onSubmit(submitData);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 py-8">
                <div 
                    className="fixed inset-0 backdrop-blur-md bg-white/30" 
                    onClick={onClose}
                ></div>

                <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full z-[10000]">
                    <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-900">
                            {editingImage ? 'Edit Image' : 'Add New Photo'}
                        </h3>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                            <FaTimes />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff9100] focus:border-transparent`}
                                placeholder="Enter image title"
                            />
                            {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Image {!editingImage && <span className="text-red-500">*</span>}
                                {editingImage && <span className="text-xs text-gray-400 ml-2">(Leave empty to keep current image)</span>}
                            </label>
                            <div className="mt-1">
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#ff9100] transition">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        {preview ? (
                                            <img src={preview} alt="Preview" className="h-24 w-24 object-cover rounded" />
                                        ) : (
                                            <>
                                                <FaUpload className="text-2xl text-gray-400 mb-2" />
                                                <p className="text-sm text-gray-500">Click to {editingImage ? 'change' : 'upload'} image</p>
                                                <p className="text-xs text-gray-400">PNG, JPG, JPEG up to 5MB</p>
                                            </>
                                        )}
                                    </div>
                                    <input
                                        type="file"
                                        name="photo"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            {errors.photo && <p className="mt-1 text-xs text-red-500">{errors.photo}</p>}
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex-1 px-4 py-2 bg-[#ff9100] text-white rounded-lg hover:bg-[#e68200] transition disabled:opacity-50 cursor-pointer"
                            >
                                {isLoading ? (editingImage ? 'Updating...' : 'Uploading...') : (editingImage ? 'Update Image' : 'Upload Image')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

// Delete Confirmation Modal
const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, image }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
                <div 
                    className="fixed inset-0 backdrop-blur-md bg-white/30" 
                    onClick={onClose}
                ></div>

                <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 z-[10000]">
                    <div className="text-center">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                            <FaExclamationTriangle className="h-6 w-6 text-red-600" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-gray-900">Delete Image</h3>
                        <p className="mt-2 text-sm text-gray-500">
                            Are you sure you want to delete "<span className="font-medium text-gray-700">{image?.title}</span>"?
                            This action cannot be undone.
                        </p>
                    </div>

                    <div className="mt-6 flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Main Component
export default function ImagesPage() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingImage, setEditingImage] = useState(null);
    const [deleteModal, setDeleteModal] = useState({ show: false, image: null });
    const [formLoading, setFormLoading] = useState(false);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const itemsPerPage = 12;

    const getAuthToken = () => localStorage.getItem('auth_token');

    const fetchImages = useCallback(async (page = 1) => {
        setLoading(true);
        setError(null);
        try {
            const token = getAuthToken();
            const response = await axios.get(
                `https://nortway.mrshakil.com/api/gallery/photos/?page=${page}&page_size=${itemsPerPage}`,
                { headers: { 'Authorization': `Token ${token}` } }
            );
            if (response.data.success) {
                setImages(response.data.data);
                setTotalPages(response.data.total_pages);
                setTotalCount(response.data.count);
                setCurrentPage(response.data.current_page);
            }
        } catch (err) {
            console.error('Error fetching images:', err);
            setError('Failed to fetch images. Please try again.');
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to fetch images. Please try again.',
                confirmButtonColor: '#ff9100'
            });
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchImages(currentPage);
    }, [currentPage, fetchImages]);

    const handleSubmit = async (submitData) => {
        setFormLoading(true);
        try {
            const token = getAuthToken();
            let response;
            
            if (editingImage) {
                // Update existing image using PUT method
                response = await axios.put(
                    `https://nortway.mrshakil.com/api/gallery/photos/${editingImage.id}/`,
                    submitData,
                    { headers: { 'Authorization': `Token ${token}`, 'Content-Type': 'multipart/form-data' } }
                );
            } else {
                // Create new image
                response = await axios.post(
                    'https://nortway.mrshakil.com/api/gallery/photos/',
                    submitData,
                    { headers: { 'Authorization': `Token ${token}`, 'Content-Type': 'multipart/form-data' } }
                );
            }
            
            if (response.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: editingImage ? 'Updated!' : 'Uploaded!',
                    text: editingImage ? 'Image updated successfully.' : 'Image uploaded successfully.',
                    confirmButtonColor: '#ff9100',
                    timer: 2000,
                    timerProgressBar: true
                });
                setShowForm(false);
                setEditingImage(null);
                fetchImages(currentPage);
            }
        } catch (err) {
            console.error('Error saving image:', err);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: err.response?.data?.message || `Failed to ${editingImage ? 'update' : 'upload'} image. Please try again.`,
                confirmButtonColor: '#ff9100'
            });
        } finally {
            setFormLoading(false);
        }
    };

    const handleEdit = (image) => {
        setEditingImage(image);
        setShowForm(true);
    };

    const handleDelete = async () => {
        if (!deleteModal.image) return;
        
        try {
            const token = getAuthToken();
            const response = await axios.delete(
                `https://nortway.mrshakil.com/api/gallery/photos/${deleteModal.image.id}/`,
                { headers: { 'Authorization': `Token ${token}` } }
            );
            
            if (response.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: `Image "${deleteModal.image.title}" has been deleted.`,
                    confirmButtonColor: '#ff9100',
                    timer: 2000,
                    timerProgressBar: true
                });
                setDeleteModal({ show: false, image: null });
                if (images.length === 1 && currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                } else {
                    fetchImages(currentPage);
                }
            }
        } catch (err) {
            console.error('Error deleting image:', err);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to delete image. Please try again.',
                confirmButtonColor: '#ff9100'
            });
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const resetForm = () => {
        setShowForm(false);
        setEditingImage(null);
    };

    // Image Gallery Component
    const ImageGallery = () => {
        if (loading) {
            return (
                <div className="bg-white rounded-lg border border-gray-200 p-8">
                    <div className="flex justify-center items-center h-64">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff9100] mx-auto"></div>
                            <p className="mt-4 text-gray-600">Loading images...</p>
                        </div>
                    </div>
                </div>
            );
        }

        if (error) {
            return (
                <div className="bg-white rounded-lg border border-gray-200 p-8">
                    <div className="text-center text-red-600">
                        <p>{error}</p>
                        <button onClick={() => fetchImages(currentPage)} className="mt-4 px-4 py-2 bg-[#ff9100] text-white rounded-lg">
                            Try Again
                        </button>
                    </div>
                </div>
            );
        }

        if (images.length === 0) {
            return (
                <div className="bg-white rounded-lg border border-gray-200 p-12">
                    <div className="text-center">
                        <FaImage className="text-6xl text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No images yet</h3>
                        <p className="text-gray-500 mb-4">Get started by uploading your first image.</p>
                        <button onClick={() => setShowForm(true)} className="px-4 py-2 bg-[#ff9100] text-white rounded-lg hover:bg-[#e68200] transition">
                            + Upload Image
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {images.map((image) => (
                        <div key={image.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition group relative">
                            <div className="aspect-square bg-gray-100 relative">
                                {image.photo ? (
                                    <img 
                                        src={image.photo} 
                                        alt={image.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <FaImage className="text-4xl text-gray-300" />
                                    </div>
                                )}
                                
                                {/* Action Buttons - Appear on hover */}
                                <div className="absolute top-2 right-2 flex gap-2">
                                    <button
                                        onClick={() => handleEdit(image)}
                                        className="p-2 bg-blue-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition hover:bg-blue-600"
                                        title="Edit"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => setDeleteModal({ show: true, image })}
                                        className="p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition hover:bg-red-600"
                                        title="Delete"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                            <div className="p-3">
                                <p className="text-sm font-medium text-gray-900 truncate">{image.title}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-6 px-4 py-3 bg-white rounded-lg border border-gray-200 flex items-center justify-between flex-wrap gap-2">
                        <div className="text-sm text-gray-500">
                            Showing {images.length} of {totalCount} images
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                            >
                                Previous
                            </button>
                            
                            <div className="flex items-center gap-1">
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    let pageNum;
                                    if (totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (currentPage <= 3) {
                                        pageNum = i + 1;
                                    } else if (currentPage >= totalPages - 2) {
                                        pageNum = totalPages - 4 + i;
                                    } else {
                                        pageNum = currentPage - 2 + i;
                                    }
                                    
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => handlePageChange(pageNum)}
                                            className={`px-3 py-1 text-sm rounded-md transition ${
                                                currentPage === pageNum
                                                    ? 'bg-[#ff9100] text-white'
                                                    : 'border border-gray-300 hover:bg-gray-50'
                                            }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                            </div>
                            
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center flex-wrap gap-3">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Photo Gallery</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Total {totalCount} image{totalCount !== 1 ? 's' : ''} found
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            setEditingImage(null);
                            setShowForm(true);
                        }}
                        className="px-4 py-2 bg-[#ff9100] text-white rounded-lg hover:bg-[#e68200] transition flex items-center gap-2 cursor-pointer"
                    >
                        <FaPlus /> Upload Image
                    </button>
                </div>

                {/* Image Gallery */}
                <ImageGallery />

                {/* Upload/Edit Image Form Modal */}
                <ImageFormModal
                    isOpen={showForm}
                    onClose={resetForm}
                    onSubmit={handleSubmit}
                    isLoading={formLoading}
                    editingImage={editingImage}
                />

                {/* Delete Confirmation Modal */}
                <DeleteConfirmationModal
                    isOpen={deleteModal.show}
                    onClose={() => setDeleteModal({ show: false, image: null })}
                    onConfirm={handleDelete}
                    image={deleteModal.image}
                />
            </div>
        </DashboardLayout>
    );
}
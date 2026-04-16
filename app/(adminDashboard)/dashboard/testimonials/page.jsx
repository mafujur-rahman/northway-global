// app/dashboard/testimonials/page.js
'use client';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaTrash, FaPlus, FaTimes, FaEdit, FaStar, FaUserCircle, FaImage, FaExclamationTriangle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import DashboardLayout from '../page';


// Testimonial Form Modal (for both create and edit)
const TestimonialFormModal = ({ isOpen, onClose, onSubmit, isLoading, editingTestimonial }) => {
    const [formData, setFormData] = useState({
        name: '',
        university: '',
        star: 5,
        comments: '',
        profile_image: null
    });
    const [preview, setPreview] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isOpen && editingTestimonial) {
            setFormData({
                name: editingTestimonial.name || '',
                university: editingTestimonial.university || '',
                star: editingTestimonial.star || 5,
                comments: editingTestimonial.comments || '',
                profile_image: null
            });
            if (editingTestimonial.profile_image) {
                setPreview(editingTestimonial.profile_image);
            }
        } else if (isOpen && !editingTestimonial) {
            setFormData({
                name: '',
                university: '',
                star: 5,
                comments: '',
                profile_image: null
            });
            setPreview(null);
        }
        setErrors({});
    }, [isOpen, editingTestimonial]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleStarChange = (rating) => {
        setFormData(prev => ({ ...prev, star: rating }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, profile_image: file }));
            
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.university.trim()) newErrors.university = 'University/Institution is required';
        if (!formData.comments.trim()) newErrors.comments = 'Comments are required';
        if (formData.star < 1 || formData.star > 5) newErrors.star = 'Rating must be between 1 and 5';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const submitData = new FormData();
            submitData.append('name', formData.name);
            submitData.append('university', formData.university);
            submitData.append('star', formData.star);
            submitData.append('comments', formData.comments);
            if (formData.profile_image) {
                submitData.append('profile_image', formData.profile_image);
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

                <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto z-[10000]">
                    <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-900">
                            {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
                        </h3>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                            <FaTimes />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff9100] focus:border-transparent`}
                                placeholder="Enter full name"
                            />
                            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                University/Institution <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="university"
                                value={formData.university}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border ${errors.university ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff9100] focus:border-transparent`}
                                placeholder="Enter university or institution name"
                            />
                            {errors.university && <p className="mt-1 text-xs text-red-500">{errors.university}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Rating <span className="text-red-500">*</span>
                            </label>
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((rating) => (
                                    <button
                                        key={rating}
                                        type="button"
                                        onClick={() => handleStarChange(rating)}
                                        className="focus:outline-none"
                                    >
                                        <FaStar 
                                            className={`text-2xl transition ${
                                                rating <= formData.star 
                                                    ? 'text-[#ff9100]' 
                                                    : 'text-gray-300 hover:text-gray-400'
                                            }`}
                                        />
                                    </button>
                                ))}
                                <span className="ml-2 text-sm text-gray-500">({formData.star}/5)</span>
                            </div>
                            {errors.star && <p className="mt-1 text-xs text-red-500">{errors.star}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Comments <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="comments"
                                rows="4"
                                value={formData.comments}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border ${errors.comments ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff9100] focus:border-transparent`}
                                placeholder="Write testimonial comments..."
                            />
                            {errors.comments && <p className="mt-1 text-xs text-red-500">{errors.comments}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Profile Image
                                {editingTestimonial && <span className="text-xs text-gray-400 ml-2">(Leave empty to keep current image)</span>}
                            </label>
                            <div className="mt-1">
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#ff9100] transition">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        {preview ? (
                                            <img src={preview} alt="Preview" className="h-20 w-20 object-cover rounded-full" />
                                        ) : (
                                            <>
                                                <FaImage className="text-2xl text-gray-400 mb-2" />
                                                <p className="text-sm text-gray-500">Click to upload profile image</p>
                                                <p className="text-xs text-gray-400">PNG, JPG, JPEG up to 2MB</p>
                                            </>
                                        )}
                                    </div>
                                    <input
                                        type="file"
                                        name="profile_image"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>
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
                                className="flex-1 px-4 py-2 bg-[#ff9100] text-white rounded-lg hover:bg-[#e68200] transition disabled:opacity-50"
                            >
                                {isLoading ? (editingTestimonial ? 'Updating...' : 'Saving...') : (editingTestimonial ? 'Update Testimonial' : 'Save Testimonial')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

// Delete Confirmation Modal
const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, testimonial }) => {
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
                        <h3 className="mt-4 text-lg font-semibold text-gray-900">Delete Testimonial</h3>
                        <p className="mt-2 text-sm text-gray-500">
                            Are you sure you want to delete testimonial from "<span className="font-medium text-gray-700">{testimonial?.name}</span>"?
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
export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState(null);
    const [deleteModal, setDeleteModal] = useState({ show: false, testimonial: null });
    const [formLoading, setFormLoading] = useState(false);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const itemsPerPage = 6;

    const getAuthToken = () => localStorage.getItem('auth_token');

    const fetchTestimonials = useCallback(async (page = 1) => {
        setLoading(true);
        setError(null);
        try {
            const token = getAuthToken();
            const response = await axios.get(
                `https://nortway.mrshakil.com/api/testimonial/?page=${page}&page_size=${itemsPerPage}`,
                { headers: { 'Authorization': `Token ${token}` } }
            );
            if (response.data.success) {
                setTestimonials(response.data.data);
                setTotalPages(response.data.total_pages);
                setTotalCount(response.data.count);
                setCurrentPage(response.data.current_page);
            }
        } catch (err) {
            console.error('Error fetching testimonials:', err);
            setError('Failed to fetch testimonials. Please try again.');
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to fetch testimonials. Please try again.',
                confirmButtonColor: '#ff9100'
            });
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTestimonials(currentPage);
    }, [currentPage, fetchTestimonials]);

    const handleSubmit = async (submitData) => {
        setFormLoading(true);
        try {
            const token = getAuthToken();
            let response;
            
            if (editingTestimonial) {
                // Update existing testimonial using PUT method
                response = await axios.put(
                    `https://nortway.mrshakil.com/api/testimonial/${editingTestimonial.id}/`,
                    submitData,
                    { headers: { 'Authorization': `Token ${token}`, 'Content-Type': 'multipart/form-data' } }
                );
            } else {
                // Create new testimonial
                response = await axios.post(
                    'https://nortway.mrshakil.com/api/testimonial/',
                    submitData,
                    { headers: { 'Authorization': `Token ${token}`, 'Content-Type': 'multipart/form-data' } }
                );
            }
            
            if (response.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: editingTestimonial ? 'Updated!' : 'Added!',
                    text: editingTestimonial ? 'Testimonial updated successfully.' : 'New testimonial added successfully.',
                    confirmButtonColor: '#ff9100',
                    timer: 2000,
                    timerProgressBar: true
                });
                setShowForm(false);
                setEditingTestimonial(null);
                fetchTestimonials(currentPage);
            }
        } catch (err) {
            console.error('Error saving testimonial:', err);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: err.response?.data?.message || `Failed to ${editingTestimonial ? 'update' : 'add'} testimonial. Please try again.`,
                confirmButtonColor: '#ff9100'
            });
        } finally {
            setFormLoading(false);
        }
    };

    const handleEdit = (testimonial) => {
        setEditingTestimonial(testimonial);
        setShowForm(true);
    };

    const handleDelete = async () => {
        if (!deleteModal.testimonial) return;
        
        try {
            const token = getAuthToken();
            const response = await axios.delete(
                `https://nortway.mrshakil.com/api/testimonial/${deleteModal.testimonial.id}/`,
                { headers: { 'Authorization': `Token ${token}` } }
            );
            
            if (response.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: `Testimonial from "${deleteModal.testimonial.name}" has been deleted.`,
                    confirmButtonColor: '#ff9100',
                    timer: 2000,
                    timerProgressBar: true
                });
                setDeleteModal({ show: false, testimonial: null });
                if (testimonials.length === 1 && currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                } else {
                    fetchTestimonials(currentPage);
                }
            }
        } catch (err) {
            console.error('Error deleting testimonial:', err);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to delete testimonial. Please try again.',
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
        setEditingTestimonial(null);
    };

    // Render Stars
    const renderStars = (rating) => {
        return (
            <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar 
                        key={star} 
                        className={`text-sm ${star <= rating ? 'text-[#ff9100]' : 'text-gray-300'}`}
                    />
                ))}
            </div>
        );
    };

    // Testimonials Grid Component
    const TestimonialsGrid = () => {
        if (loading) {
            return (
                <div className="bg-white rounded-lg border border-gray-200 p-8">
                    <div className="flex justify-center items-center h-64">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff9100] mx-auto"></div>
                            <p className="mt-4 text-gray-600">Loading testimonials...</p>
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
                        <button onClick={() => fetchTestimonials(currentPage)} className="mt-4 px-4 py-2 bg-[#ff9100] text-white rounded-lg">
                            Try Again
                        </button>
                    </div>
                </div>
            );
        }

        if (testimonials.length === 0) {
            return (
                <div className="bg-white rounded-lg border border-gray-200 p-12">
                    <div className="text-center">
                        <FaUserCircle className="text-6xl text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No testimonials yet</h3>
                        <p className="text-gray-500 mb-4">Get started by adding your first testimonial.</p>
                        <button onClick={() => setShowForm(true)} className="px-4 py-2 bg-[#ff9100] text-white rounded-lg hover:bg-[#e68200] transition cursor-pointer">
                            <FaPlus className="inline mr-2" /> Add Testimonial
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition group relative">
                            {/* Testimonial Card */}
                            <div className="p-6">
                                {/* Header with Profile Image and Name */}
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="relative">
                                        {testimonial.profile_image ? (
                                            <img 
                                                src={testimonial.profile_image} 
                                                alt={testimonial.name}
                                                className="w-16 h-16 rounded-full object-cover border-2 border-[#ff9100]"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center border-2 border-[#ff9100]">
                                                <FaUserCircle className="text-3xl text-gray-400" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900 text-lg">{testimonial.name}</h3>
                                        <p className="text-sm text-gray-500">{testimonial.university}</p>
                                        <div className="mt-1">
                                            {renderStars(testimonial.star)}
                                        </div>
                                    </div>
                                </div>

                                {/* Comments */}
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    "{testimonial.comments}"
                                </p>

                                {/* Date */}
                                {testimonial.created_at && (
                                    <p className="text-xs text-gray-400">
                                        Posted on {new Date(testimonial.created_at).toLocaleDateString()}
                                    </p>
                                )}
                            </div>

                            {/* Action Buttons - Appear on hover */}
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                                <button
                                    onClick={() => handleEdit(testimonial)}
                                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                    title="Edit"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => setDeleteModal({ show: true, testimonial })}
                                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                    title="Delete"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-6 px-4 py-3 bg-white rounded-lg border border-gray-200 flex items-center justify-between flex-wrap gap-2">
                        <div className="text-sm text-gray-500">
                            Showing {testimonials.length} of {totalCount} testimonials
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
                        <h2 className="text-2xl font-bold text-gray-900">Testimonials Management</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Total {totalCount} testimonial{totalCount !== 1 ? 's' : ''} found
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            setEditingTestimonial(null);
                            setShowForm(true);
                        }}
                        className="px-4 py-2 bg-[#ff9100] text-white rounded-lg hover:bg-[#e68200] transition flex items-center gap-2 cursor-pointer"
                    >
                        <FaPlus /> Add Testimonial
                    </button>
                </div>

                {/* Testimonials Grid */}
                <TestimonialsGrid />

                {/* Add/Edit Testimonial Form Modal */}
                <TestimonialFormModal
                    isOpen={showForm}
                    onClose={resetForm}
                    onSubmit={handleSubmit}
                    isLoading={formLoading}
                    editingTestimonial={editingTestimonial}
                />

                {/* Delete Confirmation Modal */}
                <DeleteConfirmationModal
                    isOpen={deleteModal.show}
                    onClose={() => setDeleteModal({ show: false, testimonial: null })}
                    onConfirm={handleDelete}
                    testimonial={deleteModal.testimonial}
                />
            </div>
        </DashboardLayout>
    );
}
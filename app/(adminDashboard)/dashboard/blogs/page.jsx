// app/dashboard/blogs/page.js
'use client';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaFilePdf, FaTimes, FaUpload, FaExclamationTriangle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import DashboardLayout from '../page';


// Separate Blog Form Modal Component to prevent re-renders
const BlogFormModal = ({ isOpen, onClose, onSubmit, initialData, isLoading, editingBlog }) => {
    const [formData, setFormData] = useState({
        title: '',
        writer: '',
        short_summary: '',
        content: '',
        pdf_file: null,
        thumbnail: null
    });
    const [preview, setPreview] = useState({ thumbnail: null, pdf: null });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                writer: initialData.writer || '',
                short_summary: initialData.short_summary || '',
                content: initialData.content || '',
                pdf_file: null,
                thumbnail: null
            });
            if (initialData.thumbnail) {
                setPreview(prev => ({ ...prev, thumbnail: initialData.thumbnail }));
            }
        } else {
            setFormData({
                title: '',
                writer: '',
                short_summary: '',
                content: '',
                pdf_file: null,
                thumbnail: null
            });
            setPreview({ thumbnail: null, pdf: null });
        }
        setErrors({});
    }, [initialData, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];

        if (file) {
            setFormData(prev => ({ ...prev, [name]: file }));

            if (name === 'thumbnail') {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreview(prev => ({ ...prev, thumbnail: reader.result }));
                };
                reader.readAsDataURL(file);
            } else if (name === 'pdf_file') {
                setPreview(prev => ({ ...prev, pdf: file.name }));
            }
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.writer.trim()) newErrors.writer = 'Writer name is required';
        if (!formData.short_summary.trim()) newErrors.short_summary = 'Short summary is required';
        if (!formData.content.trim()) newErrors.content = 'Content is required';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const submitData = new FormData();
            submitData.append('title', formData.title);
            submitData.append('writer', formData.writer);
            submitData.append('short_summary', formData.short_summary);
            submitData.append('content', formData.content);
            
            if (formData.thumbnail && formData.thumbnail instanceof File) {
                submitData.append('thumbnail', formData.thumbnail);
            }
            if (formData.pdf_file && formData.pdf_file instanceof File) {
                submitData.append('pdf_file', formData.pdf_file);
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
                    <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
                        <h3 className="text-lg font-semibold text-gray-900">
                            {editingBlog ? 'Edit Blog' : 'Create New Blog'}
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
                                placeholder="Enter blog title"
                            />
                            {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Writer Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="writer"
                                value={formData.writer}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border ${errors.writer ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff9100] focus:border-transparent`}
                                placeholder="Enter writer name"
                            />
                            {errors.writer && <p className="mt-1 text-xs text-red-500">{errors.writer}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Short Summary <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="short_summary"
                                rows="2"
                                value={formData.short_summary}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border ${errors.short_summary ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff9100] focus:border-transparent`}
                                placeholder="Enter short summary"
                            />
                            {errors.short_summary && <p className="mt-1 text-xs text-red-500">{errors.short_summary}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Content <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="content"
                                rows="5"
                                value={formData.content}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border ${errors.content ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff9100] focus:border-transparent`}
                                placeholder="Enter blog content"
                            />
                            {errors.content && <p className="mt-1 text-xs text-red-500">{errors.content}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Thumbnail Image
                            </label>
                            <div className="mt-1 flex items-center gap-4">
                                <label className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                                    <FaUpload className="mr-2 text-gray-400" />
                                    <span className="text-sm text-gray-600">Choose image</span>
                                    <input
                                        type="file"
                                        name="thumbnail"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </label>
                                {preview.thumbnail && (
                                    <div className="w-16 h-16">
                                        <img src={preview.thumbnail} alt="Preview" className="w-full h-full object-cover rounded" />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                PDF File
                            </label>
                            <label className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                                <FaUpload className="mr-2 text-gray-400" />
                                <span className="text-sm text-gray-600">
                                    {preview.pdf ? preview.pdf : 'Choose PDF file'}
                                </span>
                                <input
                                    type="file"
                                    name="pdf_file"
                                    accept=".pdf"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </label>
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
                                {isLoading ? 'Saving...' : (editingBlog ? 'Update Blog' : 'Create Blog')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

// Separate Delete Confirmation Modal
const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, blog }) => {
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
                        <h3 className="mt-4 text-lg font-semibold text-gray-900">Delete Blog</h3>
                        <p className="mt-2 text-sm text-gray-500">
                            Are you sure you want to delete "<span className="font-medium text-gray-700">{blog?.title}</span>"?
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
export default function BlogsPage() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [deleteModal, setDeleteModal] = useState({ show: false, blog: null });
    const [formLoading, setFormLoading] = useState(false);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const itemsPerPage = 10;

    const getAuthToken = () => localStorage.getItem('auth_token');

    const fetchBlogs = useCallback(async (page = 1) => {
        setLoading(true);
        setError(null);
        try {
            const token = getAuthToken();
            const response = await axios.get(
                `https://nortway.mrshakil.com/api/blogs/?page=${page}&page_size=${itemsPerPage}`,
                { headers: { 'Authorization': `Token ${token}` } }
            );
            if (response.data.success) {
                setBlogs(response.data.data);
                setTotalPages(response.data.total_pages);
                setTotalCount(response.data.count);
                setCurrentPage(response.data.current_page);
            }
        } catch (err) {
            setError('Failed to fetch blogs. Please try again.');
            Swal.fire({ icon: 'error', title: 'Error!', text: 'Failed to fetch blogs.', confirmButtonColor: '#ff9100' });
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBlogs(currentPage);
    }, [currentPage, fetchBlogs]);

    const handleSubmit = async (submitData) => {
        setFormLoading(true);
        try {
            const token = getAuthToken();
            const config = {
                headers: { 'Authorization': `Token ${token}`, 'Content-Type': 'multipart/form-data' }
            };
            
            let response;
            if (editingBlog) {
                response = await axios.put(`https://nortway.mrshakil.com/api/blogs/${editingBlog.id}/`, submitData, config);
            } else {
                response = await axios.post('https://nortway.mrshakil.com/api/blogs/', submitData, config);
            }
            
            if (response.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: editingBlog ? 'Updated!' : 'Created!',
                    text: editingBlog ? 'Blog updated successfully.' : 'New blog created successfully.',
                    confirmButtonColor: '#ff9100',
                    timer: 2000,
                    timerProgressBar: true
                });
                setShowForm(false);
                setEditingBlog(null);
                fetchBlogs(currentPage);
            }
        } catch (err) {
            Swal.fire({ icon: 'error', title: 'Error!', text: 'Failed to save blog.', confirmButtonColor: '#ff9100' });
        } finally {
            setFormLoading(false);
        }
    };

    const handleEdit = (blog) => {
        setEditingBlog(blog);
        setShowForm(true);
    };

    const handleDelete = async () => {
        if (!deleteModal.blog) return;
        try {
            const token = getAuthToken();
            const response = await axios.delete(`https://nortway.mrshakil.com/api/blogs/${deleteModal.blog.id}/`, {
                headers: { 'Authorization': `Token ${token}` }
            });
            if (response.data.success) {
                Swal.fire({ icon: 'success', title: 'Deleted!', text: `Blog deleted.`, confirmButtonColor: '#ff9100', timer: 2000 });
                setDeleteModal({ show: false, blog: null });
                if (blogs.length === 1 && currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                } else {
                    fetchBlogs(currentPage);
                }
            }
        } catch (err) {
            Swal.fire({ icon: 'error', title: 'Error!', text: 'Failed to delete blog.', confirmButtonColor: '#ff9100' });
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
    };

    const resetForm = () => {
        setEditingBlog(null);
        setShowForm(false);
    };

    // Blog Table Component
    const BlogTable = () => {
        if (loading) {
            return (
                <div className="bg-white rounded-lg border border-gray-200 p-8">
                    <div className="flex justify-center items-center h-64">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff9100] mx-auto"></div>
                            <p className="mt-4 text-gray-600">Loading blogs...</p>
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
                        <button onClick={() => fetchBlogs(currentPage)} className="mt-4 px-4 py-2 bg-[#ff9100] text-white rounded-lg">
                            Try Again
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr className="text-left">
                                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Thumbnail</th>
                                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Writer</th>
                                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">PDF</th>
                                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {blogs.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="px-4 py-12 text-center text-gray-500">
                                        No blogs found. Create your first blog!
                                    </td>
                                </tr>
                            ) : (
                                blogs.map((blog) => (
                                    <tr key={blog.id} className="hover:bg-gray-50 transition">
                                        <td className="px-4 py-3 text-sm text-gray-900">{blog.id}</td>
                                        <td className="px-4 py-3">
                                            {blog.thumbnail ? (
                                                <img src={blog.thumbnail} alt={blog.title} className="w-12 h-12 object-cover rounded" />
                                            ) : (
                                                <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                                                    <span className="text-xs text-gray-400">No img</span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="max-w-xs">
                                                <p className="text-sm font-medium text-gray-900 truncate">{blog.title}</p>
                                                <p className="text-xs text-gray-500 mt-1 truncate">{blog.short_summary}</p>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{blog.writer}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{blog.posted_year}</td>
                                        <td className="px-4 py-3">
                                            {blog.pdf_file ? (
                                                <a href={blog.pdf_file} target="_blank" rel="noopener noreferrer" className="text-[#ff9100] hover:text-[#e68200]">
                                                    <FaFilePdf className="text-xl" />
                                                </a>
                                            ) : (
                                                <span className="text-gray-400 text-xs">No PDF</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => handleEdit(blog)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition" title="Edit">
                                                    <FaEdit />
                                                </button>
                                                <button onClick={() => setDeleteModal({ show: true, blog })} className="p-1.5 text-red-600 hover:bg-red-50 rounded transition" title="Delete">
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {totalPages > 1 && (
                    <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between flex-wrap gap-2">
                        <div className="text-sm text-gray-500">Showing {blogs.length} of {totalCount} blogs</div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition">
                                Previous
                            </button>
                            <div className="flex items-center gap-1">
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    let pageNum;
                                    if (totalPages <= 5) pageNum = i + 1;
                                    else if (currentPage <= 3) pageNum = i + 1;
                                    else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                                    else pageNum = currentPage - 2 + i;
                                    return (
                                        <button key={pageNum} onClick={() => handlePageChange(pageNum)} className={`px-3 py-1 text-sm rounded-md transition ${currentPage === pageNum ? 'bg-[#ff9100] text-white' : 'border border-gray-300 hover:bg-gray-50'}`}>
                                            {pageNum}
                                        </button>
                                    );
                                })}
                            </div>
                            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition">
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
                <div className="flex justify-between items-center flex-wrap gap-3">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Blog Management</h2>
                        <p className="text-sm text-gray-500 mt-1">Total {totalCount} blog{totalCount !== 1 ? 's' : ''} found</p>
                    </div>
                    <button onClick={() => { setEditingBlog(null); setShowForm(true); }} className="px-4 py-2 bg-[#ff9100] text-white rounded-lg cursor-pointer hover:bg-[#e68200] transition flex items-center gap-2">
                        <span>+</span> Create New Blog
                    </button>
                </div>

                <BlogTable />

                <BlogFormModal
                    isOpen={showForm}
                    onClose={resetForm}
                    onSubmit={handleSubmit}
                    initialData={editingBlog}
                    isLoading={formLoading}
                    editingBlog={editingBlog}
                />

                <DeleteConfirmationModal
                    isOpen={deleteModal.show}
                    onClose={() => setDeleteModal({ show: false, blog: null })}
                    onConfirm={handleDelete}
                    blog={deleteModal.blog}
                />
            </div>
        </DashboardLayout>
    );
}
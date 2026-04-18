// app/dashboard/blogs/page.js
'use client';
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaFilePdf, FaTimes, FaUpload, FaExclamationTriangle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import DashboardLayout from '../page';
import dynamic from 'next/dynamic';

// Dynamically import JoditEditor to avoid SSR issues
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

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
    const editorRef = useRef(null);
    
    // Use ref for content to avoid re-renders
    const contentRef = useRef('');
    const isTypingRef = useRef(false);
    const typingTimeoutRef = useRef(null);

    // Jodit editor configuration - memoized to prevent recreation
    const editorConfig = useMemo(() => ({
        readonly: false,
        placeholder: 'Write your blog content here...',
        buttons: [
            'source', '|', 'bold', 'italic', 'underline', 'strikethrough', '|',
            'ul', 'ol', '|', 'outdent', 'indent', '|', 'font', 'fontsize',
            'brush', 'paragraph', '|', 'image', 'video', 'table', 'link', '|',
            'align', 'undo', 'redo', '|', 'hr', 'eraser', 'fullsize'
        ],
        uploader: {
            insertImageAsBase64URI: true
        },
        height: 400,
        toolbarAdaptive: false,
        showXPathInStatusbar: false,
        askBeforePasteHTML: false,
        askBeforePasteFromWord: false,
        defaultActionOnPaste: 'insert_as_html',
        removeButtons: ['about'],
        spellcheck: true,
        autofocus: false,
        toolbarButtonSize: 'middle',
        theme: 'default',
        language: 'en',
        tooltips: true,
        // Critical settings to prevent cursor issues
        allowResizeX: false,
        allowResizeY: false,
        saveModeInStorage: false,
        triggerChangeAfterKeypress: 0,
        globalFullsize: false,
        useSplitMode: false,
        // Prevent re-renders
        zIndex: 10001,
        events: {
            beforePaste: function(event) {
                return true;
            }
        }
    }), []);

    // Initialize content ref when modal opens
    useEffect(() => {
        if (isOpen) {
            const initialContent = initialData?.content || '';
            contentRef.current = initialContent;
            isTypingRef.current = false;
            
            setFormData({
                title: initialData?.title || '',
                writer: initialData?.writer || '',
                short_summary: initialData?.short_summary || '',
                content: initialContent,
                pdf_file: null,
                thumbnail: null
            });
            
            if (initialData?.thumbnail) {
                setPreview(prev => ({ ...prev, thumbnail: initialData.thumbnail }));
            } else {
                setPreview({ thumbnail: null, pdf: null });
            }
            setErrors({});
        }
    }, [isOpen, initialData]);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    // Handle content change without causing re-renders that affect cursor
    const handleContentChange = useCallback((newContent) => {
        // Update ref immediately
        contentRef.current = newContent;
        isTypingRef.current = true;
        
        // Clear previous timeout
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        
        // Only update state after user stops typing
        typingTimeoutRef.current = setTimeout(() => {
            if (isTypingRef.current) {
                setFormData(prev => {
                    if (prev.content !== contentRef.current) {
                        return { ...prev, content: contentRef.current };
                    }
                    return prev;
                });
                isTypingRef.current = false;
                
                if (errors.content) {
                    setErrors(prev => ({ ...prev, content: '' }));
                }
            }
        }, 500);
    }, [errors.content]);

    // Handle blur - final update
    const handleBlur = useCallback(() => {
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        
        if (contentRef.current !== formData.content) {
            setFormData(prev => ({ ...prev, content: contentRef.current }));
        }
        isTypingRef.current = false;
    }, [formData.content]);

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
        
        // Make sure we have the latest content
        const finalContent = contentRef.current || formData.content;
        
        if (validateForm()) {
            const submitData = new FormData();
            submitData.append('title', formData.title);
            submitData.append('writer', formData.writer);
            submitData.append('short_summary', formData.short_summary);
            submitData.append('content', finalContent);
            
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

                <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[85vh] overflow-y-auto z-[10000]">
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
                            <JoditEditor
                                ref={editorRef}
                                value={contentRef.current}
                                config={editorConfig}
                                onBlur={handleBlur}
                                onChange={handleContentChange}
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

// Component to display HTML content safely
const BlogContent = ({ content }) => {
    return (
        <div 
            className="blog-content prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
        />
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
    const [viewingBlog, setViewingBlog] = useState(null);

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

    const handleViewBlog = (blog) => {
        setViewingBlog(blog);
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
                                                <button 
                                                    onClick={() => handleViewBlog(blog)}
                                                    className="text-sm font-medium text-gray-900 truncate hover:text-[#ff9100] hover:underline text-left"
                                                >
                                                    {blog.title}
                                                </button>
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

    // Blog View Modal
    const BlogViewModal = ({ blog, onClose }) => {
        if (!blog) return null;

        return (
            <div className="fixed inset-0 z-[9999] overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen px-4 py-8">
                    <div 
                        className="fixed inset-0 backdrop-blur-md bg-white/30" 
                        onClick={onClose}
                    ></div>

                    <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[85vh] overflow-y-auto z-[10000]">
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
                            <h3 className="text-xl font-semibold text-gray-900">{blog.title}</h3>
                            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                                <FaTimes />
                            </button>
                        </div>

                        <div className="p-6">
                            {blog.thumbnail && (
                                <div className="mb-6">
                                    <img src={blog.thumbnail} alt={blog.title} className="w-full max-h-96 object-cover rounded-lg" />
                                </div>
                            )}
                            
                            <div className="mb-4 flex items-center justify-between flex-wrap gap-2">
                                <div>
                                    <p className="text-sm text-gray-600">Writer: <span className="font-medium">{blog.writer}</span></p>
                                    <p className="text-sm text-gray-600">Posted Year: <span className="font-medium">{blog.posted_year}</span></p>
                                </div>
                                {blog.pdf_file && (
                                    <a href={blog.pdf_file} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2">
                                        <FaFilePdf /> Download PDF
                                    </a>
                                )}
                            </div>
                            
                            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">Short Summary</h4>
                                <p className="text-gray-600">{blog.short_summary}</p>
                            </div>
                            
                            <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">Full Content</h4>
                                <div className="blog-content prose prose-sm max-w-none">
                                    <BlogContent content={blog.content} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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

                <BlogViewModal
                    blog={viewingBlog}
                    onClose={() => setViewingBlog(null)}
                />
            </div>
        </DashboardLayout>
    );
}
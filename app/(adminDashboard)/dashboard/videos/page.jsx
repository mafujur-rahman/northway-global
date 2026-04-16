// app/dashboard/videos/page.js
'use client';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaTrash, FaPlus, FaTimes, FaEdit, FaYoutube, FaVideo, FaExclamationTriangle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import DashboardLayout from '../page';


// Video Form Modal (for both create and edit)
const VideoFormModal = ({ isOpen, onClose, onSubmit, isLoading, editingVideo }) => {
    const [formData, setFormData] = useState({
        title: '',
        video_url: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isOpen && editingVideo) {
            setFormData({
                title: editingVideo.title || '',
                video_url: editingVideo.video_url || ''
            });
        } else if (isOpen && !editingVideo) {
            setFormData({ title: '', video_url: '' });
        }
        setErrors({});
    }, [isOpen, editingVideo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.video_url.trim()) {
            newErrors.video_url = 'Video URL is required';
        } else if (!isValidUrl(formData.video_url)) {
            newErrors.video_url = 'Please enter a valid URL';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
        }
    };

    // Extract video ID from YouTube URL for thumbnail
    const getYouTubeThumbnail = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        if (match && match[2].length === 11) {
            return `https://img.youtube.com/vi/${match[2]}/mqdefault.jpg`;
        }
        return null;
    };

    const thumbnail = getYouTubeThumbnail(formData.video_url);

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
                            {editingVideo ? 'Edit Video' : 'Add New Video'}
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
                                placeholder="Enter video title"
                            />
                            {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Video URL <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="url"
                                name="video_url"
                                value={formData.video_url}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border ${errors.video_url ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff9100] focus:border-transparent`}
                                placeholder="https://www.youtube.com/watch?v=..."
                            />
                            {errors.video_url && <p className="mt-1 text-xs text-red-500">{errors.video_url}</p>}
                        </div>

                        {/* Preview */}
                        {thumbnail && (
                            <div className="mt-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Preview:</label>
                                <div className="relative rounded-lg overflow-hidden border border-gray-200">
                                    <img src={thumbnail} alt="Video preview" className="w-full h-32 object-cover" />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                        <FaYoutube className="text-5xl text-red-600" />
                                    </div>
                                </div>
                            </div>
                        )}

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
                                {isLoading ? (editingVideo ? 'Updating...' : 'Adding...') : (editingVideo ? 'Update Video' : 'Add Video')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

// Delete Confirmation Modal
const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, video }) => {
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
                        <h3 className="mt-4 text-lg font-semibold text-gray-900">Delete Video</h3>
                        <p className="mt-2 text-sm text-gray-500">
                            Are you sure you want to delete "<span className="font-medium text-gray-700">{video?.title}</span>"?
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
export default function VideosPage() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingVideo, setEditingVideo] = useState(null);
    const [deleteModal, setDeleteModal] = useState({ show: false, video: null });
    const [formLoading, setFormLoading] = useState(false);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const itemsPerPage = 9;

    const getAuthToken = () => localStorage.getItem('auth_token');

    const fetchVideos = useCallback(async (page = 1) => {
        setLoading(true);
        setError(null);
        try {
            const token = getAuthToken();
            const response = await axios.get(
                `https://nortway.mrshakil.com/api/gallery/videos/?page=${page}&page_size=${itemsPerPage}`,
                { headers: { 'Authorization': `Token ${token}` } }
            );
            if (response.data.success) {
                setVideos(response.data.data);
                setTotalPages(response.data.total_pages);
                setTotalCount(response.data.count);
                setCurrentPage(response.data.current_page);
            }
        } catch (err) {
            console.error('Error fetching videos:', err);
            setError('Failed to fetch videos. Please try again.');
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to fetch videos. Please try again.',
                confirmButtonColor: '#ff9100'
            });
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchVideos(currentPage);
    }, [currentPage, fetchVideos]);

    const handleSubmit = async (formData) => {
        setFormLoading(true);
        try {
            const token = getAuthToken();
            let response;
            
            if (editingVideo) {
                // Update existing video using PUT method
                response = await axios.put(
                    `https://nortway.mrshakil.com/api/gallery/videos/${editingVideo.id}/`,
                    formData,
                    { headers: { 'Authorization': `Token ${token}`, 'Content-Type': 'application/json' } }
                );
            } else {
                // Create new video
                response = await axios.post(
                    'https://nortway.mrshakil.com/api/gallery/videos/',
                    formData,
                    { headers: { 'Authorization': `Token ${token}`, 'Content-Type': 'application/json' } }
                );
            }
            
            if (response.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: editingVideo ? 'Updated!' : 'Added!',
                    text: editingVideo ? 'Video updated successfully.' : 'Video added successfully.',
                    confirmButtonColor: '#ff9100',
                    timer: 2000,
                    timerProgressBar: true
                });
                setShowForm(false);
                setEditingVideo(null);
                fetchVideos(currentPage);
            }
        } catch (err) {
            console.error('Error saving video:', err);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: err.response?.data?.message || `Failed to ${editingVideo ? 'update' : 'add'} video. Please try again.`,
                confirmButtonColor: '#ff9100'
            });
        } finally {
            setFormLoading(false);
        }
    };

    const handleEdit = (video) => {
        setEditingVideo(video);
        setShowForm(true);
    };

    const handleDelete = async () => {
        if (!deleteModal.video) return;
        
        try {
            const token = getAuthToken();
            const response = await axios.delete(
                `https://nortway.mrshakil.com/api/gallery/videos/${deleteModal.video.id}/`,
                { headers: { 'Authorization': `Token ${token}` } }
            );
            
            if (response.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: `Video "${deleteModal.video.title}" has been deleted.`,
                    confirmButtonColor: '#ff9100',
                    timer: 2000,
                    timerProgressBar: true
                });
                setDeleteModal({ show: false, video: null });
                if (videos.length === 1 && currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                } else {
                    fetchVideos(currentPage);
                }
            }
        } catch (err) {
            console.error('Error deleting video:', err);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to delete video. Please try again.',
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
        setEditingVideo(null);
    };

    // Extract YouTube video ID for embedding
    const getYouTubeId = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        if (match && match[2].length === 11) {
            return match[2];
        }
        return null;
    };

    // Video Gallery Component
    const VideoGallery = () => {
        if (loading) {
            return (
                <div className="bg-white rounded-lg border border-gray-200 p-8">
                    <div className="flex justify-center items-center h-64">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff9100] mx-auto"></div>
                            <p className="mt-4 text-gray-600">Loading videos...</p>
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
                        <button onClick={() => fetchVideos(currentPage)} className="mt-4 px-4 py-2 bg-[#ff9100] text-white rounded-lg">
                            Try Again
                        </button>
                    </div>
                </div>
            );
        }

        if (videos.length === 0) {
            return (
                <div className="bg-white rounded-lg border border-gray-200 p-12">
                    <div className="text-center">
                        <FaVideo className="text-6xl text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No videos yet</h3>
                        <p className="text-gray-500 mb-4">Get started by adding your first video.</p>
                        <button onClick={() => setShowForm(true)} className="px-4 py-2 bg-[#ff9100] text-white rounded-lg hover:bg-[#e68200] transition">
                            <FaPlus className="inline mr-2" /> Add Video
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map((video) => {
                        const youtubeId = getYouTubeId(video.video_url);
                        const thumbnail = youtubeId ? `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg` : null;
                        
                        return (
                            <div key={video.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition group">
                                {/* Video Thumbnail */}
                                <div className="relative aspect-video bg-gray-100 cursor-pointer group">
                                    {thumbnail ? (
                                        <img 
                                            src={thumbnail} 
                                            alt={video.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <FaYoutube className="text-5xl text-gray-300" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                                        <a 
                                            href={video.video_url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition"
                                        >
                                            <FaYoutube /> Watch Video
                                        </a>
                                    </div>
                                    
                                    {/* Action Buttons - Appear on hover */}
                                    <div className="absolute top-2 right-2 flex gap-2">
                                        <button
                                            onClick={() => handleEdit(video)}
                                            className="p-2 bg-blue-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition hover:bg-blue-600"
                                            title="Edit"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => setDeleteModal({ show: true, video })}
                                            className="p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition hover:bg-red-600"
                                            title="Delete"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                                
                                {/* Video Info */}
                                <div className="p-4">
                                    <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">{video.title}</h3>
                                    <a 
                                        href={video.video_url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-xs text-[#ff9100] hover:underline break-all"
                                    >
                                        {video.video_url}
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-6 px-4 py-3 bg-white rounded-lg border border-gray-200 flex items-center justify-between flex-wrap gap-2">
                        <div className="text-sm text-gray-500">
                            Showing {videos.length} of {totalCount} videos
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
                        <h2 className="text-2xl font-bold text-gray-900">Video Gallery</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Total {totalCount} video{totalCount !== 1 ? 's' : ''} found
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            setEditingVideo(null);
                            setShowForm(true);
                        }}
                        className="px-4 py-2 bg-[#ff9100] text-white rounded-lg hover:bg-[#e68200] transition flex items-center gap-2 cursor-pointer"
                    >
                        <FaPlus /> Add Video
                    </button>
                </div>

                {/* Video Gallery */}
                <VideoGallery />

                {/* Add/Edit Video Form Modal */}
                <VideoFormModal
                    isOpen={showForm}
                    onClose={resetForm}
                    onSubmit={handleSubmit}
                    isLoading={formLoading}
                    editingVideo={editingVideo}
                />

                {/* Delete Confirmation Modal */}
                <DeleteConfirmationModal
                    isOpen={deleteModal.show}
                    onClose={() => setDeleteModal({ show: false, video: null })}
                    onConfirm={handleDelete}
                    video={deleteModal.video}
                />
            </div>
        </DashboardLayout>
    );
}
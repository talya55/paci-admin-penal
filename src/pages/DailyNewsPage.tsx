import { useEffect, useState } from 'react';
import { createDailyNews, deleteDailyNews, getDailyNews, updateDailyNews } from '../services/api';

const DailyNewsPage = () => {
    const [news, setNews] = useState([]);
    const [formData, setFormData] = useState({ id: null, en: '', ar: '', url: '', description: '' });
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(false);

    useEffect(() => {
        fetchDailyNews();
    }, []);


    const fetchDailyNews = async () => {
        setDataLoading(true);
        try {
            const { data } = await getDailyNews();
            setNews(data);
        } catch (error) {
            alert('Failed to fetch navbar data.');
            console.error('Error fetching news data:', error);
        } finally {
            setDataLoading(false);
        }
    };
    // ✅ Handle Submit (Create or Update)
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!formData.en && !formData.ar) {
            alert('Either English Name or Arabic Name is required');
            return;
        }
        if (!formData.url) {
            alert('Url is required');
            return;
        }
        if (!formData.description) {
            alert('Description is required');
            return;
        }
        setLoading(true)
        try {
            if (formData.id) {
                await updateDailyNews(formData.id, {
                    links: {
                        name: { en: formData.en, ar: formData.ar },
                        url: formData.url,
                    },
                    description: formData.description
                });
            } else {
                await createDailyNews({
                    links: {
                        name: { en: formData.en, ar: formData.ar },
                        url: formData.url,
                    },
                    description: formData.description
                });
            }
            setFormData({ id: null, en: '', ar: '', url: '', description: '' });
            setLoading(false)
            fetchDailyNews();
        } catch (error) {
            alert('Failed to submit data.');
            setLoading(false)

            console.error('Error submitting news data:', error);
        }

    };

    // ✅ Handle Edit
    const handleEdit = (item: any) => {
        setFormData({
            id: item._id,
            en: item.links.name.en,
            ar: item.links.name.ar,
            url: item.links.url,
            description: item.description || '',
        });
    };

    // ✅ Handle Delete with Confirmation
    const handleDelete = async (id: string) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this item?');
        if (isConfirmed) {
            setDataLoading(true);
            try {
                await deleteDailyNews(id);
                fetchDailyNews();
            } catch (error) {
                alert('Failed to delete item.');
                console.error('Error deleting news:', error);
            } finally {
                setDataLoading(false);
            }
        }
    };

    return (
        <div className="w-full h-screen bg-gray-100 p-6">
            <h1 className="p-4 text-[30px] font-bold">Daily News Data</h1>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6 max-w-full">
                <div className="flex gap-4 mb-4">
                    {/* English Title */}
                    <input
                        type="text"
                        placeholder="English Name"
                        value={formData.en}
                        onChange={(e) => setFormData({ ...formData, en: e.target.value })}
                        className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {/* Arabic Title */}
                    <input
                        type="text"
                        placeholder="الاسم العربي"
                        value={formData.ar}
                        onChange={(e) => setFormData({ ...formData, ar: e.target.value })}
                        className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* URL */}
                <div className="flex gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="URL"
                        value={formData.url}
                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Description */}
                <div className="flex gap-4 mb-4">
                    <textarea
                        placeholder="Description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                    />
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`${formData.id ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'
                            } text-white px-6 py-2 rounded-md transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                                Processing...
                            </div>
                        ) : formData.id ? (
                            'Update'
                        ) : (
                            'Add'
                        )}
                    </button>
                </div>
            </form>
            {dataLoading && (
                <div className="text-center py-4">
                    <div className="animate-spin h-6 w-6 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
                    <p className="text-gray-500 mt-2">Loading data...</p>
                </div>
            )}
            {/* List */}
            <ul className="space-y-4">
                {news.map((item: any) => (
                    <li
                        key={item._id}
                        className="bg-white flex justify-between items-center p-4 border rounded-md shadow-md"
                    >
                        <div>
                            <span className="font-medium text-gray-700">
                                {item.links.name.en} - {item.links.name.ar}
                            </span>
                            <a href={item.links.url} target="_blank" rel="noopener noreferrer" className="block text-sm text-blue-500">
                                {item.links.url}
                            </a>
                            <p className="text-sm text-gray-500 mt-1">
                                {item.description || 'No description'}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            {/* Edit Button */}
                            <button
                                onClick={() => handleEdit(item)}
                                className="text-blue-500 hover:text-blue-600 transition duration-300 mr-4 cursor-pointer"
                            >
                                Edit
                            </button>
                            {/* Delete Button */}
                            <button
                                onClick={() => handleDelete(item._id)}
                                className="text-red-500 hover:text-red-600 transition duration-300 cursor-pointer"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DailyNewsPage;

import { useEffect, useState } from 'react';
import { createCircular, deleteCircular, getCirculars, updateCircular } from '../services/api';

const CircularPage = () => {
  const [circularData, setCircularData] = useState([]);
  const [formData, setFormData] = useState({ 
    id: null, 
    en: '', 
    ar: '', 
    pdf: null as File | null, 
    description: '' 
  });
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    fetchCirculars();
  }, []);

  // ✅ Fetch Circulars
  const fetchCirculars = async () => {
    setDataLoading(true);
    try {
      const { data } = await getCirculars();
      setCircularData(data);
    } catch (error: any) {
      alert(`Failed to fetch data: ${error.message}`);
    } finally {
      setDataLoading(false);
    }
  };

  // ✅ Handle Submit (Create or Update)
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // ✅ Input Validations
    if (!formData.en && !formData.ar) {
      alert('Either English Name or Arabic Name is required');
      return;
    }
    if (!formData.description) {
      alert('Description is required');
      return;
    }
    if (!formData.id && !formData.pdf) {
      alert('File is required when creating a new circular');
      return;
    }

    setLoading(true);
    try {
      if (formData.id) {
        await updateCircular(formData.id, {
          en: formData.en,
          ar: formData.ar,
          description: formData.description,
          pdf: formData.pdf,
        });
      } else {
        await createCircular({
          en: formData.en,
          ar: formData.ar,
          description: formData.description,
          pdf: formData.pdf,
        });
      }
      setFormData({ id: null, en: '', ar: '', pdf: null, description: '' });
      fetchCirculars();
    } catch (error: any) {
      alert(`Operation failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Edit
  const handleEdit = (item: any) => {
    setFormData({
      id: item._id,
      en: item.links.name.en,
      ar: item.links.name.ar,
      pdf: null,
      description: item.description,
    });
  };

  // ✅ Handle Delete with Confirmation
  const handleDelete = async (id: string) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this circular?');
    if (isConfirmed) {
      setDataLoading(true);
      try {
        await deleteCircular(id);
        fetchCirculars();
      } catch (error: any) {
        alert(`Failed to delete: ${error.message}`);
      } finally {
        setDataLoading(false);
      }
    }
  };

  return (
    <div className="w-full h-screen bg-gray-100 p-6">
      {/* ✅ Loader on Fetching Data */}
      
      <div className="p-4">
      <h1 className=" text-[30px] font-bold">Circular Data</h1>
      {/* Add your circular data content here */}
    </div>
      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex gap-4 mb-4">
          {/* English Name */}
          <input
            type="text"
            placeholder="English Name"
            value={formData.en}
            onChange={(e) => setFormData({ ...formData, en: e.target.value })}
            className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Arabic Name */}
          <input
            type="text"
            placeholder="الاسم العربي"
            value={formData.ar}
            onChange={(e) => setFormData({ ...formData, ar: e.target.value })}
            className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 mb-4"
        />

        {/* PDF Upload */}
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFormData({ ...formData, pdf: e.target.files?.[0] || null })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none mb-4"
        />

        {/* Submit Button with Loader */}
        <button
          type="submit"
          disabled={loading}
          className={`${
            formData.id ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'
          } text-white px-6 py-2 rounded-md transition duration-300 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
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
      </form>
      {dataLoading && (
        <div className="text-center py-4">
          <div className="animate-spin h-6 w-6 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="text-gray-500 mt-2">Loading data...</p>
        </div>
      )}
      {/* List */}
      <ul className="space-y-4">
        {circularData?.map((item: any) => (
          <li
            key={item._id}
            className="bg-white flex justify-between items-center p-4 border rounded-md shadow-md"
          >
            <div>
              <span className="font-medium text-gray-700">
                {item.links.name.en} - {item.links.name.ar}
              </span>
              <p className="text-sm text-gray-500">{item.description}</p>
              {/* Download PDF */}
              <a
                href={item.links.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="block text-blue-500 hover:underline mt-1"
              >
                Download PDF
              </a>
            </div>
            <div className="flex gap-2">
              {/* Edit Button */}
              <button
                onClick={() => handleEdit(item)}
                className="text-blue-500 hover:text-blue-600 transition duration-300 cursor-pointer mr-6"
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

export default CircularPage;

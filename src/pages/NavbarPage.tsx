import { useEffect, useState } from 'react';
import { createNavbar, deleteNavbar, getNavbars, updateNavbar } from '../services/api';

const NavbarPage = () => {
  const [navbars, setNavbars] = useState([]);
  const [formData, setFormData] = useState({ id: null, en: '', ar: '', url: '' });
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
console.log(navbars);

  useEffect(() => {
    document.title = 'Navbar Data';
    fetchNavbars();
  }, []);

  const fetchNavbars = async () => {
    setDataLoading(true);
    try {
      const { data } = await getNavbars();
      setNavbars(data);
    } catch (error) {
      alert('Failed to fetch navbar data.');
      console.error('Error fetching navbar data:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // ✅ Validation
    if (!formData.en && !formData.ar) {
      alert('Either English Name or Arabic Name is required');
      return;
    }
    if (!formData.url) {
      alert('Url is required');
      return;
    }
    setLoading(true)
    try {
      if (formData.id) {
        await updateNavbar(formData.id, {
          links: { name: { en: formData.en, ar: formData.ar }, url: formData.url },
        });
      } else {
        await createNavbar({
          links: { name: { en: formData.en, ar: formData.ar }, url: formData.url },
        });
      }
      setFormData({ id: null, en: '', ar: '', url: '' });
      setLoading(false)
      fetchNavbars(); // ✅ Refresh data after submission
    } catch (error) {
      alert('Failed to submit data.');
    setLoading(false)

      console.error('Error submitting navbar data:', error);
    }
  };

  const handleEdit = (navbar: any) => {
    setFormData({
      id: navbar._id,
      en: navbar.links.name.en,
      ar: navbar.links.name.ar,
      url: navbar.links.url,
    });
  };

  const handleDelete = async (id: string) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this item?');
    if (isConfirmed) {
      setDataLoading(true);
      try {
        await deleteNavbar(id);
        fetchNavbars();
      } catch (error) {
        alert('Failed to delete item.');
        console.error('Error deleting navbar:', error);
      } finally {
        setDataLoading(false);
      }
    }
  };

  return (
    <div className="w-full h-screen bg-gray-100 p-6">
      {/* ✅ Loader */}
    

      {/* ✅ Title */}
      <h1 className="p-4 text-[30px] font-bold">Navbar Data</h1>

      {/* ✅ Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6 max-w-full">
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="English Name"
            value={formData.en}
            onChange={(e) => setFormData({ ...formData, en: e.target.value })}
            className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="الاسم العربي"
            value={formData.ar}
            onChange={(e) => setFormData({ ...formData, ar: e.target.value })}
            className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="URL"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
        </div>
      </form>

      {dataLoading && (
         <div className="text-center py-4">
         <div className="animate-spin h-6 w-6 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
         <p className="text-gray-500 mt-2">Loading data...</p>
       </div>
      )}
      {/* ✅ List */}
      <ul className="space-y-4">
        {navbars.map((navbar: any) => (
          <li
            key={navbar._id}
            className="bg-white flex justify-between items-center p-4 border rounded-md shadow-md"
          >
            <div>
              <span className="font-medium text-gray-700">
                {navbar.links.name.en} - {navbar.links.name.ar}
              </span>
              <a
                href={navbar.links.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-blue-500"
              >
                {navbar.links.url}
              </a>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(navbar)}
                className="text-blue-500 hover:text-blue-600 transition duration-300 mr-4 cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(navbar._id)}
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

export default NavbarPage;

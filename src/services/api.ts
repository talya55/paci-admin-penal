import axios from 'axios';

const API = axios.create({ baseURL: 'https://paci-backend.vercel.app/api' }); // Your backend URL

interface CircularData {
    en: string;
    ar: string;
    description: string;
    pdf?: File | null;
  }

  // Auth APIs
export const login = (data: { email: string; password: string }) => API.post('/auth/login', data);
// Navbar
export const createNavbar = (data:any) => API.post('/navbar', data);
export const getNavbars = () => API.get('/navbar');
export const updateNavbar = (id:string, data:any) => API.put(`/navbar/${id}`, data);
export const deleteNavbar = (id:string) => API.delete(`/navbar/${id}`);

// paci_News 

export const createPaciNews = (data: any) => API.post('/paci-news', data);
export const getPaciNews = () => API.get('/paci-news');
export const updatePaciNews = (id: string, data: any) => API.put(`/paci-news/${id}`, data);
export const deletePaciNews = (id: string) => API.delete(`/paci-news/${id}`);


// paci_services
export const createPaciService = (data: any) => API.post('/paci-services', data);
export const getPaciServices = () => API.get('/paci-services');
export const updatePaciService = (id: string, data: any) => API.put(`/paci-services/${id}`, data);
export const deletePaciService = (id: string) => API.delete(`/paci-services/${id}`);

// daily_news
export const createDailyNews = (data: any) => API.post('/daily-news', data);
export const getDailyNews = () => API.get('/daily-news');
export const updateDailyNews = (id: string, data: any) => API.put(`/daily-news/${id}`, data);
export const deleteDailyNews = (id: string) => API.delete(`/daily-news/${id}`);


// paci_web
export const createPaciWeb = (data: any) => API.post('/paci-web', data);
export const getPaciWeb = () => API.get('/paci-web');
export const updatePaciWeb = (id: string, data: any) => API.put(`/paci-web/${id}`, data);
export const deletePaciWeb = (id: string) => API.delete(`/paci-web/${id}`);


// Circular
export const getCirculars = () => API.get('/circulars');

// ✅ Create Circular (with PDF upload)
export const createCircular = async (data: CircularData) => {
    const formData = new FormData();
  
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });
  
    // Send FormData (without setting Content-Type)
    return await API.post('/circulars', formData);
  };
  

// ✅ Update Circular (with PDF upload)
export const updateCircular = async (id: string, data: CircularData) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
  });

  return await API.put(`/circulars/${id}`, formData);
};

// ✅ Delete Circular
export const deleteCircular = (id: string) => API.delete(`/circulars/${id}`);

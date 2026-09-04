import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
export const IMG_URL = BASE_URL;

export const getImageUrl = (imagePath) => {
  if (!imagePath) return "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800";
  if (
    imagePath.startsWith("http://") ||
    imagePath.startsWith("https://") ||
    imagePath.startsWith("blob:") ||
    imagePath.startsWith("data:")
  ) {
    return imagePath;
  }
  const cleanBase = BASE_URL.replace(/\/+$/, "");
  const cleanPath = imagePath.replace(/^\/+/, "");

  if (cleanPath.startsWith("uploads/")) {
    return `${cleanBase}/${cleanPath}`;
  }
  return `${cleanBase}/uploads/${cleanPath}`;
};

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || `${BASE_URL}/api`,
});

export default API;
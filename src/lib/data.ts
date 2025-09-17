import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query } from 'firebase/firestore';
import { db, storage } from './firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import type { LucideIcon } from 'lucide-react';
import { Building, Hammer, Home, DraftingCompass, PaintRoller, LandPlot } from 'lucide-react';

// Types
export type Service = {
  id?: string;
  title: string;
  description: string;
  icon: string; // Storing icon name as string
};

export type Project = {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
};

export type NewsArticle = {
  id: string;
  title: string;
  date: string; // ISO string
  summary: string;
  imagePlaceholderId: string;
};

// Icon Map
export const iconMap: { [key: string]: LucideIcon } = {
  Building,
  DraftingCompass,
  Hammer,
  Home,
  PaintRoller,
  LandPlot,
};


// Service Functions
const servicesCollection = collection(db, 'services');

export const getServices = async (): Promise<Service[]> => {
  const snapshot = await getDocs(servicesCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service));
};

export const addService = async (service: Omit<Service, 'id'>) => {
  return await addDoc(servicesCollection, service);
};

export const updateService = async (id: string, service: Partial<Service>) => {
  const serviceDoc = doc(db, 'services', id);
  return await updateDoc(serviceDoc, service);
};

export const deleteService = async (id: string) => {
  const serviceDoc = doc(db, 'services', id);
  return await deleteDoc(serviceDoc);
};

// Project Functions
const projectsCollection = collection(db, 'projects');

export const getProjects = async (): Promise<Project[]> => {
  const snapshot = await getDocs(projectsCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
};

export const addProject = async (project: Omit<Project, 'id'>) => {
  return await addDoc(projectsCollection, project);
};

export const updateProject = async (id: string, project: Partial<Project>) => {
  const projectDoc = doc(db, 'projects', id);
  return await updateDoc(projectDoc, project);
};

export const deleteProject = async (id: string) => {
  const projectDoc = doc(db, 'projects', id);
  return await deleteDoc(projectDoc);
};


// News Functions
const newsCollection = collection(db, 'news');

export const getNews = async (): Promise<NewsArticle[]> => {
    const q = query(collection(db, "news"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NewsArticle));
};

export const addNewsArticle = async (article: Omit<NewsArticle, 'id'>) => {
  return await addDoc(newsCollection, article);
};

export const updateNewsArticle = async (id: string, article: Partial<NewsArticle>) => {
  const articleDoc = doc(db, 'news', id);
  return await updateDoc(articleDoc, article);
};

export const deleteNewsArticle = async (id: string) => {
  const articleDoc = doc(db, 'news', id);
  return await deleteDoc(articleDoc);
};

// Storage Functions
export const uploadImage = async (file: File, path: string): Promise<string> => {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
}

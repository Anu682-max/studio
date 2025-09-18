import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
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
  description?: string;
};

export type NewsArticle = {
  id: string;
  title:string;
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
  const q = query(servicesCollection, orderBy('title'));
  const snapshot = await getDocs(q);
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

// This is a hardcoded project to ensure there's always at least one project visible on the site.
// In a real application, you would remove this and manage all projects via the CMS.
const hardcodedProject: Project = {
  id: 'hardcoded-1',
  title: 'Орчин үеийн оффисын барилга',
  category: 'Арилжааны',
  imageUrl: 'https://firebasestorage.googleapis.com/v0/b/studio-3378510862-a72aa.appspot.com/o/b.jpg?alt=media&token=18b57a73-fe16-4654-8898-18e0a7fde9e8',
  description: 'Хотын төвд байрлах, орчин үеийн, эрчим хүчний хэмнэлттэй оффисын барилгын иж бүрэн бүтээн байгуулалт.'
};

export const getProjects = async (): Promise<Project[]> => {
  const snapshot = await getDocs(projectsCollection);
  const firestoreProjects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
  // We prepend the hardcoded project to the array from Firestore.
  return [hardcodedProject, ...firestoreProjects];
};


export const addProject = async (project: Omit<Project, 'id'>) => {
  return await addDoc(projectsCollection, project);
};

export const updateProject = async (id: string, project: Partial<Omit<Project, 'id'>>) => {
  if (id === 'hardcoded-1') {
    // You can decide if you want to allow updating the hardcoded project.
    // For this example, we'll log a message and do nothing.
    console.log("Note: The hardcoded project is not editable through the dashboard.");
    return;
  }
  const projectDoc = doc(db, 'projects', id);
  return await updateDoc(projectDoc, project);
};

export const deleteProject = async (id: string) => {
  if (id === 'hardcoded-1') {
    console.log("Cannot delete the hardcoded project.");
    return;
  }
  const projectDoc = doc(db, 'projects', id);
  return await deleteDoc(projectDoc);
};


// News Functions
const newsCollection = collection(db, 'news');

export const getNews = async (): Promise<NewsArticle[]> => {
    const q = query(collection(db, "news"), orderBy('date', 'desc'));
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

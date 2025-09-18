import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db, storage } from './firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import type { LucideIcon } from 'lucide-react';
import { Building, Hammer, Home, DraftingCompass, PaintRoller, LandPlot, ClipboardCheck, Wrench } from 'lucide-react';
import { PlaceHolderImages } from './placeholder-images';

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
  imageUrl: string;
};

// Icon Map
export const iconMap: { [key: string]: LucideIcon } = {
  Building,
  DraftingCompass,
  Hammer,
  Home,
  PaintRoller,
  LandPlot,
  ClipboardCheck,
  Wrench,
};

const hardcodedServices: Omit<Service, 'id'>[] = [
  {
    title: 'Ерөнхий гүйцэтгэл',
    description: 'Төслийн бүх үе шатыг удирдан, чанарын хяналт, төсөв, хуваарийг чанд мөрдөнө.',
    icon: 'Building',
  },
  {
    title: 'Барилгын удирдлага',
    description: 'Төслийн төлөвлөлт, зохицуулалт, хяналтыг эхнээс нь дуустал мэргэжлийн түвшинд гүйцэтгэнэ.',
    icon: 'ClipboardCheck',
  },
  {
    title: 'Зураг төсөл, барилга',
    description: 'Зураг төслийн багийг нэгтгэн, уялдаа холбоотой, үр ашигтай ажлын урсгалыг бий болгоно.',
    icon: 'DraftingCompass',
  },
  {
    title: 'Засвар, шинэчлэлт',
    description: 'Хуучин барилгыг орчин үеийн шаардлагад нийцүүлэн, шинэ амь оруулна.',
    icon: 'Wrench',
  },
    {
    title: 'Барилгын өмнөх зөвлөгөө',
    description: 'Төслийн эхний шатанд нарийвчилсан төлөвлөлт, төсөвлөлт хийж, эрсдэлийг бууруулна.',
    icon: 'Home',
  },
  {
    title: 'Газар шорооны ажил',
    description: 'Барилгын суурийг бэлтгэх, газрын тэгшилгээ, ухах, тээвэрлэх ажлыг иж бүрнээр нь гүйцэтгэнэ.',
    icon: 'LandPlot',
  },
];


// Service Functions
const servicesCollection = collection(db, 'services');

export const getServices = async (): Promise<Service[]> => {
  const q = query(servicesCollection, orderBy('title'));
  const snapshot = await getDocs(q);
  const services = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service));
  
  if (services.length === 0) {
      for (const service of hardcodedServices) {
          await addService(service);
      }
      const newSnapshot = await getDocs(q);
      return newSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service));
  }

  return services;
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
  const firestoreProjects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
  
  if (firestoreProjects.length === 0) {
      // Add a hardcoded project if there are no projects in Firestore
      const defaultProject = {
          title: "Хотын төвийн оффисын цамхаг",
          category: "Арилжааны",
          description: "Хотын төвийн бизнесийн дүүрэгт баригдсан 30 давхар оффисын барилга.",
          imageUrl: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      };
      const docRef = await addProject(defaultProject);
      return [{ id: docRef.id, ...defaultProject }];
  }
  
  return firestoreProjects;
};


export const addProject = async (project: Omit<Project, 'id'>) => {
  return await addDoc(projectsCollection, project);
};

export const updateProject = async (id: string, project: Partial<Omit<Project, 'id'>>) => {
  const projectDoc = doc(db, 'projects', id);
  return await updateDoc(projectDoc, project);
};

export const deleteProject = async (id:string) => {
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

export const updateNewsArticle = async (id: string, article: Partial<Omit<NewsArticle, 'id'>>) => {
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

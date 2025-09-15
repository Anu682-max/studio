import type { LucideIcon } from 'lucide-react';
import { Building, Hammer, Home, DraftingCompass, PaintRoller, LandPlot } from 'lucide-react';

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    title: 'Ерөнхий гүйцэтгэл',
    description: 'Барилгын төслийг эхнээс нь дуустал иж бүрэн удирдан зохион байгуулж, чанар, төсөв, хугацааг чанд мөрдөнө.',
    icon: Building,
  },
  {
    title: 'Зураг төсөл-Барилга',
    description: 'Зураг төсөл, барилгын үйлчилгээг нэгтгэсэн, хамтын ажиллагаа, инновацийг дэмжсэн оновчтой үйл явц.',
    icon: DraftingCompass,
  },
  {
    title: 'Засвар, шинэчлэлт',
    description: 'Орчин үеийн дизайн, материал, функциональ сайжруулалтаар одоо байгаа орон зайг өөрчлөн шинэ амьдрал бэлэглэнэ.',
    icon: Hammer,
  },
  {
    title: 'Орон сууцны барилга',
    description: 'Захиалгат амины орон сууц, олон айлын орон сууцыг нарийн ширийн зүйлд анхаарал хандуулж, гэрийн эздийн сэтгэл ханамжийг эрхэмлэн барина.',
    icon: Home,
  },
  {
    title: 'Дотор засал',
    description: 'Будаг, шал, тоноглол суурилуулах зэрэг дотоод заслын мэргэжлийн үйлчилгээгээр төгс гүйцэтгэлийг бий болгоно.',
    icon: PaintRoller,
  },
  {
    title: 'Талбайн бэлтгэл ажил',
    description: 'Барилгын талбайг тэгшлэх, инженерийн шугам сүлжээ, дэд бүтцийг суурилуулж, бат бэх суурийг бэлтгэнэ.',
    icon: LandPlot,
  },
];

export type Project = {
  id: string;
  title: string;
  category: string;
  imagePlaceholderId: string;
};

export const projects: Project[] = [
  {
    id: 'p1',
    title: 'Метрополис Бизнес Төв',
    category: 'Худалдаа, үйлчилгээ',
    imagePlaceholderId: 'project-1',
  },
  {
    id: 'p2',
    title: 'Амар Амгалан Цэцэрлэгт Хүрээлэн',
    category: 'Орон сууц',
    imagePlaceholderId: 'project-2',
  },
  {
    id: 'p3',
    title: 'Оуквилл Орчин үеийн байшин',
    category: 'Орон сууц',
    imagePlaceholderId: 'project-3',
  },
  {
    id: 'p4',
    title: 'Инноватек Корпорацийн Хотхон',
    category: 'Худалдаа, үйлчилгээ',
    imagePlaceholderId: 'project-4',
  },
];

export type NewsArticle = {
  id: string;
  title: string;
  date: string;
  summary: string;
  imagePlaceholderId: string;
};

export const news: NewsArticle[] = [
  {
    id: 'n1',
    title: 'ABS Барилга "Шилдэг Дизайн"-ы шагнал хүртлээ',
    date: '2023-10-26',
    summary: 'Манай саяхан хэрэгжүүлсэн Метрополис Бизнес Төв төсөл нь инновацилаг архитектур, тогтвортой дизайнаараа шалгарлаа.',
    imagePlaceholderId: 'news-1',
  },
  {
    id: 'n2',
    title: 'Тогтвортой барилгын практикийг сайжруулах шинэ түншлэл',
    date: '2023-09-15',
    summary: 'Бид байгальд ээлтэй материалыг илүү өргөнөөр нэвтрүүлэх зорилгоор GreenScapes Inc.-тэй түншилж байгаагаа дуулгахад таатай байна.',
    imagePlaceholderId: 'news-2',
  },
  {
    id: 'n3',
    title: 'Нуурын эрэг дэх шинэ хотхоны шав тавих ёслол',
    date: '2023-08-01',
    summary: 'Бидний хамгийн том орон сууцны төсөл болох Нуурын эрэг дэх хотхоны барилгын ажил албан ёсоор эхэллээ.',
    imagePlaceholderId: 'news-3',
  },
];

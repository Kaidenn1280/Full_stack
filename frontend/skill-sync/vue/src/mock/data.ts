// src/mock/data.ts
export interface Lesson {
  id: number;
  title: string;
  subject: string;
  level: string;
  duration: string;
  type: string;
}

export interface Resource {
  id: number;
  title: string;
  category: string;
  type: "PDF" | "EPUB" | "ZIP" | "DOCX";
  size: string;
  downloads: string;
  date: string;
}

export const subjects = ["Math & Logic", "Languages", "Computer Science", "Humanities", "Sciences"];

export const lessons: Lesson[] = [
  // ... your data here
  { id: 1, title: "Calculus I", subject: "Math & Logic", level: "Advanced", duration: "45m", type: "Lecture" },
  { id: 2, title: "React Basics", subject: "Computer Science", level: "Beginner", duration: "30m", type: "Workshop" },
  { id: 3, title: "Spanish Intro", subject: "Languages", level: "Beginner", duration: "20m", type: "Practice" },
  // ...
];

export const resources: Resource[] = [
  { id: 1, title: "Calculus Derivatives Cheat Sheet", category: "Math", type: "PDF", size: "2.4 MB", downloads: "12k", date: "Oct 12" },
  { id: 2, title: "React Hooks Handbook", category: "Comp Sci", type: "PDF", size: "5.1 MB", downloads: "8.5k", date: "Nov 05" },
  { id: 3, title: "Spanish Verbs Conjugation Kit", category: "Languages", type: "ZIP", size: "12 MB", downloads: "3k", date: "Sep 28" },
  { id: 4, title: "Organic Chemistry Molecules 3D", category: "Science", type: "ZIP", size: "45 MB", downloads: "1.2k", date: "Dec 10" },
  { id: 5, title: "The History of Art (Open Ed.)", category: "Humanities", type: "EPUB", size: "8.8 MB", downloads: "5k", date: "Aug 15" },
  { id: 6, title: "Data Structures Algorithms Map", category: "Comp Sci", type: "PDF", size: "3.2 MB", downloads: "15k", date: "Jan 20" },
  { id: 7, title: "Macro-Economics Data Set 2024", category: "Humanities", type: "DOCX", size: "1.2 MB", downloads: "2k", date: "Feb 01" },
  { id: 8, title: "Physics Formulas: Kinematics", category: "Science", type: "PDF", size: "1.8 MB", downloads: "9k", date: "Jan 15" },
];
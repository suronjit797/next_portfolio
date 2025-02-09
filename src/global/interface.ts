export interface ImageType {
  uid: string;
  name: string;
  status: string;
  url: string;
  size: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "superAdmin" | "admin" | "user";
  isActive: boolean;
  avatar: ImageType;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  _id: string;
  position: number;
  name: string;
  description: string;
  packages: string[];
  tags: string[];
  liveUrl: string;
  thumbnail: ImageType;
  images: ImageType[];
  githubUrl: { frontend: string; backend: string };
  user: Partial<User>;
}

export interface Skill {
  _id: string;
  name: string;
  type: string;
  image: ImageType;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  unread: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  position: number;
  name: string;
  description: string;
  packages: string[];
  tags: string[];
  liveUrl: string;
  thumbnail: ImageType;
  images: ImageType[];
  githubUrl: { frontend: string; backend: string };
  user: Partial<User>;
}

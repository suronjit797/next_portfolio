export type TProject = {
  _id: string;
  thumbnail: string;
  images: string[];
  name: string;
  packages: string[];
  tags: string[];
  description: string;
  live_url: string;
  github_url: {
    frontend?: string;
    backend?: string;
  };
};


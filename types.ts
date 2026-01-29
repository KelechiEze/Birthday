
export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface Achievement {
  value: string;
  label: string;
}

export interface Memory {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface Tribute {
  name: string;
  message: string;
  relation: string;
}

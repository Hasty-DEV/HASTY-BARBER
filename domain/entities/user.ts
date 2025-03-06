/**
 * Entidade de Usuário
 * 
 * Define a estrutura de dados para usuários no sistema.
 */

export enum UserRole {
  CLIENT = 'cliente',
  BARBER = 'barbeiro',
  ADMIN = 'admin'
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends User {
  avatar?: string;
  birthDate?: Date;
}

export interface ClientProfile extends UserProfile {
  favoriteBarbers?: string[];
  lastAppointment?: Date;
}

export interface BarberProfile extends UserProfile {
  bio?: string;
  specialties?: string[];
  address?: Address;
  services?: Service[];
  workingHours?: WorkingHour[];
  rating?: number;
  appointmentLink?: string;
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood?: string;
  city: string;
  state: string;
  zipCode: string;
  country?: string;
}

export interface Service {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration: number; // em minutos
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkingHour {
  id: string;
  dayOfWeek: string; // 'segunda', 'terca', etc.
  startTime: string; // formato: 'HH:MM'
  endTime: string; // formato: 'HH:MM'
  isAvailable: boolean;
}
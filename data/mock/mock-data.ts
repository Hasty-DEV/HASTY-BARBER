/**
 * Dados mockados para simular respostas da API
 * 
 * Este arquivo contém dados de exemplo que serão usados pelos repositórios
 * para simular respostas da API enquanto o back-end não está disponível.
 */

import { 
  User, 
  UserRole, 
  BarberProfile, 
  Service, 
  WorkingHour 
} from '@/domain/entities/user';
import { 
  Appointment, 
  AppointmentStatus, 
  AppointmentWithDetails,
  AvailableTimeSlot
} from '@/domain/entities/appointment';

// Usuários mockados
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Cliente Teste',
    email: 'cliente@teste.com',
    phone: '(11) 99999-9999',
    role: UserRole.CLIENT,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01')
  },
  {
    id: '2',
    name: 'Barbeiro Teste',
    email: 'barbeiro@teste.com',
    phone: '(11) 88888-8888',
    role: UserRole.BARBER,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01')
  }
];

// Perfis de barbeiros mockados
export const mockBarberProfiles: BarberProfile[] = [
  {
    id: '2',
    name: 'Barbeiro Teste',
    email: 'barbeiro@teste.com',
    phone: '(11) 88888-8888',
    role: UserRole.BARBER,
    bio: 'Especialista em cortes modernos e barba',
    specialties: ['Corte moderno', 'Barba', 'Tratamento capilar'],
    address: {
      street: 'Rua Exemplo',
      number: '123',
      complement: 'Sala 1',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01001-000'
    },
    services: [
      {
        id: '1',
        name: 'Corte de Cabelo',
        description: 'Corte tradicional masculino',
        price: 50.00,
        duration: 30,
        createdAt: new Date('2025-01-01'),
        updatedAt: new Date('2025-01-01')
      },
      {
        id: '2',
        name: 'Barba',
        description: 'Aparar e modelar barba',
        price: 35.00,
        duration: 20,
        createdAt: new Date('2025-01-01'),
        updatedAt: new Date('2025-01-01')
      },
      {
        id: '3',
        name: 'Corte + Barba',
        description: 'Combo corte e barba',
        price: 75.00,
        duration: 50,
        createdAt: new Date('2025-01-01'),
        updatedAt: new Date('2025-01-01')
      }
    ],
    workingHours: [
      {
        id: '1',
        dayOfWeek: 'segunda',
        startTime: '09:00',
        endTime: '18:00',
        isAvailable: true
      },
      {
        id: '2',
        dayOfWeek: 'terca',
        startTime: '09:00',
        endTime: '18:00',
        isAvailable: true
      },
      {
        id: '3',
        dayOfWeek: 'quarta',
        startTime: '09:00',
        endTime: '18:00',
        isAvailable: true
      },
      {
        id: '4',
        dayOfWeek: 'quinta',
        startTime: '09:00',
        endTime: '18:00',
        isAvailable: true
      },
      {
        id: '5',
        dayOfWeek: 'sexta',
        startTime: '09:00',
        endTime: '18:00',
        isAvailable: true
      },
      {
        id: '6',
        dayOfWeek: 'sabado',
        startTime: '09:00',
        endTime: '14:00',
        isAvailable: true
      }
    ],
    rating: 4.8,
    appointmentLink: 'barbeiro-teste',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01')
  },
  {
    id: '3',
    name: 'André Martins',
    email: 'andre@teste.com',
    phone: '(11) 77777-7777',
    role: UserRole.BARBER,
    bio: 'Especialista em barba e bigode',
    specialties: ['Barba', 'Bigode', 'Corte clássico'],
    address: {
      street: 'Avenida Paulista',
      number: '1000',
      complement: 'Sala 10',
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01310-100'
    },
    services: [
      {
        id: '4',
        name: 'Corte Clássico',
        description: 'Corte tradicional com tesoura',
        price: 60.00,
        duration: 40,
        createdAt: new Date('2025-01-01'),
        updatedAt: new Date('2025-01-01')
      },
      {
        id: '5',
        name: 'Barba Completa',
        description: 'Barba com toalha quente e produtos especiais',
        price: 45.00,
        duration: 30,
        createdAt: new Date('2025-01-01'),
        updatedAt: new Date('2025-01-01')
      }
    ],
    workingHours: [
      {
        id: '7',
        dayOfWeek: 'segunda',
        startTime: '10:00',
        endTime: '19:00',
        isAvailable: true
      },
      {
        id: '8',
        dayOfWeek: 'quarta',
        startTime: '10:00',
        endTime: '19:00',
        isAvailable: true
      },
      {
        id: '9',
        dayOfWeek: 'sexta',
        startTime: '10:00',
        endTime: '19:00',
        isAvailable: true
      }
    ],
    rating: 4.7,
    appointmentLink: 'andre-martins',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01')
  }
];

// Agendamentos mockados
export const mockAppointments: AppointmentWithDetails[] = [
  {
    id: '1',
    clientId: '1',
    barberId: '2',
    serviceId: '1',
    date: new Date('2025-05-20'),
    startTime: '14:00',
    endTime: '14:30',
    status: AppointmentStatus.CONFIRMED,
    price: 50.00,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
    client: {
      id: '1',
      name: 'Cliente Teste',
      email: 'cliente@teste.com',
      phone: '(11) 99999-9999'
    },
    barber: {
      id: '2',
      name: 'Barbeiro Teste',
      email: 'barbeiro@teste.com',
      phone: '(11) 88888-8888'
    },
    service: {
      id: '1',
      name: 'Corte de Cabelo',
      price: 50.00,
      duration: 30
    }
  },
  {
    id: '2',
    clientId: '1',
    barberId: '3',
    serviceId: '5',
    date: new Date('2025-06-05'),
    startTime: '15:30',
    endTime: '16:00',
    status: AppointmentStatus.PENDING,
    price: 45.00,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
    client: {
      id: '1',
      name: 'Cliente Teste',
      email: 'cliente@teste.com',
      phone: '(11) 99999-9999'
    },
    barber: {
      id: '3',
      name: 'André Martins',
      email: 'andre@teste.com',
      phone: '(11) 77777-7777'
    },
    service: {
      id: '5',
      name: 'Barba Completa',
      price: 45.00,
      duration: 30
    }
  },
  {
    id: '3',
    clientId: '1',
    barberId: '2',
    serviceId: '3',
    date: new Date('2025-06-15'),
    startTime: '10:00',
    endTime: '10:50',
    status: AppointmentStatus.PENDING,
    price: 75.00,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
    client: {
      id: '1',
      name: 'Cliente Teste',
      email: 'cliente@teste.com',
      phone: '(11) 99999-9999'
    },
    barber: {
      id: '2',
      name: 'Barbeiro Teste',
      email: 'barbeiro@teste.com',
      phone: '(11) 88888-8888'
    },
    service: {
      id: '3',
      name: 'Corte + Barba',
      price: 75.00,
      duration: 50
    }
  }
];

// Histórico de agendamentos
export const mockAppointmentHistory: AppointmentWithDetails[] = [
  {
    id: '4',
    clientId: '1',
    barberId: '2',
    serviceId: '1',
    date: new Date('2025-04-15'),
    startTime: '14:00',
    endTime: '14:30',
    status: AppointmentStatus.COMPLETED,
    price: 50.00,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
    client: {
      id: '1',
      name: 'Cliente Teste',
      email: 'cliente@teste.com',
      phone: '(11) 99999-9999'
    },
    barber: {
      id: '2',
      name: 'Barbeiro Teste',
      email: 'barbeiro@teste.com',
      phone: '(11) 88888-8888'
    },
    service: {
      id: '1',
      name: 'Corte de Cabelo',
      price: 50.00,
      duration: 30
    }
  },
  {
    id: '5',
    clientId: '1',
    barberId: '3',
    serviceId: '5',
    date: new Date('2025-03-20'),
    startTime: '15:30',
    endTime: '16:00',
    status: AppointmentStatus.COMPLETED,
    price: 45.00,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
    client: {
      id: '1',
      name: 'Cliente Teste',
      email: 'cliente@teste.com',
      phone: '(11) 99999-9999'
    },
    barber: {
      id: '3',
      name: 'André Martins',
      email: 'andre@teste.com',
      phone: '(11) 77777-7777'
    },
    service: {
      id: '5',
      name: 'Barba Completa',
      price: 45.00,
      duration: 30
    }
  }
];

// Função para gerar horários disponíveis
export function generateAvailableTimeSlots(
  barberId: string,
  date: string,
  serviceId?: string
): AvailableTimeSlot[] {
  // Encontra o barbeiro
  const barber = mockBarberProfiles.find(b => b.id === barberId);
  if (!barber) return [];
  
  // Converte a data para objeto Date
  const requestDate = new Date(date);
  const dayOfWeek = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'][requestDate.getDay()];
  
  // Verifica se o barbeiro trabalha nesse dia
  const workingHour = barber.workingHours?.find(wh => wh.dayOfWeek === dayOfWeek && wh.isAvailable);
  if (!workingHour) return [];
  
  // Encontra o serviço para calcular a duração
  let serviceDuration = 30; // Duração padrão em minutos
  if (serviceId) {
    const service = barber.services?.find(s => s.id === serviceId);
    if (service) {
      serviceDuration = service.duration;
    }
  }
  
  // Gera os slots de horário
  const slots: AvailableTimeSlot[] = [];
  const [startHour, startMinute] = workingHour.startTime.split(':').map(Number);
  const [endHour, endMinute] = workingHour.endTime.split(':').map(Number);
  
  // Converte para minutos desde o início do dia
  const startTimeInMinutes = startHour * 60 + startMinute;
  const endTimeInMinutes = endHour * 60 + endMinute;
  
  // Encontra agendamentos existentes para este barbeiro nesta data
  const existingAppointments = [...mockAppointments, ...mockAppointmentHistory].filter(a => 
    a.barberId === barberId && 
    a.date.toISOString().split('T')[0] === date &&
    (a.status === AppointmentStatus.CONFIRMED || a.status === AppointmentStatus.PENDING)
  );
  
  // Converte os horários de agendamento para minutos
  const bookedSlots = existingAppointments.map(a => {
    const [startHour, startMinute] = a.startTime.split(':').map(Number);
    const [endHour, endMinute] = a.endTime.split(':').map(Number);
    return {
      start: startHour * 60 + startMinute,
      end: endHour * 60 + endMinute
    };
  });
  
  // Gera slots a cada 30 minutos
  for (let time = startTimeInMinutes; time + serviceDuration <= endTimeInMinutes; time += 30) {
    const slotEnd = time + serviceDuration;
    
    // Verifica se o slot está disponível (não conflita com agendamentos existentes)
    const isAvailable = !bookedSlots.some(bookedSlot => 
      (time >= bookedSlot.start && time < bookedSlot.end) || 
      (slotEnd > bookedSlot.start && slotEnd <= bookedSlot.end) ||
      (time <= bookedSlot.start && slotEnd >= bookedSlot.end)
    );
    
    // Formata o horário de início e fim
    const startHour = Math.floor(time / 60);
    const startMinute = time % 60;
    const endHour = Math.floor(slotEnd / 60);
    const endMinute = slotEnd % 60;
    
    const formattedStartTime = `${startHour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}`;
    const formattedEndTime = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;
    
    slots.push({
      date,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      isAvailable
    });
  }
  
  return slots;
}
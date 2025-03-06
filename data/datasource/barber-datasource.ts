/**
 * Fonte de dados para barbeiros
 * 
 * Implementa a comunicação com a API para operações relacionadas a barbeiros.
 */

import apiClient from '../remote/api';
import { BarberProfile, Service, WorkingHour } from '@/domain/entities/user';
import { mockBarberProfiles } from '../mock/mock-data';

export class BarberDataSource {
  /**
   * Obtém lista de barbeiros
   */
  async getBarbers(): Promise<BarberProfile[]> {
    // Simulação de chamada à API
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return mockBarberProfiles;
  }

  /**
   * Obtém detalhes de um barbeiro específico
   */
  async getBarberById(id: string): Promise<BarberProfile> {
    // Simulação de chamada à API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const barber = mockBarberProfiles.find(b => b.id === id);
    
    if (!barber) {
      throw new Error('Barbeiro não encontrado');
    }
    
    return barber;
  }

  /**
   * Obtém barbeiro pelo link de agendamento
   */
  async getBarberByLink(link: string): Promise<BarberProfile> {
    // Simulação de chamada à API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const barber = mockBarberProfiles.find(b => b.appointmentLink === link);
    
    if (!barber) {
      throw new Error('Barbeiro não encontrado');
    }
    
    return barber;
  }

  /**
   * Atualiza perfil do barbeiro
   */
  async updateBarberProfile(id: string, data: Partial<BarberProfile>): Promise<BarberProfile> {
    // Simulação de chamada à API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const barberIndex = mockBarberProfiles.findIndex(b => b.id === id);
    
    if (barberIndex === -1) {
      throw new Error('Barbeiro não encontrado');
    }
    
    // Atualiza os dados do barbeiro
    const updatedBarber = {
      ...mockBarberProfiles[barberIndex],
      ...data,
      updatedAt: new Date()
    };
    
    // Atualiza o mock (apenas para esta sessão)
    mockBarberProfiles[barberIndex] = updatedBarber;
    
    return updatedBarber;
  }

  /**
   * Adiciona um novo serviço ao barbeiro
   */
  async addService(barberId: string, service: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Promise<Service> {
    // Simulação de chamada à API
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const barberIndex = mockBarberProfiles.findIndex(b => b.id === barberId);
    
    if (barberIndex === -1) {
      throw new Error('Barbeiro não encontrado');
    }
    
    // Cria um novo serviço
    const newService: Service = {
      id: `service-${Date.now()}`,
      ...service,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Adiciona o serviço ao barbeiro
    if (!mockBarberProfiles[barberIndex].services) {
      mockBarberProfiles[barberIndex].services = [];
    }
    
    mockBarberProfiles[barberIndex].services!.push(newService);
    
    return newService;
  }

  /**
   * Atualiza um serviço existente
   */
  async updateService(barberId: string, serviceId: string, service: Partial<Service>): Promise<Service> {
    // Simulação de chamada à API
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const barberIndex = mockBarberProfiles.findIndex(b => b.id === barberId);
    
    if (barberIndex === -1) {
      throw new Error('Barbeiro não encontrado');
    }
    
    const serviceIndex = mockBarberProfiles[barberIndex].services?.findIndex(s => s.id === serviceId);
    
    if (serviceIndex === undefined || serviceIndex === -1) {
      throw new Error('Serviço não encontrado');
    }
    
    // Atualiza o serviço
    const updatedService = {
      ...mockBarberProfiles[barberIndex].services![serviceIndex],
      ...service,
      updatedAt: new Date()
    };
    
    // Atualiza o mock (apenas para esta sessão)
    mockBarberProfiles[barberIndex].services![serviceIndex] = updatedService;
    
    return updatedService;
  }

  /**
   * Remove um serviço
   */
  async deleteService(barberId: string, serviceId: string): Promise<void> {
    // Simulação de chamada à API
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const barberIndex = mockBarberProfiles.findIndex(b => b.id === barberId);
    
    if (barberIndex === -1) {
      throw new Error('Barbeiro não encontrado');
    }
    
    const serviceIndex = mockBarberProfiles[barberIndex].services?.findIndex(s => s.id === serviceId);
    
    if (serviceIndex === undefined || serviceIndex === -1) {
      throw new Error('Serviço não encontrado');
    }
    
    // Remove o serviço
    mockBarberProfiles[barberIndex].services!.splice(serviceIndex, 1);
  }

  /**
   * Adiciona horário de trabalho
   */
  async addWorkingHour(barberId: string, workingHour: Omit<WorkingHour, 'id'>): Promise<WorkingHour> {
    // Simulação de chamada à API
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const barberIndex = mockBarberProfiles.findIndex(b => b.id === barberId);
    
    if (barberIndex === -1) {
      throw new Error('Barbeiro não encontrado');
    }
    
    // Cria um novo horário de trabalho
    const newWorkingHour: WorkingHour = {
      id: `hour-${Date.now()}`,
      ...workingHour
    };
    
    // Adiciona o horário ao barbeiro
    if (!mockBarberProfiles[barberIndex].workingHours) {
      mockBarberProfiles[barberIndex].workingHours = [];
    }
    
    mockBarberProfiles[barberIndex].workingHours!.push(newWorkingHour);
    
    return newWorkingHour;
  }

  /**
   * Atualiza horário de trabalho
   */
  async updateWorkingHour(barberId: string, hourId: string, workingHour: Partial<WorkingHour>): Promise<WorkingHour> {
    // Simulação de chamada à API
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const barberIndex = mockBarberProfiles.findIndex(b => b.id === barberId);
    
    if (barberIndex === -1) {
      throw new Error('Barbeiro não encontrado');
    }
    
    const hourIndex = mockBarberProfiles[barberIndex].workingHours?.findIndex(h => h.id === hourId);
    
    if (hourIndex === undefined || hourIndex === -1) {
      throw new Error('Horário não encontrado');
    }
    
    // Atualiza o horário
    const updatedHour = {
      ...mockBarberProfiles[barberIndex].workingHours![hourIndex],
      ...workingHour
    };
    
    // Atualiza o mock (apenas para esta sessão)
    mockBarberProfiles[barberIndex].workingHours![hourIndex] = updatedHour;
    
    return updatedHour;
  }

  /**
   * Remove horário de trabalho
   */
  async deleteWorkingHour(barberId: string, hourId: string): Promise<void> {
    // Simulação de chamada à API
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const barberIndex = mockBarberProfiles.findIndex(b => b.id === barberId);
    
    if (barberIndex === -1) {
      throw new Error('Barbeiro não encontrado');
    }
    
    const hourIndex = mockBarberProfiles[barberIndex].workingHours?.findIndex(h => h.id === hourId);
    
    if (hourIndex === undefined || hourIndex === -1) {
      throw new Error('Horário não encontrado');
    }
    
    // Remove o horário
    mockBarberProfiles[barberIndex].workingHours!.splice(hourIndex, 1);
  }

  /**
   * Gera um novo link de agendamento
   */
  async generateAppointmentLink(barberId: string): Promise<{ link: string }> {
    // Simulação de chamada à API
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const barberIndex = mockBarberProfiles.findIndex(b => b.id === barberId);
    
    if (barberIndex === -1) {
      throw new Error('Barbeiro não encontrado');
    }
    
    // Gera um link baseado no nome do barbeiro e timestamp
    const barberName = mockBarberProfiles[barberIndex].name.toLowerCase().replace(/\s+/g, '-');
    const link = `${barberName}-${Date.now().toString(36)}`;
    
    // Atualiza o link no mock
    mockBarberProfiles[barberIndex].appointmentLink = link;
    
    return { link };
  }

  /**
   * Obtém estatísticas do barbeiro
   */
  async getBarberStats(barberId: string, period: 'day' | 'week' | 'month' | 'year' = 'month'): Promise<any> {
    // Simulação de chamada à API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Verifica se o barbeiro existe
    const barber = mockBarberProfiles.find(b => b.id === barberId);
    
    if (!barber) {
      throw new Error('Barbeiro não encontrado');
    }
    
    // Retorna estatísticas mockadas
    return {
      appointments: {
        total: 120,
        completed: 100,
        canceled: 10,
        noShow: 5,
        pending: 5
      },
      revenue: {
        total: 8500.00,
        average: 85.00
      },
      services: [
        {
          id: barber.services?.[0]?.id || '1',
          name: barber.services?.[0]?.name || 'Corte de Cabelo',
          count: 50,
          percentage: 50
        },
        {
          id: barber.services?.[1]?.id || '2',
          name: barber.services?.[1]?.name || 'Barba',
          count: 30,
          percentage: 30
        }
      ],
      clients: {
        total: 45,
        new: 5
      },
      timeDistribution: [
        {
          hour: "09:00",
          count: 10
        },
        {
          hour: "10:00",
          count: 15
        }
      ]
    };
  }
}

export default new BarberDataSource();
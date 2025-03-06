# Documentação da API - Hasty Barber

Esta documentação descreve as rotas esperadas do back-end para integração com o front-end do Hasty Barber.

## Índice

1. [Autenticação](#autenticação)
2. [Usuários](#usuários)
3. [Barbeiros](#barbeiros)
4. [Agendamentos](#agendamentos)
5. [Serviços](#serviços)
6. [Horários de Trabalho](#horários-de-trabalho)

## Autenticação

### Login

**Endpoint:** `POST /api/auth/login`

**Descrição:** Autentica um usuário e retorna um token JWT.

**Request:**
```json
{
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
```

**Response (200):**
```json
{
  "user": {
    "id": "uuid-do-usuario",
    "name": "Nome do Usuário",
    "email": "usuario@exemplo.com",
    "phone": "11999999999",
    "role": "cliente",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  },
  "token": "jwt-token"
}
```

### Registro

**Endpoint:** `POST /api/auth/register`

**Descrição:** Registra um novo usuário.

**Request:**
```json
{
  "name": "Nome do Usuário",
  "email": "usuario@exemplo.com",
  "password": "senha123",
  "phone": "11999999999",
  "role": "cliente"
}
```

**Response (201):**
```json
{
  "user": {
    "id": "uuid-do-usuario",
    "name": "Nome do Usuário",
    "email": "usuario@exemplo.com",
    "phone": "11999999999",
    "role": "cliente",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  },
  "token": "jwt-token"
}
```

### Logout

**Endpoint:** `POST /api/auth/logout`

**Descrição:** Invalida o token do usuário.

**Headers:**
```
Authorization: Bearer jwt-token
```

**Response (200):**
```json
{
  "message": "Logout realizado com sucesso"
}
```

### Obter Usuário Atual

**Endpoint:** `GET /api/auth/me`

**Descrição:** Retorna os dados do usuário autenticado.

**Headers:**
```
Authorization: Bearer jwt-token
```

**Response (200):**
```json
{
  "id": "uuid-do-usuario",
  "name": "Nome do Usuário",
  "email": "usuario@exemplo.com",
  "phone": "11999999999",
  "role": "cliente",
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}
```

### Recuperação de Senha

**Endpoint:** `POST /api/auth/forgot-password`

**Descrição:** Envia um email com um token para redefinição de senha.

**Request:**
```json
{
  "email": "usuario@exemplo.com"
}
```

**Response (200):**
```json
{
  "message": "Email de recuperação enviado com sucesso"
}
```

### Redefinir Senha

**Endpoint:** `POST /api/auth/reset-password`

**Descrição:** Redefine a senha do usuário usando o token recebido por email.

**Request:**
```json
{
  "token": "token-de-recuperacao",
  "password": "nova-senha123"
}
```

**Response (200):**
```json
{
  "message": "Senha redefinida com sucesso"
}
```

## Usuários

### Atualizar Perfil

**Endpoint:** `PUT /api/users/:id`

**Descrição:** Atualiza os dados do perfil do usuário.

**Headers:**
```
Authorization: Bearer jwt-token
```

**Request:**
```json
{
  "name": "Novo Nome",
  "phone": "11988888888",
  "birthDate": "1990-01-01"
}
```

**Response (200):**
```json
{
  "id": "uuid-do-usuario",
  "name": "Novo Nome",
  "email": "usuario@exemplo.com",
  "phone": "11988888888",
  "birthDate": "1990-01-01T00:00:00.000Z",
  "role": "cliente",
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}
```

## Barbeiros

### Listar Barbeiros

**Endpoint:** `GET /api/barbers`

**Descrição:** Retorna a lista de todos os barbeiros.

**Response (200):**
```json
[
  {
    "id": "uuid-do-barbeiro",
    "name": "Nome do Barbeiro",
    "email": "barbeiro@exemplo.com",
    "phone": "11999999999",
    "role": "barbeiro",
    "bio": "Especialista em cortes modernos",
    "specialties": ["Corte moderno", "Barba"],
    "rating": 4.8,
    "appointmentLink": "link-unico-para-agendamento",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
]
```

### Obter Barbeiro por ID

**Endpoint:** `GET /api/barbers/:id`

**Descrição:** Retorna os detalhes de um barbeiro específico.

**Response (200):**
```json
{
  "id": "uuid-do-barbeiro",
  "name": "Nome do Barbeiro",
  "email": "barbeiro@exemplo.com",
  "phone": "11999999999",
  "role": "barbeiro",
  "bio": "Especialista em cortes modernos",
  "specialties": ["Corte moderno", "Barba"],
  "address": {
    "street": "Rua Exemplo",
    "number": "123",
    "complement": "Sala 1",
    "neighborhood": "Centro",
    "city": "São Paulo",
    "state": "SP",
    "zipCode": "01001-000"
  },
  "services": [
    {
      "id": "uuid-do-servico",
      "name": "Corte de Cabelo",
      "description": "Corte tradicional masculino",
      "price": 50.00,
      "duration": 30,
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-01T00:00:00.000Z"
    }
  ],
  "workingHours": [
    {
      "id": "uuid-do-horario",
      "dayOfWeek": "segunda",
      "startTime": "09:00",
      "endTime": "18:00",
      "isAvailable": true
    }
  ],
  "rating": 4.8,
  "appointmentLink": "link-unico-para-agendamento",
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}
```

### Obter Barbeiro por Link

**Endpoint:** `GET /api/barbers/link/:link`

**Descrição:** Retorna os detalhes de um barbeiro pelo link de agendamento.

**Response (200):**
```json
{
  "id": "uuid-do-barbeiro",
  "name": "Nome do Barbeiro",
  "email": "barbeiro@exemplo.com",
  "phone": "11999999999",
  "role": "barbeiro",
  "bio": "Especialista em cortes modernos",
  "specialties": ["Corte moderno", "Barba"],
  "address": {
    "street": "Rua Exemplo",
    "number": "123",
    "complement": "Sala 1",
    "neighborhood": "Centro",
    "city": "São Paulo",
    "state": "SP",
    "zipCode": "01001-000"
  },
  "services": [
    {
      "id": "uuid-do-servico",
      "name": "Corte de Cabelo",
      "description": "Corte tradicional masculino",
      "price": 50.00,
      "duration": 30,
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-01T00:00:00.000Z"
    }
  ],
  "workingHours": [
    {
      "id": "uuid-do-horario",
      "dayOfWeek": "segunda",
      "startTime": "09:00",
      "endTime": "18:00",
      "isAvailable": true
    }
  ],
  "rating": 4.8,
  "appointmentLink": "link-unico-para-agendamento",
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}
```

### Atualizar Perfil do Barbeiro

**Endpoint:** `PUT /api/barbers/:id`

**Descrição:** Atualiza os dados do perfil do barbeiro.

**Headers:**
```
Authorization: Bearer jwt-token
```

**Request:**
```json
{
  "name": "Novo Nome",
  "phone": "11988888888",
  "bio": "Nova descrição profissional",
  "specialties": ["Corte moderno", "Barba", "Tratamento capilar"],
  "address": {
    "street": "Nova Rua",
    "number": "456",
    "complement": "Sala 2",
    "neighborhood": "Jardins",
    "city": "São Paulo",
    "state": "SP",
    "zipCode": "01001-000"
  }
}
```

**Response (200):**
```json
{
  "id": "uuid-do-barbeiro",
  "name": "Novo Nome",
  "email": "barbeiro@exemplo.com",
  "phone": "11988888888",
  "role": "barbeiro",
  "bio": "Nova descrição profissional",
  "specialties": ["Corte moderno", "Barba", "Tratamento capilar"],
  "address": {
    "street": "Nova Rua",
    "number": "456",
    "complement": "Sala 2",
    "neighborhood": "Jardins",
    "city": "São Paulo",
    "state": "SP",
    "zipCode": "01001-000"
  },
  "rating": 4.8,
  "appointmentLink": "link-unico-para-agendamento",
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}
```

### Gerar Link de Agendamento

**Endpoint:** `POST /api/barbers/:id/generate-link`

**Descrição:** Gera um novo link único para agendamento com o barbeiro.

**Headers:**
```
Authorization: Bearer jwt-token
```

**Response (200):**
```json
{
  "link": "novo-link-unico-para-agendamento"
}
```

### Obter Estatísticas do Barbeiro

**Endpoint:** `GET /api/barbers/:id/stats`

**Descrição:** Retorna estatísticas do barbeiro (agendamentos, faturamento, etc.).

**Headers:**
```
Authorization: Bearer jwt-token
```

**Query Parameters:**
- `period`: Período das estatísticas (day, week, month, year). Default: month

**Response (200):**
```json
{
  "appointments": {
    "total": 120,
    "completed": 100,
    "canceled": 10,
    "noShow": 5,
    "pending": 5
  },
  "revenue": {
    "total": 8500.00,
    "average": 85.00
  },
  "services": [
    {
      "id": "uuid-do-servico",
      "name": "Corte de Cabelo",
      "count": 50,
      "percentage": 50
    },
    {
      "id": "uuid-do-servico",
      "name": "Barba",
      "count": 30,
      "percentage": 30
    }
  ],
  "clients": {
    "total": 45,
    "new": 5
  },
  "timeDistribution": [
    {
      "hour": "09:00",
      "count": 10
    },
    {
      "hour": "10:00",
      "count": 15
    }
  ]
}
```

## Serviços

### Adicionar Serviço

**Endpoint:** `POST /api/barbers/:barberId/services`

**Descrição:** Adiciona um novo serviço ao barbeiro.

**Headers:**
```
Authorization: Bearer jwt-token
```

**Request:**
```json
{
  "name": "Corte de Cabelo",
  "description": "Corte tradicional masculino",
  "price": 50.00,
  "duration": 30
}
```

**Response (201):**
```json
{
  "id": "uuid-do-servico",
  "name": "Corte de Cabelo",
  "description": "Corte tradicional masculino",
  "price": 50.00,
  "duration": 30,
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}
```

### Atualizar Serviço

**Endpoint:** `PUT /api/barbers/:barberId/services/:serviceId`

**Descrição:** Atualiza um serviço existente.

**Headers:**
```
Authorization: Bearer jwt-token
```

**Request:**
```json
{
  "name": "Corte de Cabelo Premium",
  "description": "Corte premium com produtos especiais",
  "price": 60.00,
  "duration": 40
}
```

**Response (200):**
```json
{
  "id": "uuid-do-servico",
  "name": "Corte de Cabelo Premium",
  "description": "Corte premium com produtos especiais",
  "price": 60.00,
  "duration": 40,
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}
```

### Remover Serviço

**Endpoint:** `DELETE /api/barbers/:barberId/services/:serviceId`

**Descrição:** Remove um serviço existente.

**Headers:**
```
Authorization: Bearer jwt-token
```

**Response (200):**
```json
{
  "message": "Serviço removido com sucesso"
}
```

## Horários de Trabalho

### Adicionar Horário de Trabalho

**Endpoint:** `POST /api/barbers/:barberId/working-hours`

**Descrição:** Adiciona um novo horário de trabalho ao barbeiro.

**Headers:**
```
Authorization: Bearer jwt-token
```

**Request:**
```json
{
  "dayOfWeek": "segunda",
  "startTime": "09:00",
  "endTime": "18:00",
  "isAvailable": true
}
```

**Response (201):**
```json
{
  "id": "uuid-do-horario",
  "dayOfWeek": "segunda",
  "startTime": "09:00",
  "endTime": "18:00",
  "isAvailable": true
}
```

### Atualizar Horário de Trabalho

**Endpoint:** `PUT /api/barbers/:barberId/working-hours/:hourId`

**Descrição:** Atualiza um horário de trabalho existente.

**Headers:**
```
Authorization: Bearer jwt-token
```

**Request:**
```json
{
  "startTime": "10:00",
  "endTime": "19:00",
  "isAvailable": true
}
```

**Response (200):**
```json
{
  "id": "uuid-do-horario",
  "dayOfWeek": "segunda",
  "startTime": "10:00",
  "endTime": "19:00",
  "isAvailable": true
}
```

### Remover Horário de Trabalho

**Endpoint:** `DELETE /api/barbers/:barberId/working-hours/:hourId`

**Descrição:** Remove um horário de trabalho existente.

**Headers:**
```
Authorization: Bearer jwt-token
```

**Response (200):**
```json
{
  "message": "Horário removido com sucesso"
}
```

## Agendamentos

### Criar Agendamento

**Endpoint:** `POST /api/appointments`

**Descrição:** Cria um novo agendamento.

**Headers:**
```
Authorization: Bearer jwt-token
```

**Request:**
```json
{
  "clientId": "uuid-do-cliente",
  "barberId": "uuid-do-barbeiro",
  "serviceId": "uuid-do-servico",
  "date": "2025-05-15",
  "startTime": "14:00"
}
```

**Response (201):**
```json
{
  "id": "uuid-do-agendamento",
  "clientId": "uuid-do-cliente",
  "barberId": "uuid-do-barbeiro",
  "serviceId": "uuid-do-servico",
  "date": "2025-05-15T00:00:00.000Z",
  "startTime": "14:00",
  "endTime": "14:30",
  "status": "pendente",
  "price": 50.00,
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}
```

### Obter Agendamento por ID

**Endpoint:** `GET /api/appointments/:id`

**Descrição:** Retorna os detalhes de um agendamento específico.

**Headers:**
```
Authorization: Bearer jwt-token
```

**Response (200):**
```json
{
  "id": "uuid-do-agendamento",
  "date": "2025-05-15T00:00:00.000Z",
  "startTime": "14:00",
  "endTime": "14:30",
  "status": "pendente",
  "price": 50.00,
  "notes": null,
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z",
  "client": {
    "id": "uuid-do-cliente",
    "name": "Nome do Cliente",
    "email": "cliente@exemplo.com",
    "phone": "11999999999"
  },
  "barber": {
    "id": "uuid-do-barbeiro",
    "name": "Nome do Barbeiro",
    "email": "barbeiro@exemplo.com",
    "phone": "11999999999"
  },
  "service": {
    "id": "uuid-do-servico",
    "name": "Corte de Cabelo",
    "price": 50.00,
    "duration": 30
  }
}
```

### Obter Agendamentos do Cliente

**Endpoint:** `GET /api/appointments/client/:clientId`

**Descrição:** Retorna os agendamentos de um cliente específico.

**Headers:**
```
Authorization: Bearer jwt-token
```

**Query Parameters:**
- `status`: Filtrar por status (pendente, confirmado, cancelado, concluido, nao_compareceu)
- `page`: Número da página (default: 1)
- `limit`: Limite de itens por página (default: 10)

**Response (200):**
```json
[
  {
    "id": "uuid-do-agendamento",
    "date": "2025-05-15T00:00:00.000Z",
    "startTime": "14:00",
    "endTime": "14:30",
    "status": "pendente",
    "price": 50.00,
    "notes": null,
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z",
    "client": {
      "id": "uuid-do-cliente",
      "name": "Nome do Cliente",
      "email": "cliente@exemplo.com",
      "phone": "11999999999"
    },
    "barber": {
      "id": "uuid-do-barbeiro",
      "name": "Nome do Barbeiro",
      "email": "barbeiro@exemplo.com",
      "phone": "11999999999"
    },
    "service": {
      "id": "uuid-do-servico",
      "name": "Corte de Cabelo",
      "price": 50.00,
      "duration": 30
    }
  }
]
```

### Obter Agendamentos do Barbeiro

**Endpoint:** `GET /api/appointments/barber/:barberId`

**Descrição:** Retorna os agendamentos de um barbeiro específico.

**Headers:**
```
Authorization: Bearer jwt-token
```

**Query Parameters:**
- `status`: Filtrar por status (pendente, confirmado, cancelado, concluido, nao_compareceu)
- `date`: Filtrar por data (formato: YYYY-MM-DD)
- `page`: Número da página (default: 1)
- `limit`: Limite de itens por página (default: 10)

**Response (200):**
```json
[
  {
    "id": "uuid-do-agendamento",
    "date": "2025-05-15T00:00:00.000Z",
    "startTime": "14:00",
    "endTime": "14:30",
    "status": "pendente",
    "price": 50.00,
    "notes": null,
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z",
    "client": {
      "id": "uuid-do-cliente",
      "name": "Nome do Cliente",
      "email": "cliente@exemplo.com",
      "phone": "11999999999"
    },
    "barber": {
      "id": "uuid-do-barbeiro",
      "name": "Nome do Barbeiro",
      "email": "barbeiro@exemplo.com",
      "phone": "11999999999"
    },
    "service": {
      "id": "uuid-do-servico",
      "name": "Corte de Cabelo",
      "price": 50.00,
      "duration": 30
    }
  }
]
```

### Atualizar Status do Agendamento

**Endpoint:** `PATCH /api/appointments/:id/status`

**Descrição:** Atualiza o status de um agendamento.

**Headers:**
```
Authorization: Bearer jwt-token
```

**Request:**
```json
{
  "status": "confirmado"
}
```

**Response (200):**
```json
{
  "id": "uuid-do-agendamento",
  "clientId": "uuid-do-cliente",
  "barberId": "uuid-do-barbeiro",
  "serviceId": "uuid-do-servico",
  "date": "2025-05-15T00:00:00.000Z",
  "startTime": "14:00",
  "endTime": "14:30",
  "status": "confirmado",
  "price": 50.00,
  "notes": null,
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}
```

### Cancelar Agendamento

**Endpoint:** `PATCH /api/appointments/:id/cancel`

**Descrição:** Cancela um agendamento.

**Headers:**
```
Authorization: Bearer jwt-token
```

**Request:**
```json
{
  "reason": "Motivo do cancelamento"
}
```

**Response (200):**
```json
{
  "id": "uuid-do-agendamento",
  "clientId": "uuid-do-cliente",
  "barberId": "uuid-do-barbeiro",
  "serviceId": "uuid-do-servico",
  "date": "2025-05-15T00:00:00.000Z",
  "startTime": "14:00",
  "endTime": "14:30",
  "status": "cancelado",
  "price": 50.00,
  "notes": "Motivo do cancelamento",
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}
```

### Obter Horários Disponíveis

**Endpoint:** `GET /api/appointments/available-slots/:barberId`

**Descrição:** Retorna os horários disponíveis para um barbeiro em uma data específica.

**Query Parameters:**
- `date`: Data para verificar disponibilidade (formato: YYYY-MM-DD) (obrigatório)
- `serviceId`: ID do serviço para calcular duração (opcional)

**Response (200):**
```json
[
  {
    "date": "2025-05-15",
    "startTime": "09:00",
    "endTime": "09:30",
    "isAvailable": true
  },
  {
    "date": "2025-05-15",
    "startTime": "09:30",
    "endTime": "10:00",
    "isAvailable": true
  },
  {
    "date": "2025-05-15",
    "startTime": "10:00",
    "endTime": "10:30",
    "isAvailable": false
  }
]
```
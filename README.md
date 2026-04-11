# Portfolio — Full Stack Application

Portfólio profissional de desenvolvedor Full Stack com backend desacoplado e frontend moderno.

## Stack Tecnológica

### Backend
- **Python 3.13** + **FastAPI**
- **SQLAlchemy** (ORM) + **SQLite** (database)
- **Pydantic** (validação de dados)
- **Uvicorn** (ASGI server)
- Documentação automática via **Swagger UI** (`/docs`) e **ReDoc** (`/redoc`)

### Frontend
- **React 19** + **Vite**
- **TailwindCSS v3** (design system customizado)
- **Framer Motion** (animações)
- **Axios** (HTTP client)
- **React Router** (navegação SPA)
- **React Icons** (ícones)

## Estrutura do Projeto

```
portfolio/
├── backend/
│   ├── app/
│   │   ├── api/routes/          # Endpoints da API
│   │   ├── core/                # Configurações
│   │   ├── database/            # Conexão e seed data
│   │   ├── models/              # Modelos SQLAlchemy
│   │   ├── schemas/             # Schemas Pydantic
│   │   ├── services/            # Lógica de negócio
│   │   └── main.py              # Entry point
│   ├── requirements.txt
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/          # Componentes React
    │   ├── pages/               # Páginas
    │   ├── hooks/               # Custom hooks
    │   ├── layouts/             # Layouts
    │   ├── services/            # API client
    │   ├── App.jsx
    │   └── main.jsx
    ├── tailwind.config.js
    └── package.json
```

## Como Executar

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```
A API estará disponível em `http://localhost:8000`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
O frontend estará disponível em `http://localhost:5173`

## API Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/v1/projects` | Lista projetos |
| GET | `/api/v1/projects/{id}` | Detalhe do projeto |
| POST | `/api/v1/projects` | Criar projeto |
| PUT | `/api/v1/projects/{id}` | Atualizar projeto |
| DELETE | `/api/v1/projects/{id}` | Deletar projeto |
| GET | `/api/v1/technologies` | Lista tecnologias |
| POST | `/api/v1/technologies` | Criar tecnologia |
| POST | `/api/v1/contact` | Enviar mensagem |
| GET | `/api/v1/contact` | Listar mensagens |

## Licença

MIT

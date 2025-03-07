🚗 Concessionária Web - Sistema Completo de Gestão de Veículos
Este é um sistema web completo para uma concessionária, projetado para oferecer uma experiência moderna, intuitiva e eficiente tanto para os clientes quanto para a administração do negócio.

📌 Funcionalidades Principais
🛒 Para os Clientes

✅ Catálogo de Veículos – Página com exibição dinâmica de todos os veículos cadastrados, incluindo imagens, nome, modelo, ano, quilometragem, cor e preço.

✅ Veículos em Destaque – Seção de destaque que exibe aleatoriamente os melhores veículos disponíveis.

✅ Filtros Avançados – Pesquisa refinada por preço, ano e quilometragem, ajudando os clientes a encontrar o veículo ideal.

✅ Modal de Detalhes – Exibição detalhada do veículo, incluindo carrossel de imagens, miniaturas interativas e todas as informações relevantes.

✅ Contato via WhatsApp – Opção "Fale Conosco" para iniciar negociações diretamente pelo WhatsApp.

✅ Design Responsivo – Interface 100% adaptada para desktop, tablets e celulares.

🔧 Para Administradores (AdmVeiculos)

🔹 Autenticação Segura – Apenas usuários logados podem acessar o painel administrativo.

🔹 CRUD de Veículos – Administrador pode adicionar, editar, excluir e pausar veículos.

🔹 Gerenciamento de Imagens – Upload de imagens para exibição no catálogo.

🔹 Proteção de Rotas – Usuários não autenticados são redirecionados para a página de login.


🛠 Tecnologias Utilizadas

Frontend

⚛ React.js – Interface dinâmica e performática.

🎨 Bootstrap – Estilização moderna e responsiva.
Backend

🚀 Node.js + Express.js – API rápida e escalável.

🗄 PostgreSQL + Prisma ORM – Banco de dados eficiente e seguro.
Integrações

💬 WhatsApp API – Contato direto com os clientes.



🚀 Como Executar o Projeto?

1️⃣ Clonar o Repositório
bash
Copiar
Editar
git clone https://github.com/seu-usuario/concessionaria-web.git

2️⃣ Instalar as Dependências
Acesse a pasta do frontend e instale as dependências:

bash
Copiar
Editar
cd frontend
npm install
Depois, faça o mesmo no backend:

bash
Copiar
Editar
cd backend
npm install

3️⃣ Configurar o Banco de Dados
Crie um arquivo .env na pasta backend e adicione as credenciais do banco PostgreSQL:

bash
Copiar
Editar
DATABASE_URL=postgres://usuario:senha@localhost:5432/concessionaria
Depois, rode as migrações:

bash
Copiar
Editar
npx prisma migrate dev

4️⃣ Iniciar o Backend
bash
Copiar
Editar
cd backend
npm start

5️⃣ Iniciar o Frontend
bash
Copiar
Editar
cd frontend
npm start

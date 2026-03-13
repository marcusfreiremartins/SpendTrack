# SpendTrack

Sistema de controle de gastos residenciais desenvolvido com C# .NET no backend e React com TypeScript no frontend.

## Tecnologias

**Backend**
- C# .NET 8
- Entity Framework Core
- PostgreSQL
- Swagger

**Frontend**
- React com TypeScript
- Material UI
- Axios
- Vite

## Funcionalidades

- Cadastro de pessoas (criação, edição, deleção e listagem)
- Cadastro de categorias (criação e listagem)
- Cadastro de transações (criação e listagem)
- Regras de negócio:
  - Menor de idade só pode registrar despesas
  - Categoria deve ser compatível com o tipo da transação
  - Ao deletar uma pessoa, todas as suas transações são deletadas
- Consulta de totais por pessoa (receitas, despesas e saldo)
- Consulta de totais por categoria (receitas, despesas e saldo)

## Arquitetura

O projeto é separado em duas aplicações:
- **SpendTrack.Api** — WebAPI REST em C# .NET
- **SpendTrack.Web** — Frontend em React com TypeScript

## Banco de Dados

O script de criação das tabelas está em `Migration.sql` na raiz do projeto.

## Documentação

## Fluxo do programa: https://drive.google.com/file/d/1ZMpLtJx-j500HGn995I4wl5gTTmk0DRo/view?usp=sharing

## Deploy

- **Frontend:** https://spendtrack-web.onrender.com

> **Observação:** Como o deploy utiliza o plano gratuito do Render, os serviços podem entrar em modo de hibernação após um período de inatividade. Na primeira requisição após a hibernação, pode demorar alguns segundos até o serviço voltar a responder normalmente.

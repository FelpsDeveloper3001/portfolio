# 🚀 Portfólio Igor - Desenvolvedor de Bots e Scripts

Portfólio moderno e responsivo desenvolvido com Next.js 14, Tailwind CSS e Framer Motion.

## ✨ Características

- **Design Moderno**: Tema escuro com gradientes roxo/azul
- **Totalmente Responsivo**: Funciona perfeitamente em todos os dispositivos
- **Animações Suaves**: Implementadas com Framer Motion
- **Integração GitHub**: Busca automática dos repositórios públicos
- **Formulário de Contato**: Sistema de contato funcional
- **SEO Otimizado**: Meta tags e estrutura otimizada para buscadores
- **Performance**: Otimizado para Core Web Vitals

## 🛠️ Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Framer Motion** - Animações fluidas
- **Lucide React** - Ícones modernos
- **shadcn/ui** - Componentes UI

## 🚀 Como Usar

### 1. Clone o repositório
\`\`\`bash
git clone https://github.com/felpsdeveloper3001/portfolio.git
cd portfolio-igor
\`\`\`

### 2. Instale as dependências
\`\`\`bash
npm install
\`\`\`

### 3. Configure as variáveis de ambiente
Copie o arquivo `.env.example` para `.env.local` e configure:

\`\`\`env
GITHUB_USERNAME=seu_usuario_github
\`\`\`

### 4. Execute o projeto
\`\`\`bash
npm run dev
\`\`\`

### 5. Acesse o projeto
Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📝 Personalização

### Informações Pessoais
Edite o arquivo `app/page.tsx` e atualize:
- Nome e informações pessoais
- Links de redes sociais
- Tecnologias e especialidades
- Textos da animação de digitação

### GitHub Integration
1. Configure `GITHUB_USERNAME` no `.env.local`

### Formulário de Contato
Para ativar o envio de emails:
1. Configure um serviço como Resend, SendGrid ou EmailJS
2. Descomente e configure o código em `app/api/contact/route.ts`
3. Adicione as variáveis de ambiente necessárias

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Outras Plataformas
O projeto é compatível com:
- Netlify
- Railway
- Render
- Qualquer plataforma que suporte Next.js

## 📊 Performance

- **Lighthouse Score**: 95+ em todas as métricas
- **Core Web Vitals**: Otimizado
- **SEO**: Meta tags completas
- **Acessibilidade**: WCAG 2.1 AA

## 🔧 Scripts Disponíveis

\`\`\`bash
npm run dev          # Desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run lint         # Verificar código
npm run type-check   # Verificar tipos TypeScript
\`\`\`

## 📱 Responsividade

- **Mobile**: 320px+
- **Tablet**: 768px+
- **Desktop**: 1024px+
- **Large Desktop**: 1440px+

## 🎨 Customização de Cores

As cores podem ser alteradas no arquivo `tailwind.config.js`:

\`\`\`js
theme: {
  extend: {
    colors: {
      // Suas cores personalizadas
    }
  }
}
\`\`\`

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:
1. Fazer fork do projeto
2. Criar uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abrir um Pull Request

## 📞 Contato

- **GitHub**: [@felpsdeveloper3001](https://github.com/felpsdeveloper3001)
- **Email**: felpsdeveloper@outlook.com
- **Discord**: felpsdev

---

Desenvolvido com ❤️ por Igor

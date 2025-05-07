![](public/readme/codeleap-network-banner.jpg)

<div align="center">
  <h1 align="center">
    <a href="https://codeleap-network-three.vercel.app/" target="_blank">CodeLeap network 🚀</a>
  </h1>
  <p>An application that performs CRUD functions</p>
</div>

## Live version 

Access the <a href="https://codeleap-network-three.vercel.app/" target="_blank">deployed version here</a>.

## Run it locally

Clone the repository and then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Decisions

The reasoning behind decisions made for the project. A good historical record.

Decisions in a project are never final. But it should serve as a good way for someone to come up to speed on why certain decisions were made.

- **Web Framework**. Geralmente, uma rede social precisa de SEO. Exemplo: alguém pesquisa no Google pelo meu perfil no Instagram e o resultado deve aparecer como um dos primeiros na busca. Next.js é otimizado para SEO, além de ter outras funcionalidades que permitem criar high-quality web applications. 
- **Styling**. Tailwind CSS tem uma abordagem mobile first. Upfront responsive UI on mobile devices & telas de largura menor. 
- **Component "library"**. Usability is paramount. Shadcn/ui. (radix).
- **Data Validation**. TypeScript não é o suficiente quando se trata de validação de dados externos vindo para a aplicação. Zod garante que os dados estão em conformidade com o schema especificado, tanto em compile time como em runtime. 
- **E2E Tests**. End-to-end é um tipo de teste que traz muito valor para este tipo de projeto, pois simulam o comportamento do usuário na aplicação. 

## Thanks

You rock 🤘🏻

<!-- parei aqui -->

✅ hero img (bg from website)
✅ how to access the deployed version
✅ how to run
- decisions
- features

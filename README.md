![](assets/readme/codeleap-network-banner.jpg)

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

A short reasoning behind decisions made for the project. A good historical record.

Decisions in a project are never final. But it should serve as a good way for someone to come up to speed on why certain decisions were made.

<!--
estou escrevendo um pequeno parágrafo sobre por que tomei a decisão de usar Playwright na minha aplicação, que é uma rede social. 

sempre responda em inglês.

traduza o parágrafo abaixo para inglês. pode corrigir, adaptar ou melhorar, se necessário. 

- **E2E Tests**. Playwright tests simulate real user behavior, ensuring the app works as expected from start to finish quando se trata de ler, criar, editar e deletar posts. 
-->

- **Web Framework**. Social networks usually require SEO — e.g., if someone searches for my Instagram profile on Google, it should appear among the top results. Next.js is optimized for SEO and also provides additional features that enable the development of high-quality web applications.

- **Styling**. Tailwind CSS follows a mobile-first approach, which ensures the UI is responsive right from the start on mobile devices and smaller screen sizes. 

- **Component library**. Usability is paramount & consistency is key. Shadcn/ui + Tailwind makes it easier to make sure everything looks nice, neat, symmetrical and spaced correctly. It's built on top of Radix UI, a lib that handles accessibility by default. 

- **Data Validation**. TypeScript alone is not enough when it comes to validating external data entering the application. Zod ensures that data conforms to the specified schema at both compile time and runtime, providing strong guarantees for data integrity. 

- **E2E Tests**. Playwright tests simulate real user behavior, ensuring the app works as expected from start to finish when it comes to reading, creating, editing, and deleting posts. 

## Thanks

You rock 🤘🏻

# Transaction vs Events  
### Estratégias para Execução de Processos em Segundo Plano no Checkout de um E-commerce  

## 📌 Objetivo  
Este projeto de estudo explora diferentes formas de processar funções em segundo plano no contexto de um checkout de e-commerce, comparando abordagens síncronas e assíncronas.  

## 🚀 Caso de Uso: Checkout de Compras  
Ao finalizar uma compra, diversas operações precisam ocorrer, como validação de estoque, processamento de pagamento e emissão da nota fiscal. Essas operações podem ser executadas de diferentes maneiras.

## 🔄 Formas de Executar Processos em Segundo Plano  
1️⃣ **Transações Síncronas (Bloqueantes)**  
   - A execução das operações ocorre em sequência dentro de uma transação única.  
   - Proporciona maior consistência, mas pode afetar a performance em caso de alto volume de requisições.  

2️⃣ **Eventos Assíncronos (Não Bloqueantes)**  
   - As operações são desacopladas e processadas por meio de eventos, permitindo maior escalabilidade.  
   - Reduz o tempo de resposta do checkout, mas exige controle de falhas e garantias de entrega.  

3️⃣ **Orquestração de Eventos e Padrão Saga**  
   - Para fluxos mais complexos, é possível usar padrões como Saga, garantindo a execução coordenada das etapas do processo.  
   - Permite compensação em caso de falhas, tornando o fluxo mais resiliente.  

4️⃣ **Cron Jobs**  
   - Não se encaixa no caso do projeto


📌 Padrões utilizandos
- *Register*: para injeção e inversão de dependencia

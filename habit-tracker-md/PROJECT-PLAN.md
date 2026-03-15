# PROJECT-PLAN.md

## Visão geral
Este projeto consiste em um aplicativo mobile de rastreamento e análise de hábitos, com foco em registros diários e leitura de padrões por estatísticas simples.

## Objetivo do MVP
Entregar uma primeira versão funcional que permita configurar hábitos, registrar entradas diárias e visualizar indicadores básicos sem depender de backend.

## Premissas
- app desenvolvido em React Native com Expo
- uso de TypeScript
- persistência local com AsyncStorage
- sem autenticação no MVP
- sem sincronização em nuvem no MVP

## Milestone 1 — Fundação do projeto
### Objetivo
Preparar a base técnica do app.

### Entregas
- estrutura inicial de pastas
- types principais
- dados iniciais mockados
- serviço de persistência local
- tela de onboarding

### Critério de pronto
- usuário consegue selecionar hábitos
- usuário consegue definir duração do rastreamento
- configuração fica salva localmente

## Milestone 2 — Registro diário
### Objetivo
Implementar o fluxo principal de captura de dados.

### Entregas
- navegação principal
- tela inicial com histórico
- tela de novo registro
- componentes de mood e intensidade
- salvamento de registros

### Critério de pronto
- usuário consegue criar um registro completo
- registro salvo aparece na tela principal

## Milestone 3 — Estatísticas
### Objetivo
Transformar registros em indicadores visuais simples.

### Entregas
- total de registros
- frequência por hábito
- média de intensidade
- distribuição de moods
- utilitários de cálculo separados

### Critério de pronto
- estatísticas refletem exatamente os dados persistidos

## Milestone 4 — Configurações
### Objetivo
Permitir ajustes do rastreamento.

### Entregas
- ativar e desativar hábitos
- alterar duração do rastreamento
- persistir alterações
- restringir novos registros a hábitos ativos

### Critério de pronto
- alterações ficam salvas corretamente
- comportamento do app respeita as novas configurações

## Milestone 5 — Refinamento
### Objetivo
Melhorar a qualidade geral do MVP.

### Entregas
- revisão de UX
- validações de formulário
- tratamento de estados vazios
- mensagens de erro e sucesso
- ajuste visual final

### Critério de pronto
- fluxo principal está claro
- app está estável
- build e lint sem erro

## Riscos técnicos
- acoplamento excessivo entre UI e persistência
- falta de tipagem consistente
- navegação crescer sem organização
- estatísticas misturadas com componentes visuais

## Estratégia de mitigação
- usar types desde o começo
- separar services, utils e components
- implementar em milestones pequenas
- revisar estrutura antes de adicionar novas dependências

## Ordem ideal de implementação
1. onboarding
2. persistência local
3. novo registro
4. histórico
5. estatísticas
6. configurações
7. refinamento visual

## Fora do escopo do MVP
- login
- backend
- sincronização entre dispositivos
- gráficos avançados
- recomendações inteligentes
- notificações push

## Resultado esperado
Um app funcional, simples e escalável o suficiente para validar a experiência de rastreamento de hábitos antes da evolução para versões mais robustas.

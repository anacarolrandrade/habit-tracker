# Habit Tracker

Aplicativo mobile em React Native para rastreamento e análise de hábitos, com foco em registro diário, padrões emocionais e estatísticas simples.

## Objetivo do projeto
Permitir que a pessoa usuária acompanhe hábitos e sensações ao longo do tempo, registrando mood, intensidade e observações, para visualizar padrões e apoiar autopercepção.

## Stack inicial
- React Native
- Expo
- TypeScript
- AsyncStorage

## Escopo do MVP
- onboarding para configurar o rastreamento
- seleção de hábitos
- definição do período de acompanhamento
- criação de registros diários
- visualização de estatísticas básicas
- edição de configurações

## Estrutura sugerida
```text
app/
  (tabs)/
    index.tsx
    stats.tsx
    settings.tsx
  onboarding.tsx
  tracking/
    new-entry.tsx
    [id].tsx

components/
  ui/
  habits/
  stats/

data/
docs/
hooks/
services/
store/
types/
utils/
```

## Documentação disponível
- `AGENTS.md`
- `docs/feature-spec.md`
- `docs/user-flows.md`
- `docs/acceptance-criteria.md`
- `PROJECT-PLAN.md`

## Como iniciar
1. Criar o projeto base com Expo e TypeScript
2. Adicionar a estrutura de pastas
3. Implementar o onboarding
4. Implementar persistência local
5. Implementar fluxo de novo registro
6. Implementar estatísticas
7. Implementar configurações

## Comandos esperados
```bash
npm install
npm run start
npm run lint
npm run test
npm run build
```

## Regras de implementação
- manter simplicidade no MVP
- evitar dependências desnecessárias
- separar UI, lógica e persistência
- priorizar mobile-first
- manter boa legibilidade de código

## Próximos passos futuros
- autenticação
- sincronização em nuvem
- filtros por período
- gráficos mais avançados
- lembretes e notificações

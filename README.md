# Habit Tracker

MVP mobile em React Native + Expo + TypeScript para rastreamento de hábitos.

## Funcionalidades implementadas
- Onboarding com:
  - seleção de hábitos
  - input numérico de dias
  - sugestões clicáveis de período
- Histórico com criação de registro
- Regra de negócio: não permitir mais de um registro do mesmo hábito no mesmo dia
- Edição e exclusão de registro
- Estatísticas básicas (total, frequência, média de intensidade, distribuição de moods)
- Configurações de hábitos ativos e período
- Persistência local com AsyncStorage

## Estrutura
- `src/components`: UI reutilizável
- `src/services`: persistência e serviços de domínio
- `src/store`: estado da aplicação
- `src/types`: modelos e tipos principais
- `src/utils`: helpers e cálculos

## Comandos
```bash
npm install
npm run start
npm run lint
npm run test
npm run build
```

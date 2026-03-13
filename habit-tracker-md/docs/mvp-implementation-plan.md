# MVP Implementation Plan - React Native (Expo + TypeScript)

## 1) Escopo resumido do produto
O MVP deve permitir:
- onboarding com seleção de hábitos e definição do período de rastreamento
- criação, edição e exclusão de registros diários
- histórico de registros na tela principal
- estatísticas básicas baseadas em dados locais
- configurações para hábitos ativos e período

Sem backend no MVP, com persistência local (AsyncStorage), foco mobile-first e separação clara entre UI, estado e persistência.

## 2) Decisões fechadas antes da implementação
Com base nas respostas fornecidas:
1. **Duração do período**: input numérico (dias) com sugestões clicáveis abaixo do campo (ex.: 30, 60, 90), preenchendo o valor ao toque.
2. **Múltiplos registros do mesmo hábito no mesmo dia**: **não**.
3. **Categoria derivada do hábito**: **sim** (não editável no formulário de registro).
4. **Exclusão**: usar opção mais simples e barata em esforço (confirmação nativa curta antes de excluir).
5. **Ordenação de histórico**: por campo **date**.
6. **Timezone**: **sim**, considerar timezone local no parsing/renderização e normalização para persistência.

## 3) Arquitetura inicial proposta
### Camadas
- **UI (app + components)**: telas, navegação, componentes visuais.
- **Estado (store/hooks)**: estado da sessão de rastreamento e registros carregados.
- **Persistência (services/storage)**: leitura/escrita em AsyncStorage, sem acesso direto da UI.
- **Domínio (types/utils)**: modelos TS e funções puras de regra/cálculo.

### Princípios
- UI não importa AsyncStorage diretamente.
- Regras de negócio (ex.: impedir duplicado no mesmo dia/hábito) ficam em service/store.
- Estatísticas são calculadas por utils puras, independentes da UI.

## 4) Estrutura de pastas sugerida
```text
app/
  _layout.tsx
  onboarding.tsx
  (tabs)/
    index.tsx
    stats.tsx
    settings.tsx
  tracking/
    new-entry.tsx
    [id].tsx

src/
  components/
    ui/
      Button.tsx
      Input.tsx
      NumberSuggestions.tsx
      EmptyState.tsx
      SectionHeader.tsx
    habits/
      HabitMultiSelect.tsx
      HabitPicker.tsx
      HabitChip.tsx
    tracking/
      MoodSelector.tsx
      IntensitySelector.tsx
      NoteInput.tsx
      EntryCard.tsx
    stats/
      StatCard.tsx
      MoodDistribution.tsx
      HabitFrequencyList.tsx

  constants/
    habits.ts
    moods.ts
    intensity.ts
    periodSuggestions.ts

  services/
    storage/
      keys.ts
      storageClient.ts
    trackingConfig.service.ts
    entries.service.ts

  store/
    tracking.store.ts

  types/
    common.ts
    habit.ts
    tracking.ts
    entry.ts
    stats.ts

  utils/
    date/
      timezone.ts
      dayKey.ts
    stats/
      totalEntries.ts
      frequencyByHabit.ts
      averageIntensityByHabit.ts
      moodDistribution.ts
```

## 5) Tipos e modelos principais
```ts
export type ID = string;
export type ISODateTime = string;
export type DayISO = string; // YYYY-MM-DD (normalizado com timezone local)

export type HabitCategory = 'saude_bem_estar' | 'emocional' | 'profissional';

export interface Habit {
  id: ID;
  name: string;
  category: HabitCategory;
  isActive: boolean;
}

export type Mood = 'muito_ruim' | 'ruim' | 'neutro' | 'bom' | 'muito_bom';
export type Intensity = 'fraca' | 'media' | 'intensa';

export interface HabitEntry {
  id: ID;
  habitId: ID;
  date: DayISO; // chave de dia para ordenação e regra de unicidade diária
  mood: Mood;
  intensity: Intensity;
  note?: string;
  category: HabitCategory; // derivada do hábito
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

export interface TrackingConfig {
  selectedHabitIds: ID[];
  periodDays: number; // input numérico
  startedAt: ISODateTime;
  onboardingCompleted: boolean;
}
```

## 6) Telas do MVP
1. **Onboarding**
   - seleção de hábitos
   - input numérico de dias
   - sugestões clicáveis de período
   - salvar e entrar no app

2. **Home (Histórico)**
   - lista de registros ordenada por `date`
   - estado vazio com CTA
   - botão “Novo registro”

3. **Novo registro**
   - selecionar hábito ativo
   - selecionar mood
   - selecionar intensidade
   - nota opcional
   - validar duplicidade (hábito+date)

4. **Detalhe/Edição de registro**
   - editar mood, intensidade, nota
   - excluir com confirmação simples

5. **Estatísticas**
   - total de registros
   - frequência por hábito
   - média de intensidade por hábito
   - distribuição de moods

6. **Configurações**
   - ativar/desativar hábitos monitorados
   - alterar período em dias (input + sugestões)

## 7) Componentes reutilizáveis
- UI base: `Button`, `Input`, `NumberSuggestions`, `EmptyState`, `SectionHeader`
- Hábitos: `HabitChip`, `HabitMultiSelect`, `HabitPicker`
- Registro: `MoodSelector`, `IntensitySelector`, `NoteInput`, `EntryCard`
- Stats: `StatCard`, `HabitFrequencyList`, `MoodDistribution`

## 8) Milestones pequenas e seguras
### Milestone 1 — Fundação
- criar estrutura de pastas
- definir types e constantes
- implementar `storageClient` + keys
- implementar `trackingConfig.service`

**Pronto quando**: configuração é salva/carregada localmente sem erro.

### Milestone 2 — Onboarding
- tela onboarding funcional
- input numérico de dias com sugestões clicáveis
- validações mínimas (>=1 hábito, dias > 0)
- persistência da configuração

**Pronto quando**: usuário conclui onboarding e entra no fluxo principal.

### Milestone 3 — Registro diário
- home + histórico
- tela de novo registro
- regra “não permitir múltiplo registro do mesmo hábito no mesmo dia”
- edição e exclusão de registro

**Pronto quando**: CRUD básico de registro funciona com persistência.

### Milestone 4 — Estatísticas
- utilitários puros de cálculo
- tela de stats com indicadores do MVP
- atualização após criar/editar/excluir

**Pronto quando**: stats refletem exatamente o storage local.

### Milestone 5 — Configurações + refinamento
- editar hábitos ativos
- editar período de rastreamento
- revisar estados vazios, mensagens e UX mobile
- revisar legibilidade e organização

**Pronto quando**: critérios de aceite completos + lint/build sem erro.

## 9) Lista objetiva de arquivos a criar
- `app/onboarding.tsx`
- `app/(tabs)/index.tsx`
- `app/(tabs)/stats.tsx`
- `app/(tabs)/settings.tsx`
- `app/tracking/new-entry.tsx`
- `app/tracking/[id].tsx`
- `src/types/common.ts`
- `src/types/habit.ts`
- `src/types/tracking.ts`
- `src/types/entry.ts`
- `src/types/stats.ts`
- `src/constants/habits.ts`
- `src/constants/moods.ts`
- `src/constants/intensity.ts`
- `src/constants/periodSuggestions.ts`
- `src/services/storage/keys.ts`
- `src/services/storage/storageClient.ts`
- `src/services/trackingConfig.service.ts`
- `src/services/entries.service.ts`
- `src/store/tracking.store.ts`
- `src/utils/date/timezone.ts`
- `src/utils/date/dayKey.ts`
- `src/utils/stats/totalEntries.ts`
- `src/utils/stats/frequencyByHabit.ts`
- `src/utils/stats/averageIntensityByHabit.ts`
- `src/utils/stats/moodDistribution.ts`

## 10) Riscos técnicos
- **Timezone e virada de dia**: risco de inconsistência de `date` por locale/UTC.
- **Duplicidade diária**: risco de race em gravação se não validar no service.
- **Acoplamento UI/storage**: risco de manutenção difícil.
- **Tipagem frouxa de domínio**: risco de bugs silenciosos em stats.
- **Crescimento da navegação sem padrão**: risco de retrabalho futuro.

## 11) Perguntas em aberto
- Faixa mínima/máxima de `periodDays` (ex.: 1–365)?
- Lista final de sugestões de período (30/60/90 apenas ou mais)?
- Edição de registro pode alterar `date` ou apenas mood/intensity/note?
- Ao desativar hábito com histórico, mantém stats históricas (recomendado: sim)?
- Qual política para dados corrompidos no AsyncStorage (reset, fallback ou bloqueio)?

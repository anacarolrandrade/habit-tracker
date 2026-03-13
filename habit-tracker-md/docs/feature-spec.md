# Feature Spec - Habit Tracker

## Nome da feature
Análise de Hábitos

## Objetivo
Permitir que a pessoa usuária registre hábitos, sentimentos e intensidade ao longo do tempo, para depois visualizar padrões e estatísticas simples.

## Plataforma
Aplicativo mobile em React Native.

## Proposta do MVP
O MVP deve permitir:
- definir hábitos a serem acompanhados
- registrar entradas diárias
- associar mood ao registro
- associar intensidade ao registro
- classificar o hábito por agrupamento
- visualizar estatísticas básicas
- editar configurações do rastreamento

## Áreas principais do app
1. Cadastro do rastreamento
2. Estatísticas
3. Configurações

## Hábitos iniciais
- Carência
- Disposição
- Apetite
- Concentração
- Libido
- Cólica / Desconfortos

## Agrupamentos
- Saúde e Bem-Estar
- Emocional
- Profissional

## Mood
O registro deve permitir seleção de humor por representação visual e textual.

Sugestão inicial:
- muito ruim
- ruim
- neutro
- bom
- muito bom

## Intensidade
Cada registro deve ter intensidade:
- fraca
- média
- intensa

## Campos de um registro
- id
- habitId
- date
- mood
- intensity
- note (opcional)
- category
- createdAt
- updatedAt

## Fluxo principal
A pessoa usuária:
1. escolhe os hábitos que deseja monitorar
2. define o período de acompanhamento
3. registra entradas diárias
4. acompanha estatísticas
5. ajusta configurações quando necessário

## Funcionalidades do MVP
- criar rastreamento
- listar hábitos monitorados
- criar registro diário
- editar registro
- excluir registro
- exibir estatísticas simples
- editar hábitos acompanhados
- editar duração do período

## Estatísticas do MVP
- frequência por hábito
- média de intensidade por hábito
- distribuição de moods
- quantidade de registros por período
- visão por agrupamento

## Regras
- o usuário só pode registrar hábitos ativos
- um mesmo hábito pode ter múltiplos registros em dias diferentes
- notas são opcionais
- estatísticas devem refletir os registros salvos localmente
- exclusões devem atualizar os indicadores

## Requisitos não funcionais
- interface simples
- foco em mobile-first
- código organizado
- componentes reutilizáveis
- persistência local confiável
- fácil evolução para futura API

## Fora do MVP
- autenticação
- sincronização em nuvem
- notificações push
- relatórios avançados
- gráficos complexos

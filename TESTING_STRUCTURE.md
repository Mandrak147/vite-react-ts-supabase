# Estrutura de Testes - Projeto React + Supabase

## Configuração Atual

- **Framework**: Vitest + React Testing Library
- **Ambiente**: jsdom para simular DOM do browser
- **Setup**: `src/test/setup.ts` com mocks do Supabase
- **Scripts**: 
  - `npm test` - Executa testes em modo watch
  - `npm run test:run` - Executa todos os testes uma vez
  - `npm run test:ui` - Interface gráfica do Vitest
  - `npm run test:coverage` - Relatório de cobertura

## Estrutura Progressiva de Implementação

### Fase 1: Testes Unitários Básicos ⭐
**Objetivo**: Testar componentes isolados e funções utilitárias

#### 1.1 Testes de Utilidades
- [ ] `src/libs/queryClient.test.ts` - Configuração do React Query
- [ ] `src/utils/` (quando criado) - Funções auxiliares

#### 1.2 Testes de Hooks
- [ ] `src/hooks/useAuth.test.tsx` - Hook de autenticação
- [ ] `src/hooks/useSignOut.test.tsx` - Hook de logout

#### 1.3 Testes de Componentes Simples
- [ ] `src/components/` (quando criado) - Componentes reutilizáveis
- [ ] `src/pages/HomePage.test.tsx` - Página inicial
- [ ] `src/ProtectedRoute.test.tsx` - Proteção de rotas

### Fase 2: Testes de Integração ⭐⭐
**Objetivo**: Testar interação entre componentes e fluxos completos

#### 2.1 Testes de Fluxo de Autenticação
- [ ] `src/test/integration/auth-flow.test.tsx` - Login completo
- [ ] `src/test/integration/protected-routes.test.tsx` - Navegação protegida

#### 2.2 Testes de Context e Estado Global
- [ ] `src/context/AuthContext.test.tsx` - Provider de autenticação
- [ ] `src/test/integration/query-client.test.tsx` - Estado do React Query

#### 2.3 Testes de Páginas Completas
- [ ] `src/pages/LoginPage.test.tsx` - Página de login com formulário
- [ ] `src/pages/DashboardPage.test.tsx` - Dashboard com autenticação

### Fase 3: Testes E2E e Avançados ⭐⭐⭐
**Objetivo**: Testar fluxos completos da aplicação

#### 3.1 Setup E2E (Futuro)
- [ ] Configurar Playwright ou Cypress
- [ ] Testes de fluxo completo usuário

#### 3.2 Testes de Performance
- [ ] Testes de renderização de componentes
- [ ] Testes de memory leaks

#### 3.3 Testes de Acessibilidade
- [ ] Testes com jest-axe
- [ ] Navegação por teclado

## Padrões e Convenções

### Estrutura de Arquivos
```
src/
├── test/
│   ├── setup.ts                 # Configuração global
│   ├── mocks/                   # Mocks reutilizáveis
│   │   ├── supabase.ts
│   │   └── react-query.ts
│   ├── utils/                   # Utilitários de teste
│   │   ├── render.tsx           # Render customizado
│   │   └── test-data.ts         # Dados de teste
│   └── integration/             # Testes de integração
│       ├── auth-flow.test.tsx
│       └── protected-routes.test.tsx
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   └── Button.test.tsx      # Teste ao lado do componente
└── hooks/
    ├── useAuth.tsx
    └── useAuth.test.tsx         # Teste ao lado do hook
```

### Convenções de Nomenclatura
- **Arquivos de teste**: `*.test.tsx` ou `*.spec.tsx`
- **Mocks**: `__mocks__/` ou `src/test/mocks/`
- **Test IDs**: `data-testid="component-name-element"`
- **Describe blocks**: Nome do componente/função
- **Test names**: Comportamento esperado em português

### Templates de Teste

#### Componente React
```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('deve renderizar corretamente', () => {
    render(<ComponentName />);
    expect(screen.getByText('Texto esperado')).toBeInTheDocument();
  });

  it('deve reagir a interação do usuário', async () => {
    const user = userEvent.setup();
    render(<ComponentName />);
    
    await user.click(screen.getByRole('button'));
    expect(screen.getByText('Resultado')).toBeInTheDocument();
  });
});
```

#### Hook Customizado
```typescript
import { renderHook, act } from '@testing-library/react';
import { useCustomHook } from './useCustomHook';

describe('useCustomHook', () => {
  it('deve retornar valores iniciais corretos', () => {
    const { result } = renderHook(() => useCustomHook());
    
    expect(result.current.value).toBe(expectedValue);
  });

  it('deve atualizar estado corretamente', () => {
    const { result } = renderHook(() => useCustomHook());
    
    act(() => {
      result.current.updateValue('novo valor');
    });

    expect(result.current.value).toBe('novo valor');
  });
});
```

## Mocks Importantes

### Supabase Client
```typescript
// src/test/mocks/supabase.ts
export const mockSupabase = {
  auth: {
    getUser: vi.fn(),
    onAuthStateChange: vi.fn(),
    signInWithPassword: vi.fn(),
    signOut: vi.fn(),
  },
  from: vi.fn(() => ({
    select: vi.fn(),
    insert: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  })),
};
```

### React Router
```typescript
// src/test/mocks/react-router.ts
export const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));
```

## Métricas e Objetivos

### Cobertura de Código
- **Meta Fase 1**: 60% cobertura
- **Meta Fase 2**: 75% cobertura  
- **Meta Fase 3**: 85% cobertura

### Performance dos Testes
- Testes unitários: < 1s por arquivo
- Testes de integração: < 5s por arquivo
- Suite completa: < 30s

## Próximos Passos

1. **Imediato**: Implementar testes da Fase 1 (componentes básicos)
2. **Curto prazo**: Adicionar CI/CD com execução automática dos testes
3. **Médio prazo**: Implementar testes de integração da Fase 2
4. **Longo prazo**: Setup completo E2E da Fase 3

## Comandos Úteis

```bash
# Executar testes específicos
npm test -- Button.test.tsx

# Executar testes com cobertura
npm run test:coverage

# Executar testes em modo debug
npm test -- --inspect-brk

# Executar apenas testes que falharam
npm test -- --reporter=verbose --run

# Watch mode para desenvolvimento
npm test
```
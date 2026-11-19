# Registro de Testes de Endpoint
Aluno: Pedro Augusto Fernandes Francelino
Grupo: 4

## Testes escritos
|  # | Verbo e rota | Com token? | Status esperado | Verde ou vermelho? |
|----| ------------ | ---------- | --------------- | ------------------ |
| 1  | `POST /eventos` | Sim | 201 | Verde |
| 2  | `GET /eventos/:id` (`/eventos/999`) | Não | 404 | Verde |
| 3  | `GET /eventos/:id` (`/eventos/${evento.id}abc`) | Não | 400 | Vermelho |

## Resultado
Linha "Tests:" da saída do npm run test:endpoint:
`Tests:       1 failed, 4 passed, 5 total` *(confira no seu terminal caso existam outros arquivos `.test.js` na pasta `endpoint`)*

## Defeito encontrado
Teste: `GET /eventos/:id` — `"responde 400 quando o id tem letras"`
Esperado: Status `400` (Bad Request), rejeitando a requisição porque o parâmetro `id` contém letras e não é um número inteiro válido.
Obtido: Status `200` (OK), retornando os dados do evento que acabou de ser criado no *Arrange*. Isso acontece porque a API não valida se o `id` é estritamente numérico antes de consultar o banco, e o SQLite (assim como `parseInt`) converte/trunca a string `"1abc"` para o número `1`, encontrando o registro existente.
Em qual aula esse mesmo defeito já tinha aparecido, e como: Na **Aula [inserir número da aula — ex.: Aula 02/03 de Testes Manuais de API com Postman/Insomnia ou Aula 05 de Testes de Unidade/Integração]**, quando testamos buscar um registro por ID passando letras após o número (como `/eventos/1abc` ou `/usuarios/1abc`) e a API retornou `200` com o registro de ID `1` em vez de `400`, devido à falta de validação do parâmetro `id` e à coerção de tipos do SQLite.
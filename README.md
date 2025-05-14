# API para identificação de usuários acadêmicos 🎓
A API extrai a matrícula do email institucional (formato: `matricula@pucgo.edu.br`) e verifica no Firestore se existe um usuário com essa matrícula cadastrada apresentando matrícula, nome e tipo (aluno ou professor).

## 📍 Endpoint 
### 'POST identificarUsuario'

## Requisição
A requisição é feita da seguinte maneira:
```json
{
  "email": "2025101@pucgo.edu.br"
}
```
Resposta esperada `(200)`:
```json
{
  "matricula": "2025101",
  "nome": "Fulano",
  "tipo": "aluno"
}
```

## Erros
- `400`: Email não fornecido ou inválido;
- `404`: Usuário não encontrado/cadastrado;
- `405`: Método não permitido (use somente POST);
- `500`: Erro interno no servidor.

## Hospedagem
A API está hospedada no Render.



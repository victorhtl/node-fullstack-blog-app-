# knowledge

## Migrations do Knex
As migrations funcionam como um histórico automatizado. Você pode ir criando novas versões do banco em exports.up
e criar uma espécie de "backup" em exports.down. Para cada nova versão do up, desfaça ela no down

## Run versao-final
- Execute o npm i tanto no diretório frontend quanto no backend
- Execute o mongod localmente na máquina com o comando sudo systemctl start mongod
- No diretorio backend, rode npm start
- No diretório frontend, rode npm run serve -- --port 8081

## Observacoes
Foi utilizado o consign para fazer a organização dos endpoints da API. Tente fazer sem o consign depois

## TODO
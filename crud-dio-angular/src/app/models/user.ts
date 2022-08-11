//foi criada esta interface pelo comando ng g interface models/users para ser usado pelo serviço

export interface User {
    //o id com ? significa que a tipagem fica opcional 
    //id?: number, --> no final do projeto foi tirado a tipagem opcional (number ou indefined) do id, ou seja foi tirado a "?"
    id: number,
    nome: string,
    sobrenome: string,
    idade: number,
    profissao: string,


}

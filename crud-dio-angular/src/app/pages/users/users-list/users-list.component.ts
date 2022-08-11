import { Component, OnInit } from '@angular/core';
import { ConnectableObservable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  //a linha abaixo irá inicializar o array de usuários, que irá salvar as respostas do formulário
  users: Array<User> = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  //o serviço de metodo feito em user.service será utilizado no get abaixo, 
  //mas antes é preciso fazer a injeção de dependência do serviço no construtor
  //inserindo (private userService: UserService)
  getUsers(): void {
    //tipagem void é usada quando não queremos retornar nada
    this.userService.getUsers().subscribe(response => {
      //aqui o subscribe retorna uma uma api de callback que no caso vai vim o response que justamente da chamada do api 
      this.users = response;
    }, (err) => {
      console.log('Erro ao executar', err.status);
    })
    //metodo get feito, em seguida deve ser feito a chamada do metodo com o comando this.getUsers(); no ngOnInit(): void {}
    //da classe UsersListComponet
    
  }
  //Após isso, com o metodo get feito o users tem a resposta do servidor e deve ir no componente html para jogar na tela em user-list.component.html

  //metodo para exlcuir da lista de usuários com a chamada do deleteUser do user.service que recebe o id: string como parâmetro
  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(response => {
      //subscribe tem alguns callbacks-> 1º) next, 2ª) error? e 3ª) complete.
      //no caso o 1º parâmetro de callback foi o next console.log('Usuário Excluído !');
    }, (err) => {
      console.log(err);
      //a segunda função é a de erro acima
    }, () => {
      this.getUsers();
      //a terceira após a execução das duas funções anterioes ele chama o getUsers para mostrar a lista de usuários novamente
    })
  }


}

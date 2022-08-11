import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  users: Array<User> = [];
  userId: any = '';
  //a variavel userId foi criada para ser usada abaixo no ngOnInit()

  constructor(private fb: FormBuilder,
    private userService: UserService, 
    private actRoute: ActivatedRoute,
    private router: Router) {
  //após a construção do metodo postUser em UserService o mesmo deve ser instanciado no construtor com o comando
  //private userService : UserService
  // o private actRoute: ActivatedRoute e o private router: Router foram importados para o construtor para a 
  //construção da função do botão de edita/salvar

  //a tipagem fb (form build) acima permite trabalhar com agrupamento de formulários como componentes da classe
    this.userForm = this.fb.group({
      //.goup aceita objeto e com o objeto é possível mapear o que deseja do formulário
      id: 0,
      nome: '',
      sobrenome: '',
      idade:'',
      profissao:'',
    })
     
  }

  ngOnInit(): void {

    this.actRoute.paramMap.subscribe(params => {
      this.userId = params.get('id');
      //o parametro .get serve para pegar o parâmetro id da rota
      console.log(this.userId);
      if(this.userId !== null) {
        this.userService.getUser(this.userId).subscribe(result => {
          //.getUser trás um array com um único usuário, assim temos que ajustar conforma abaixo
          this.userForm.patchValue({
            //o .patchValue atualiza o valor do formulário
            id: result[0].id,
            // [0] significa índice zero
            nome: result[0].nome,
            sobrenome: result[0].sobrenome,
            idade:result[0].idade,
            profissao:result[0].profissao,

          })
        })
      }


    })

    this.getUsers();
  }
  
  //get para resolver o id auto increment
  //deve-se adicionar na no UserFormComponent a variável users: Array<User> = [];
  getUsers(){
    this.userService.getUsers().subscribe(response => {
      this.users = response;
    })
    //após a construção deste getUsers deve-se chamá-la no ngOnInit com this.getUsers();

  }

  //o metodo createUser é para salvar no banco
  createUser() {
    this.userForm.get('id')?.patchValue(this.users.length + 1);
    // a linha acima com o .get pega o id e atualiza o valor do id com o .patchValue
    this.userService.postUser(this.userForm.value).subscribe(result => {
      console.log(`Usuário ${result.nome} ${result.sobrenome} foi cadastrado com sucesso !`)
    }, (err) => {

    }, () => {
      this.router.navigate(['/']);
      //se passar pelas duas funções anteriores deseja-se que se navegue para rota / que volta para o caminho da raiz
    })
    
  }

  updateUser() {
    this.userService.updateUser(this.userId, this.userForm.value).subscribe(result => {
      console.log('Usuário atualizado', result);
    }, (err) => {

    }, () => {
      this.router.navigate(['/']);
      //se passar pelas duas funções anteriores deseja-se que se navegue para rota / que volta para o caminho da raiz
    })
    //no updateUser, acima, foi usado o next, o error e complete, as três funções. Esse ajuste foi replicado para os outros createUser, etc
    //.updateUser() precisa de dois parâmetros, um é o userId e o outro é o user com o userForm.value
  }

  //metodo para deixar o botão dinâmico
  actionButton() {
    if(this.userId !== null) {
      this.updateUser()
    }else {
      this.createUser()
    }


  }

}

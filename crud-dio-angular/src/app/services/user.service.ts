import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //depois do 2º passo deve-se colocar a URL da api conforme linha abaixo, no caso a api do sheet.best
  //apiUrl = 'https://sheet.best/api/sheets/d426c256-e920-4ff9-b971-f976807ab8e8';
  apiUrl = 'https://sheet.best/api/sheets/e54221a1-0ae0-4f69-b3e0-7962f84fece0';
  
  //há possibilidade de passar informaçõs da api no header e assim pode usar
  //a estrutura abaixo usando uma variável "httpOptions" que vai ser um objeto, e no objeto pode-se ter
  //o "headers:" que será a chave, e na chave pode passar o alias chamado de "HttpHeaders" que espera
  //uma string ou um objeto com chave e valor que também serão string
  httpOptions = {
    headers: new HttpHeaders({
      'content-Type': 'application/json',
      //'Token': '123456789'
    })

  }
          

  constructor(private httpClient: HttpClient) { }
  //As possibilidades neste serviço seria C.R.U.D -> CREATE, READ, UPDATE, DELETE

  //->RETORNA A LISTA DE USUÁRIOS - READ
  //retorna a lista de usuarios, 
  //1ª coisa a fazer é no construtor colocar o (private httpClient: HttpClient) {}
  //2ª coisa é fazer o metodo abaixo que será utilizado no user-list.component:
  getUsers(): Observable<User[]> {
      return this.httpClient.get<User[]>(this.apiUrl);
  }

  //->SALVA O USUÁRIO NO BANCO - CREATE
  //salva usuário no banco CREATE
  //postUser vai receber um user do tipo User (que é o objeto/parâmetro para salvar no banco)
  //que observa e retorna um usuário, por isso não é array só um user mesmo
  postUser(user: User):Observable<User> {
    return this.httpClient.post<User>(this.apiUrl, user, this.httpOptions);
    //o .post exige duas coisa a URL e o body da requisição
    //a terceira coisa que é opcional que é do tip http e headers, assim é possível enviar dados através
    //do header da requisição
  }

  //->EXCLUI O USUÁRIO NO BANCO - DELETE
  //o deleteUser recebe um id que roda o comando contido no return abaixo que manda excluir
  deleteUser(id: number):Observable<User> {
    //a documentação da api no sheet.best informa que o delete pode ser pela url da api com filtro nas colunas, 
    //caso escolhemos a coluna id
    return this.httpClient.delete<User>(`${this.apiUrl}/id/${id}`);
  }

  //->EDITA O USUÁRIO NO BANCO - UPDATE
  //o updateUser recebe id tipo string e user tipo User e retorna o Obervable User
  updateUser(id: string, user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.apiUrl}/id/${id}`, user, this.httpOptions);
    //o metodo .put é o utilizado para atualizar os dados no banco e recebe o a url da api com o id de filtro,
    // o usuario e o httpOptions
  }
  //após a construção do serviço apdateUser deve voltar ao ngOnInit em user-form.component para utilizá-lo

  //->LISTA USUÁRIO ÚNICO - UPDATE
  getUser(id: string):Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}/id/${id}`);
  }

}

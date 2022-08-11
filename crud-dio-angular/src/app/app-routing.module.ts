import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserFormComponent } from "./pages/users/user-form/user-form.component";
import { UsersListComponent } from "./pages/users/users-list/users-list.component";

const routes: Routes = [
    //objeto de rotas espera:
    //1º) um "path" que é o caminho da rota
    //2º) o componente que será enderizado na rota
    //Neste exemplo temos para o caminho vazio entre '' nos queremos enderizar o componente "UsersListComponent"
    {
        path:'', component: UsersListComponent
    },
    {
        path:'form', component: UserFormComponent
    },
    {
        path:'form/:id', component: UserFormComponent
        //form/:id para a propriedade id do form pela rota
        //essa nova rota vai servir para editar o formulário
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
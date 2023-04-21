import { modulosEsenciales } from '../compartido/modulos-esenciales';
import { modulosFormularios } from '../compartido/modulos-formulario';
import { CabeceraComponent } from './../cabecera/cabecera.component';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import { UsuariosService } from '../controladores/servicios/usuarios/usuarios.service';
import { CategoriasService } from '../controladores/servicios/categorias/categorias.service';
import { Usuario } from '../controladores/interfaces/usuario';
import { Categoria } from '../controladores/interfaces/categoria';

import { ToastrService } from 'ngx-toastr';
import { APIResponse } from '../controladores/interfaces/apiResponse';


@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'],
  standalone: true,
  imports: [
    modulosEsenciales, 
    modulosFormularios,
    CabeceraComponent
  ],
})


export class RegistrarComponent implements OnInit {

  iconBtn = faPaperPlane;
  public usuario!: Usuario;
  public categorias!: Categoria[]; 
  public form: FormGroup;

  constructor(
    private userS: UsuariosService,
    private cantg: CategoriasService,
    private fb: FormBuilder,
    private toastr: ToastrService
    ) {
    this.form = this.fb.group({
      nombre_completo: [null, [Validators.required, Validators.minLength(6),  Validators.maxLength(100) ]],
      nombre_empresa: [null, [Validators.required, Validators.minLength(2),  Validators.maxLength(100) ]],
      correo_electronico: [null, [Validators.required, Validators.minLength(6),  Validators.maxLength(100), Validators.email]],
      telefono: [null, [Validators.required, Validators.minLength(9),  Validators.maxLength(20) ]],
      id_categoria: [null, [Validators.required, Validators.minLength(1),  Validators.maxLength(11) ]],
      mensaje: [null, [Validators.required, Validators.minLength(2),  Validators.maxLength(255) ]],
    });

    this.cantg.listar()
    .then((response: APIResponse | undefined) => {
      console.log('Data: ', response);
      this.categorias = response?.data
      if (response?.error) {
        this.toastr.error(response?.mensaje);
      }
    })
    .catch((error) => {
      console.log('Error al cargar las categorias:', error);
    });
  }

  ngOnInit(): void {
  }

  guardar(){
    this.usuario = {
      nombre_completo: this.form.value.nombre_completo,
      nombre_empresa: this.form.value.nombre_empresa,
      correo_electronico: this.form.value.correo_electronico,
      telefono: this.form.value.telefono,
      id_categoria: this.form.value.id_categoria,
      mensaje: this.form.value.mensaje
    };
    this.userS.guardar(this.usuario)
    .then((response: APIResponse | undefined) => {
      console.log('Data: ', response);
      
      if (response?.error) {
        this.toastr.error(response?.mensaje);
      } else {
        this.toastr.success(response?.mensaje);
        this.limpiearFormulario();
      }

    })
    .catch((error) => {
      // Handle error.
      console.log('An error occurred:', error);
      this.toastr.error(error);

    });
  }

  limpiearFormulario(){
    this.form.patchValue({
      nombre_completo: '',
      nombre_empresa: '',
      correo_electronico: '',
      telefono: '',
      id_categoria: null,
      mensaje: ''
    })
  }

}
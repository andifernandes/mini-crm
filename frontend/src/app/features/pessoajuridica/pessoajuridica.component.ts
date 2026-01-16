// src/app/features/pessoajuridica/pessoajuridica.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PessoaJuridica } from '../../core/models/pessoajuridica.model';

// PrimeNG
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

// Models
import { Endereco } from '../../core/models/endereco.model';

// Services
import { EnderecosService } from '../../core/services/enderecos/enderecos.service';
import { PessoaJuridicaService } from '../../core/services/pessoajuridica/pessoajuridica.service';

@Component({
  selector: 'app-pessoajuridica',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './pessoajuridica.component.html',
  styleUrls: ['./pessoajuridica.component.css'],
})
export class PessoaJuridicaComponent implements OnInit {
  pessoas: PessoaJuridica[] = [];
  enderecos: Endereco[] = [];

  dialogVisible = false;
  editingId: string | null = null;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pessoaService: PessoaJuridicaService,
    private enderecoService: EnderecosService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      razaoSocial: ['', Validators.required],
      cnpj: ['', Validators.required],
      enderecoId: ['', Validators.required],
      telefone: [''],
      email: ['', Validators.email],
    });
  }

  ngOnInit(): void {
    this.loadPessoas();
    this.loadEnderecos();
  }

  loadPessoas() {
    this.pessoaService.getAll().subscribe({
      next: res => (this.pessoas = res),
      error: () => this.showError('Erro ao carregar pessoas jurídicas'),
    });
  }

  loadEnderecos() {
    this.enderecoService.getAll().subscribe({
      next: res => (this.enderecos = res),
      error: () => this.showError('Erro ao carregar endereços'),
    });
  }

  novaPessoa() {
    this.editingId = null;
    this.form.reset();
    this.dialogVisible = true;
  }

  editarPessoa(pessoa: PessoaJuridica) {
    this.editingId = pessoa.id!.toString();
    this.form.patchValue({
      razaoSocial: pessoa.razaoSocial,
      cnpj: pessoa.cnpj,
      enderecoId: pessoa.enderecoId,
      telefone: pessoa.telefone,
      email: pessoa.email,
    });
    this.dialogVisible = true;
  }

  salvar() {
    if (this.form.invalid) return;

    const payload: PessoaJuridica = {
      ...this.form.value,
      id: this.editingId ?? undefined,
    };

    if (!this.editingId) {
      this.pessoaService.create(payload).subscribe({
        next: () => {
          this.dialogVisible = false;
          this.loadPessoas();
          this.showSuccess('Pessoa Jurídica criada com sucesso!');
        },
        error: () => this.showError('Erro ao criar Pessoa Jurídica'),
      });
    } else {
      this.pessoaService.update(payload).subscribe({
        next: () => {
          this.dialogVisible = false;
          this.loadPessoas();
          this.showSuccess('Pessoa Jurídica atualizada!');
        },
        error: () => this.showError('Erro ao atualizar Pessoa Jurídica'),
      });
    }
  }

  remover(id: string) {
    this.pessoaService.delete(Number(id)).subscribe({
      next: () => {
        this.pessoas = this.pessoas.filter(p => p.id!.toString() !== id);
        this.showSuccess('Pessoa Jurídica removida!');
      },
      error: () => this.showError('Erro ao remover Pessoa Jurídica'),
    });
  }

  isEditing() {
    return this.editingId !== null;
  }

  private showSuccess(detail: string) {
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail });
  }

  private showError(detail: string) {
    this.messageService.add({ severity: 'error', summary: 'Erro', detail });
  }
}

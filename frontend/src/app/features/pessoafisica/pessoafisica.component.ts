// src/app/features/pessoafisica/pessoafisica.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PessoaFisica } from '../../core/models/pessoafisica.model';

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
import { PessoaFisicaService } from '../../core/services/pessoafisica/pessoafisica.service';

@Component({
  selector: 'app-pessoafisica',
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
  templateUrl: './pessoafisica.component.html',
  styleUrls: ['./pessoafisica.component.css'],
})
export class PessoaFisicaComponent implements OnInit {
  pessoas: PessoaFisica[] = [];
  enderecos: Endereco[] = [];

  dialogVisible = false;
  editingId: string | null = null;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pessoaService: PessoaFisicaService,
    private enderecoService: EnderecosService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      enderecoId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadPessoas();
    this.loadEnderecos();
  }

  loadPessoas() {
    this.pessoaService.getAll().subscribe({
      next: res => (this.pessoas = res),
      error: () => this.showError('Erro ao carregar pessoas físicas'),
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

  editarPessoa(pessoa: PessoaFisica) {
    this.editingId = pessoa.id!;
    this.form.patchValue({
      nome: pessoa.nome,
      cpf: pessoa.cpf,
      dataNascimento: pessoa.dataNascimento.substring(0, 10),
      enderecoId: pessoa.enderecoId,
    });
    this.dialogVisible = true;
  }

  salvar() {
    if (this.form.invalid) return;

    const payload: PessoaFisica = {
      ...this.form.value,
      id: this.editingId ?? undefined,
    };

    if (!this.editingId) {
      this.pessoaService.create(payload).subscribe({
        next: () => {
          this.dialogVisible = false;
          this.loadPessoas();
          this.showSuccess('Pessoa Física criada com sucesso!');
        },
        error: () => this.showError('Erro ao criar Pessoa Física'),
      });
    } else {
      this.pessoaService.update(payload).subscribe({
        next: () => {
          this.dialogVisible = false;
          this.loadPessoas();
          this.showSuccess('Pessoa Física atualizada!');
        },
        error: () => this.showError('Erro ao atualizar Pessoa Física'),
      });
    }
  }

  remover(id: string) {
    this.pessoaService.delete(id).subscribe({
      next: () => {
        this.pessoas = this.pessoas.filter(p => p.id !== id);
        this.showSuccess('Pessoa Física removida!');
      },
      error: () => this.showError('Erro ao remover Pessoa Física'),
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

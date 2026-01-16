import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EnderecosService } from '../../core/services/enderecos/enderecos.service';
import { Endereco } from '../../core/models/endereco.model';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

// PrimeNG imports
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-enderecos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    PaginatorModule,
    RippleModule,
    ToastModule,
    ProgressSpinnerModule,
  ],
  providers: [MessageService],
  templateUrl: './enderecos.component.html',
  styleUrls: ['./enderecos.component.css'],
})
export class EnderecosComponent implements OnInit {
  enderecos: Endereco[] = [];
  dialogVisible = false;
  editingId: number | null = null;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: EnderecosService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      cep: ['', Validators.required],
      logradouro: ['', Validators.required],
      bairro: ['', Validators.required],
      localidade: ['', Validators.required],
      uf: ['', Validators.required],
      complemento: [''],
    });
  }

  ngOnInit() {
    this.loadEnderecos();
  }

  loadEnderecos() {
    this.service.getAll().subscribe({
      next: (res: Endereco[]) => {
        this.enderecos = (res || []).filter((e): e is Endereco => !!e && e.id != null);
      },
      error: () => this.showError('Erro ao carregar endereços'),
    });
  }

  novoEndereco() {
    this.editingId = null;
    this.form.reset();
    this.dialogVisible = true;
  }

  editarEndereco(endereco: Endereco) {
    this.editingId = endereco.id!;
    this.form.setValue({
      cep: endereco.cep,
      logradouro: endereco.logradouro,
      bairro: endereco.bairro,
      localidade: endereco.localidade,
      uf: endereco.uf,
      complemento: endereco.complemento || '',
    });
    this.dialogVisible = true;
  }

  save() {
    if (this.form.invalid) return;

    const value = this.form.value as Omit<Endereco, 'id'>;

    if (this.editingId === null) {
      this.service.create(value).subscribe({
        next: (res: Endereco | null) => {
          if (res && res.id != null) this.enderecos.push(res);
          this.dialogVisible = false;
          this.showSuccess('Endereço criado!');
        },
        error: () => this.showError('Erro ao criar endereço'),
      });
    } else {
      const updated: Endereco = { ...value, id: this.editingId };
      this.service.update(updated).subscribe({
        next: (res: Endereco | null) => {
          const enderecoFinal = res?.id != null ? res : updated;
          this.enderecos = this.enderecos.map(e => (e.id === enderecoFinal.id ? enderecoFinal : e));
          this.dialogVisible = false;
          this.showSuccess('Endereço atualizado!');
        },
        error: () => this.showError('Erro ao atualizar endereço'),
      });
    }
  }

  remover(id: number) {
    this.service.delete(id).subscribe({
      next: () => {
        this.enderecos = this.enderecos.filter(e => e.id !== id);
        this.showSuccess('Endereço removido!');
      },
      error: () => this.showError('Erro ao remover endereço'),
    });
  }

  // 🔹 Nova função para buscar CEP
  loading: boolean = false;

  buscarCep() {
    const cep = this.form.value.cep?.replace(/\D/g, '');
    if (!cep) return;

    this.loading = true;

    this.service.getByCep(cep).subscribe({
      next: (res: Endereco) => {
        if (!res || !res.logradouro) {
          // Mostra mensagem visível para o usuário
          this.messageService.add({
            severity: 'warn',            // nível de aviso
            summary: 'CEP não encontrado', // título da mensagem
            detail: 'O CEP informado não existe. Verifique e tente novamente.', // descrição
            life: 5000                   // tempo em milissegundos que a mensagem fica visível
          });
          return;
        }

        // Preenche o formulário se o CEP existe
        this.form.patchValue({
          logradouro: res.logradouro,
          bairro: res.bairro,
          localidade: res.localidade,
          uf: res.uf,
          complemento: res.complemento,
        });

        // Mensagem de sucesso
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'CEP preenchido com sucesso!',
          life: 3000
        });
        this.loading = false;
      },
      error: () => {
        // Caso a API retorne erro (CEP inválido ou não encontrado)
        this.loading = false;
        this.messageService.add({
          severity: 'warn',
          summary: 'CEP não encontrado',
          detail: 'O CEP informado não existe. Verifique e tente novamente.',
          life: 5000
        });
      },
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

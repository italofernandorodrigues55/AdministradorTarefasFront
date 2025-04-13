import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TarefaService } from '../../services/tarefa.service';
import Modal from 'bootstrap/js/dist/modal';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  tarefas: any[] = [];
  modoEdicao: boolean = false;
  tarefaSelecionada: any = null;
  statusSelecionado: string = 'Todos';
  loading: boolean = false;

  novaTarefa = {
    nome: '',
    descricao: '',
    responsavel: ''
  };

  constructor(private tarefaService: TarefaService) { }

  ngOnInit(): void {
    this.getTarefasPorStatus(this.statusSelecionado);
  }

  getTarefasPorStatus(status: string): void {
    this.loading = true;
    this.tarefaService.getTodasPorStatus(status).subscribe({
      next: response => {
        if (response.success) {
          this.tarefas = response.data;
        } else {
          console.warn('Resposta inválida', response);
        }
        this.loading = false;
      },
      error: error => {
        console.error(`Erro ao buscar tarefas com status ${status}`, error);
        this.loading = false;
      }
    });
  }

  filtrarPorStatus(): void {
    this.getTarefasPorStatus(this.statusSelecionado);
  }

  getStatusLabel(status: number): string {
    switch (status) {
      case 1: return 'Novo';
      case 2: return 'Ativo';
      case 3: return 'Pendente';
      case 4: return 'Concluído';
      default: return 'Desconhecido';
    }
  }

  formatTextMaxLength(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }

  salvarTarefa(form: any): void {
    if (!form.valid) {
      Object.values(form.controls).forEach((control: any) => control.markAsTouched());
      return;
    }

    const tarefa = this.modoEdicao ? this.tarefaSelecionada : this.novaTarefa;

    if (tarefa.status) {
      tarefa.status = Number(tarefa.status);
    }

    this.loading = true;

    const finalizar = () => {
      const modalElement = document.getElementById('modalCriarTarefa');
      if (modalElement) {
        const modal = Modal.getOrCreateInstance(modalElement);
        modal.hide();
        document.body.classList.remove('modal-open');
        document.querySelectorAll('.modal-backdrop').forEach(b => b.remove());
      }

      this.getTarefasPorStatus(this.statusSelecionado);
      this.modoEdicao = false;
      this.novaTarefa = { nome: '', descricao: '', responsavel: '' };
      this.tarefaSelecionada = null;
      this.loading = false;
    };

    if (this.modoEdicao && tarefa.id) {
      this.tarefaService.atualizar(tarefa).subscribe({
        next: () => finalizar(),
        error: err => {
          console.error('Erro ao atualizar tarefa:', err);
          alert('Erro ao atualizar a tarefa.');
          this.loading = false;
        }
      });
    } else {
      this.tarefaService.criar(tarefa).subscribe({
        next: response => {
          if (response.success) {
            finalizar();
          } else {
            alert('Erro: ' + response.message);
            this.loading = false;
          }
        },
        error: err => {
          console.error('Erro ao salvar tarefa:', err);
          alert('Erro ao salvar a tarefa.');
          this.loading = false;
        }
      });
    }
  }

  editarTarefa(id: number): void {
    this.modoEdicao = true;
    this.loading = true;

    this.tarefaService.getPorId(id).subscribe({
      next: response => {
        if (response.success) {
          this.tarefaSelecionada = {
            ...response.data,
            status: Number(response.data.status)
          };

          const modalEl = document.getElementById('modalCriarTarefa');
          if (modalEl) {
            const modal = Modal.getOrCreateInstance(modalEl);
            modal.show();
          }
        } else {
          alert('Erro ao buscar tarefa.');
        }
        this.loading = false;
      },
      error: error => {
        console.error('Erro ao buscar tarefa por ID:', error);
        alert('Erro ao carregar os dados da tarefa.');
        this.loading = false;
      }
    });
  }

  confirmarExclusao(): void {
    const modalEl = document.getElementById('modalConfirmarExclusao');
    if (modalEl) {
      const modal = Modal.getOrCreateInstance(modalEl);
      modal.show();
    }
  }

  excluirConfirmado(): void {
    if (!this.tarefaSelecionada?.id) return;

    this.loading = true;

    this.tarefaService.excluir(this.tarefaSelecionada.id).subscribe({
      next: () => {
        this.getTarefasPorStatus(this.statusSelecionado);

        const excluirModalEl = document.getElementById('modalConfirmarExclusao');
        if (excluirModalEl) {
          const modal = Modal.getOrCreateInstance(excluirModalEl);
          modal.hide();
        }

        const editarModalEl = document.getElementById('modalCriarTarefa');
        if (editarModalEl) {
          const modal = Modal.getOrCreateInstance(editarModalEl);
          modal.hide();
          document.body.classList.remove('modal-open');
          document.querySelectorAll('.modal-backdrop').forEach(b => b.remove());
        }

        this.modoEdicao = false;
        this.tarefaSelecionada = null;
        this.loading = false;
      },
      error: err => {
        console.error('Erro ao excluir tarefa:', err);
        alert('Erro ao excluir a tarefa.');
        this.loading = false;
      }
    });
  }

  abrirCriacaoTarefa(): void {
    this.modoEdicao = false;
    this.novaTarefa = { nome: '', descricao: '', responsavel: '' };

    const modalEl = document.getElementById('modalCriarTarefa');
    if (modalEl) {
      const modal = Modal.getOrCreateInstance(modalEl);
      modal.show();
    }
  }

  get tarefaModel() {
    return this.modoEdicao ? this.tarefaSelecionada : this.novaTarefa;
  }
}
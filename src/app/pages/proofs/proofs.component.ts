import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Proof } from 'src/app/models/proof-response';
import { SupervisorService } from 'src/app/services/supervisor.service';

@Component({
  selector: 'app-proofs',
  templateUrl: './proofs.component.html',
  styleUrls: ['./proofs.component.css'],
})
export class ProofsComponent implements OnInit {
  proofs: Proof[] = [];

  constructor(
    private supervisorService: SupervisorService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadProofs();
  }

  onDeleteProof(proof: Proof) {
    const confirmDelete = window.confirm(
      'Do you really want to delete this proof?'
    );
    if (confirmDelete) {
      this.supervisorService.deleteProof(proof).subscribe(
        (data) => {
          this.toastr.success('Deleted the proof successfully');
          this.loadProofs();
        },
        (error) => {
          this.toastr.success('Deleted the proof successfully');
          this.loadProofs();
        }
      );
    }
  }

  loadProofs() {
    this.supervisorService
      .loadProofs()
      .subscribe((result) => (this.proofs = result));
  }
}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

// Define an interface for the data expected by this dialog
export interface ConfirmDialogData {
  title: string;
  message: string;
  details?: string; // Optional field for additional details/context
  confirmText?: string; // Optional override for confirm button text
  cancelText?: string; // Optional override for cancel button text
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  standalone: false
})
export class ConfirmDialogComponent {
  // Set default button texts
  confirmButtonText: string;
  cancelButtonText: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    // Inject the data using the interface
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {
    // Use provided text or defaults
    this.confirmButtonText = data.confirmText || 'Confirm';
    this.cancelButtonText = data.cancelText || 'Cancel';
  }

  onConfirm(): void {
    // Close the dialog, return true to indicate confirmation
    this.dialogRef.close(true);
  }

  onCancel(): void {
    // Close the dialog, return false or nothing to indicate cancellation
    this.dialogRef.close(false);
  }
}

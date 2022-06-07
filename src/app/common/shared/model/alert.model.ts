
export type AlertType = 'success' | 'danger' | 'warning' | 'info';

export interface Alert {
    id?: number;
    type: AlertType;
    message?: string;
    timeout?: number;
    toast?: boolean;
    position?: string;
    close?: (alerts: Alert[]) => void;
  }
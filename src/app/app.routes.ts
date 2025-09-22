import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DmnEditorComponent } from './dmn-editor/dmn-editor.component';
import { BpmnEditorComponent } from './bpmn-editor/bpmn-editor.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dmn', component: DmnEditorComponent },
  { path: 'bpmn', component: BpmnEditorComponent },
  { path: '**', redirectTo: '' }
];

import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dmn-editor',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="editor-container">
      <div class="editor-header">
        <h2>DMN Editor</h2>
        <p>Decision Model and Notation Editor</p>
        <div class="editor-controls">
          <input
            #fileInput
            type="file"
            accept=".dmn"
            (change)="onFileSelected($event)"
            style="display: none"
          />
          <button class="load-button" (click)="fileInput.click()">
            📁 Load DMN File
          </button>
          <span class="file-name" *ngIf="loadedFileName">{{ loadedFileName }}</span>
        </div>
      </div>
      <div class="editor-wrapper">
        <div #dmnContainer class="dmn-editor" id="dmn-editor-container"></div>
      </div>
      <div class="editor-footer">
        <p class="editor-info">
          Create decision tables, decision requirements diagrams, and business knowledge models using the DMN standard.
        </p>
      </div>
    </div>
  `,
  styles: [`
    .editor-container {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .editor-header {
      background: #f8f9fa;
      padding: 1.5rem;
      border-bottom: 1px solid #e9ecef;
      text-align: center;
    }

    .editor-header h2 {
      margin: 0 0 0.5rem 0;
      color: #2c3e50;
      font-size: 1.8rem;
    }

    .editor-header p {
      margin: 0 0 1rem 0;
      color: #6c757d;
      font-size: 1rem;
    }

    .editor-controls {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      margin-top: 1rem;
    }

    .load-button {
      background: #3498db;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .load-button:hover {
      background: #2980b9;
    }

    .load-button:active {
      background: #21618c;
    }

    .file-name {
      color: #27ae60;
      font-weight: 500;
      font-size: 0.9rem;
    }

    .editor-wrapper {
      flex: 1;
      padding: 1rem;
      background: #ffffff;
    }

    .dmn-editor {
      width: 100%;
      height: 600px;
      border: 2px solid #e9ecef;
      border-radius: 8px;
      background: #fafafa;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      color: #6c757d;
      position: relative;
    }

    .dmn-editor::before {
      content: "DMN Editor will load here...";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
    }

    .editor-footer {
      background: #f8f9fa;
      padding: 1rem 1.5rem;
      border-top: 1px solid #e9ecef;
    }

    .editor-info {
      margin: 0;
      color: #6c757d;
      font-size: 0.9rem;
      text-align: center;
    }

    @media (max-width: 768px) {
      .editor-wrapper {
        padding: 0.5rem;
      }

      .dmn-editor {
        height: 500px;
      }

      .editor-header {
        padding: 1rem;
      }

      .editor-header h2 {
        font-size: 1.5rem;
      }
    }
  `]
})
export class DmnEditorComponent implements OnInit, OnDestroy {
  @ViewChild('dmnContainer', { static: true }) dmnContainer!: ElementRef;
  private editor: any;
  protected loadedFileName: string = '';
  private fileContent: string = '';

  async ngOnInit() {
    await this.initializeEditor('');
  }

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.loadedFileName = file.name;

      try {
        this.fileContent = await this.readFileContent(file);
        console.log('File loaded successfully:', file.name);
        
        await this.reinitializeEditor(this.fileContent);
      } catch (error) {
        console.error('Error reading file:', error);
        alert(`Failed to load file: ${error}`);
        this.loadedFileName = '';
      }
    }
  }

  private readFileContent(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        resolve(content);
      };
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      reader.readAsText(file);
    });
  }

  private async initializeEditor(content: string) {
    try {
      const DmnEditor = await import('@kie-tools/kie-editors-standalone/dist/dmn');
      
      this.editor = await DmnEditor.open({
        container: this.dmnContainer.nativeElement,
        initialContent: Promise.resolve(content),
        readOnly: false,
        resources: new Map([])
      });

      console.log('DMN Editor initialized successfully with readOnly: false');
    } catch (error) {
      console.error('Failed to initialize DMN Editor:', error);
      this.dmnContainer.nativeElement.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: #dc3545;">
          <h3>Failed to load DMN Editor</h3>
          <p>Error: ${error}</p>
          <p>Please check the console for more details.</p>
        </div>
      `;
    }
  }

  private async reinitializeEditor(content: string) {
    if (this.editor) {
      try {
        await this.editor.close();
      } catch (error) {
        console.error('Error closing existing editor:', error);
      }
    }
    
    this.dmnContainer.nativeElement.innerHTML = '';
    await this.initializeEditor(content);
  }

  ngOnDestroy() {
    if (this.editor) {
      try {
        this.editor.close();
        console.log('DMN Editor closed successfully');
      } catch (error) {
        console.error('Error closing DMN Editor:', error);
      }
    }
  }
}

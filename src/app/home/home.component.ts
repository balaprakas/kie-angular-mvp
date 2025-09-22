import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="home-container">
      <div class="hero-section">
        <h1>KIE Editors MVP</h1>
        <p class="hero-description">
          A powerful Angular application integrating KIE Standalone Editors for creating 
          business process models (BPMN) and decision models (DMN).
        </p>
      </div>

      <div class="editors-grid">
        <div class="editor-card">
          <div class="editor-icon">📊</div>
          <h2>DMN Editor</h2>
          <p>
            Create and edit Decision Model and Notation (DMN) models. 
            Design decision tables, decision requirements diagrams, and business knowledge models.
          </p>
          <a routerLink="/dmn" class="editor-button">Open DMN Editor</a>
        </div>

        <div class="editor-card">
          <div class="editor-icon">🔄</div>
          <h2>BPMN Editor</h2>
          <p>
            Design Business Process Model and Notation (BPMN) diagrams. 
            Create workflows, process flows, and business process models.
          </p>
          <a routerLink="/bpmn" class="editor-button">Open BPMN Editor</a>
        </div>
      </div>

      <div class="features-section">
        <h2>Features</h2>
        <div class="features-list">
          <div class="feature-item">
            <span class="feature-icon">✨</span>
            <span>Standalone KIE Editors integration</span>
          </div>
          <div class="feature-item">
            <span class="feature-icon">🚀</span>
            <span>Modern Angular application</span>
          </div>
          <div class="feature-item">
            <span class="feature-icon">📱</span>
            <span>Responsive design</span>
          </div>
          <div class="feature-item">
            <span class="feature-icon">⚡</span>
            <span>Fast and efficient</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 2rem;
    }

    .hero-section {
      text-align: center;
      margin-bottom: 4rem;
    }

    .hero-section h1 {
      font-size: 3rem;
      color: #2c3e50;
      margin-bottom: 1rem;
      font-weight: 700;
    }

    .hero-description {
      font-size: 1.2rem;
      color: #7f8c8d;
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }

    .editors-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-bottom: 4rem;
    }

    .editor-card {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      text-align: center;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .editor-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }

    .editor-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
      display: block;
    }

    .editor-card h2 {
      color: #2c3e50;
      margin-bottom: 1rem;
      font-size: 1.5rem;
    }

    .editor-card p {
      color: #7f8c8d;
      margin-bottom: 2rem;
      line-height: 1.6;
    }

    .editor-button {
      display: inline-block;
      background: #3498db;
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
      transition: background-color 0.3s ease;
    }

    .editor-button:hover {
      background: #2980b9;
    }

    .features-section {
      text-align: center;
    }

    .features-section h2 {
      color: #2c3e50;
      margin-bottom: 2rem;
      font-size: 2rem;
    }

    .features-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
    }

    .feature-item {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 8px;
      font-weight: 500;
      color: #2c3e50;
    }

    .feature-icon {
      font-size: 1.2rem;
    }

    @media (max-width: 768px) {
      .home-container {
        padding: 1rem;
      }

      .hero-section h1 {
        font-size: 2rem;
      }

      .hero-description {
        font-size: 1rem;
      }

      .editors-grid {
        grid-template-columns: 1fr;
      }

      .features-list {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomeComponent {}

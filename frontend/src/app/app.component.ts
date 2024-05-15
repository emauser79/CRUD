import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  selectedImage: File | null = null;
  profileImageUrl: string | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Recupera l'URL dell'immagine del profilo all'avvio del componente
    this.fetchProfileImageFromStorage();
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  uploadImage() {
    if (this.selectedImage) {
      const formData = new FormData();
      formData.append('image', this.selectedImage);

      this.http.post<any>('http://localhost:8000/api/upload', formData).subscribe(
        response => {
          console.log('Immagine caricata con successo:', response);
          const imageUrl = response.imageUrl; // Assumi che l'API restituisca l'URL dell'immagine
          this.profileImageUrl = imageUrl;
          this.updateProfileImageInStorage(imageUrl); // Salva l'URL dell'immagine del profilo nel localStorage
        },
        error => {
          console.error('Errore durante il caricamento dell\'immagine:', error);
          // Qui puoi gestire gli errori, ad esempio, mostrare un messaggio di errore all'utente
        }
      );
    }
  }

  fetchProfileImageFromStorage() {
    const imageUrl = localStorage.getItem('profileImageUrl'); // Recupera l'URL dell'immagine del profilo dal localStorage
    if (imageUrl) {
      this.profileImageUrl = imageUrl;
    } else {
      this.fetchProfileImage();
    }
  }

  fetchProfileImage() {
    // Recupera l'URL dell'immagine del profilo dal server
    this.http.get<any>('http://localhost:8000/api/profile/image').subscribe(
      response => {
        console.log('Immagine del profilo recuperata con successo:', response);
        const imageUrl = response.imageUrl; // Assumi che l'API restituisca l'URL dell'immagine del profilo
        this.profileImageUrl = imageUrl;
        this.saveProfileImageToStorage(imageUrl); // Salva l'URL dell'immagine del profilo nel localStorage
      },
      error => {
        console.error('Errore durante il recupero dell\'immagine del profilo:', error);
        // Qui puoi gestire gli errori, ad esempio, mostrare un messaggio di errore all'utente
      }
    );
  }

  saveProfileImageToStorage(imageUrl: string) {
    localStorage.setItem('profileImageUrl', imageUrl); // Salva l'URL dell'immagine del profilo nel localStorage
  }

  updateProfileImageInStorage(imageUrl: string) {
    localStorage.setItem('profileImageUrl', imageUrl); // Aggiorna l'URL dell'immagine del profilo nel localStorage
  }
}

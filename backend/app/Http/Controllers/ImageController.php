<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\GenericImage; // Assicurati di importare il modello corretto
use Auth;

class ImageController extends Controller
{
    public function uploadImage(Request $request)
{
    // Validazione del tipo di file
    $validator = Validator::make($request->all(), [
        'image' => 'required|image|mimes:jpeg,png|max:2048', // Max 2MB
    ]);

    if ($validator->fails()) {
        return response()->json(['error' => $validator->errors()], 400);
    }

    // Continua con il processo di caricamento

    // Gestione del caricamento effettivo e aggiornamento nel database
    if ($request->hasFile('image')) {
        // Ottieni il file dell'immagine
        $image = $request->file('image');
        if ($image->isValid()) {
            // Salva l'immagine nella cartella pubblica
            $path = $image->store('images', 'public');

            // Recupera l'ultima immagine caricata
            $latestImage = GenericImage::latest()->first();

            // Se esiste un'immagine precedente, aggiorna il percorso dell'immagine
            if ($latestImage) {
                // Aggiorna il percorso dell'immagine
                $latestImage->image_path = $path;
                $latestImage->save();
            } else {
                // Se non esiste un'immagine precedente, crea un nuovo record nel database
                $newImage = new GenericImage();
                $newImage->image_path = $path;
                $newImage->save();
            }

            // Genera l'URL dell'immagine
            $imageUrl = asset('storage/' . $path);

            return response()->json(['imageUrl' => $imageUrl], 200);
        } else {
            return response()->json(['error' => 'Errore durante il caricamento dell\'immagine'], 500);
        }
    }
}
}

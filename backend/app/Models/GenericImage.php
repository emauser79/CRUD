<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class GenericImage extends Model
{
    use HasFactory;
    protected $fillable = ['image_path'];

    /**
     * Definizione della relazione con l'utente che ha caricato l'immagine.
     */
    
}

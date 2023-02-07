Retour à la base de [Documention de l'API](readme.md)

# Licences
Présentement utilisé seulement dans les licences médias.
Implémenté dans le domaine StaticContent.

Présentement les données sont entré et fetch directement dans un json.

## GET `/static/licences`
Route publique qui renvoie toutes les licences enregistrées.

### Retour si tout a fonctionné

Code : **200** : lorsque les informations sont OK

```json
{
    "error": false,
    "code": 200,
    "errors": [],
    "message": "OK",
    "data": {
        "[slug de la licence]": {
            "name": "[Nom de la licence]",
            "label": "[Nom plus lisible pour la licence]",
            "simpleSlug": "[slug basic utilisé par creative common dans leur url]",
            "slug": "[Utiliser le slug de la licence et non cette prop] to deprecate]",
            "version": "[Version de la licence chez Creative common]",
            "description":"[texte de description de la licence]",
            "guide": "[Simplification du légal en mode : comment ça s'applique]",
            "source": "[URL] Source de la licence",
            "legal-source": "[URL] Du texte légal",
            "undernote": "Texte à ajouter en dessous des images relié à cette licence.",
            "image": "[URL][Vers une image] Image de la licence",
            "language": "[fr]"
        }
    }
}
```

### Retour si /static/[slug] ne fonctionne pas

Code : **404** : Lors que le contenu n'est pas trouvé

```json
{
    "error": true,
    "code": 404,
    "errors": [],
    "message": "Not found",
    "data": {}
}
```


## GET `/static/licence/[slug]`
Route publique qui renvoie la licence associé à ce slug

### Retour si tout a fonctionné

Code : **200** : lorsque les informations sont OK

```json
{
    "error": false,
    "code": 200,
    "errors": [],
    "message": "OK",
    "data": {
        "name": "[Nom de la licence]",
        "label": "[Nom plus lisible pour la licence]",
        "simpleSlug": "[slug basic utilisé par creative common dans leur url]",
        "slug": "[Utiliser le slug de la licence et non cette prop] to deprecate]",
        "version": "[Version de la licence chez Creative common]",
        "description":"[texte de description de la licence]",
        "guide": "[Simplification du légal en mode : comment ça s'applique]",
        "source": "[URL] Source de la licence",
        "legal-source": "[URL] Du texte légal",
        "undernote": "Texte à ajouter en dessous des images relié à cette licence.",
        "image": "[URL][Vers une image] Image de la licence",
        "language": "[fr]"
    }
}
```

### Retour si le slug n'existe pas

Code : **404** : Lors que le contenu n'est pas trouvé

```json
{
    "error": true,
    "code": 404,
    "errors": [],
    "message": "Not found",
    "data": {}
}
```
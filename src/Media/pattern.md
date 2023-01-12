## Document de dev pour partager et prendre des notes.

### Middleware (Multer)

Multer prend le fichier binaire dans le champ et ajoute une valeur à Request.file.
J'ai ajusté notre type Rquest pour l'ajouter.

Les paramètres que file contient :

#### File params information

Each file contains the following information:

| Key            | Description | Note|
|----------------| --- | --- |
 | `fieldname`    | Field name specified in the form |
 | `originalname` | Name of the file on the user's computer |
 | `encoding`     | Encoding type of the file |
 | `mimetype`     | Mime type of the file |
 | `size`         | Size of the file in bytes |
 | `destination`  | The folder to which the file has been saved | `DiskStorage` |
 | `filename`     | The name of the file within the `destination` | `DiskStorage` |
 | `path`         | The full path to the uploaded file | `DiskStorage` |
 | `buffer`       | A `Buffer` of the entire file | `MemoryStorage` |
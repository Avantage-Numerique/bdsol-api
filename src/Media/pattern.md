## Document de dev pour partager et prendre des notes.

### Middleware (Multer)

Multer prend le fichier binaire dans le champ et ajoute une valeur à Request.file.
J'ai ajusté notre type Request pour l'ajouter.

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



## Recherche
https://stackoverflow.com/questions/60408575/how-to-validate-file-extension-with-multer-middleware
Pour faire un filetype validator sur l'API.

NIce je ne connaissait pas : `fileFilter`

```typescript
const upload = multer({
  storage: multer.diskStorage({
    destination: 'public/uploads/',
    filename: (req, file, cb) => {
      const name = slugify(file.originalname, { lower: true })
      cb(null, `${new Date().getTime()}-${name}`)
    },
  }),
  fileFilter: (req, file, cb) => {
    if (!whitelist.includes(file.mimetype)) {
      return cb(new Error('file is not allowed'))
    }

    cb(null, true)
  }
})
```

```typescript
const storage = multer.diskStorage({
    destination: './uploadedContent',
    filename: function(_req, file, cb){
      
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    } 
  });
var upload = multer({
    storage: storage,
    limits: {
        fields: 5,
        fieldNameSize: 50, // TODO: Check if this size is enough
        fieldSize: 20000, //TODO: Check if this size is enough
        // TODO: Change this line after compression
        fileSize: 15000000, // 150 KB for a 1080x1080 JPG 90
    },
    fileFilter: function(_req, file, cb){
        checkFileType(file, cb);
    }
}).single('postPicture');
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}
```
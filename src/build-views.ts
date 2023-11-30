// copy-nunjucks.ts
import * as fs from 'fs';
import * as path from 'path';

function cp(src: string, dest: string) {
    // Create destination directory if it doesn't exist
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
    }

    // Read the source directory
    const files = fs.readdirSync(src);

    // Copy each file or directory
    files.forEach(file => {
        const srcPath = path.join(src, file);
        const destPath = path.join(dest, file);

        // Check if it's a file or directory
        if (fs.statSync(srcPath).isDirectory()) {
            cp(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    });
}


const sourceDir = './views';
const destDir = './build/views';
cp(sourceDir, destDir);
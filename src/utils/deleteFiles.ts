import fs from 'fs'
import path from 'path'

export function deleteFile(folderPath: string) {
  console.log('eliminando archivos')
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error('Error reading folder:', err)
      return
    }

    files.forEach(file => {
      const filePath = path.join(folderPath, file)

      fs.stat(filePath, (statErr, stats) => {
        if (statErr) {
          console.error(`Error getting file stats for ${file}:`, statErr)
          return
        }

        if (stats.isFile() && /\.(jpg|jpeg|png|gif|bmp|svg)$/.test(file)) {
          fs.unlink(filePath, unlinkErr => {
            if (unlinkErr) {
              console.error(`Error deleting ${file}:`, unlinkErr)
            }
          })
        }
      })
    })
  })
}

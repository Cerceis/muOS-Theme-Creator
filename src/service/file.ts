import JSZip from "jszip";
import { selectedTheme } from "@/service/theme";
import { TEXT_CREDIT, TEXT_SCHEME } from "@/service/text";

/**
 * Generate a zipped theme
 * file list:
 * 
 * credits.txt
 * - font
 * - image
 * - music
 * - scheme
 *     default.txt
 * - sound
 */
export const generateZipTheme = () => {
    try{
        const zip = new JSZip();
        const filename = selectedTheme.value.zipName;
        const rootFolder = zip.folder(filename);
        if(!rootFolder) throw "ERROR NULL";

        // Creates all neccesary folders
        const font = rootFolder.folder("font");
        const image = rootFolder.folder("image");
        const music = rootFolder.folder("music");
        const scheme = rootFolder.folder("scheme");
        const sound = rootFolder.folder("sound");
        if(!font || !image || !music || !scheme || !sound) throw "ERROR NULL";

        rootFolder.file("credits.txt", TEXT_CREDIT(selectedTheme.value.author));    
        scheme.file("default.txt", TEXT_SCHEME(selectedTheme.value.values));
        
        zip.generateAsync({type:"blob"})
        .then(function(content) {
            promptDownload(content, `${filename}.zip`)
        });
    }catch(err){
        console.log(err)
    }
}
/*
const img = zip.folder("images");
img.file("smile.gif", imgData, {base64: true});
*/
export const promptDownload = (fileData: Blob, filename: string) => {
    const blob = new Blob([fileData]);
    const elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename;        
    elem.target = "_blank";
    document.body.appendChild(elem);
    elem.click();        
    document.body.removeChild(elem);
}

/**
 * 
 * // Function to load and add user-uploaded image files to the zip folder
  function addUserImageFilesToZip(file, filename, folder) {
    return new Promise(function (resolve, reject) {
      if (file.size <= 4 * 1024 * 1024) { // Check if file size is less than or equal to 4MB
        var reader = new FileReader();
        reader.onload = function (event) {
          folder.file(filename, event.target.result, { binary: true });
          resolve();
        };
        reader.readAsArrayBuffer(file);
      } else {
        var errorMessage = "File '" + file.name + "' uploaded for '" + filename + "' exceeds 4MB limit.";
        reject(errorMessage);
        displayErrorMessage(errorMessage);
      }
    });
  }

  // Function to load a font file
  function loadFontsFile(url) {
    if (!url) {
      return Promise.reject("Font URL is undefined.");
    }
  
    return fetch(url)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .catch(function (error) {
        console.error("Error loading font file:", error);
        displayErrorMessage('Error loading font file: ' + error.message);
        throw error; // Propagate the error to the next catch block
      });
  }

  // Function to load and add user-uploaded font files to the zip folder
  function addUserFontFilesToZip(file, filename, folder) {
    return new Promise(function (resolve, reject) {
      if (file.size <= 200 * 1024) {
        var reader = new FileReader();
        reader.onload = function (event) {
          if (folder) {
            // Do not include "font/" in the file path
            folder.file(filename, event.target.result, { binary: true });
            resolve();
          } else {
            reject(new Error("Folder is not defined."));
          }
        };
        reader.readAsArrayBuffer(file);
      } else {
        var errorMessage = "File '" + file.name + "' uploaded for '" + filename + "' exceeds 200KB limit.";
        reject(errorMessage);
        displayErrorMessage(errorMessage);
      }
    });
  }
  // Function to load and add user-uploaded sound files to the zip folder
  function addUserSoundFilesToZip(file, filename, folder) {
    return new Promise(function (resolve, reject) {
      if (file.size <= 200 * 1024) { // Check if file size is less than or equal to 200KB
        var reader = new FileReader();
        reader.onload = function (event) {
          folder.file(filename, event.target.result, { binary: true });
          resolve();
        };
        reader.readAsArrayBuffer(file);
      } else {
        var errorMessage = "File '" + file.name + "' uploaded for '" + filename + "' exceeds 200KB limit.";
        reject(errorMessage);
        displayErrorMessage(errorMessage);
      }
    });
  }

  // Function to load and add user-uploaded sound files to the zip folder
  function addUserMusicFilesToZip(file, filename, folder) {
    return new Promise(function (resolve, reject) {
      if (file.size <= 2 * 1024 * 1024) { // Check if file size is less than or equal to 2MB
        var reader = new FileReader();
        reader.onload = function (event) {
          folder.file(filename, event.target.result, { binary: true });
          resolve();
        };
        reader.readAsArrayBuffer(file);
      } else {
        var errorMessage = "File '" + file.name + "' uploaded for '" + filename + "' exceeds 200KB limit.";
        reject(errorMessage);
        displayErrorMessage(errorMessage);
      }
    });
  }
 */
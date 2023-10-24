const URL = Java.type("java.net.URL")
const InputStreamReader = Java.type("java.io.InputStreamReader")
const FileOutputStream = Java.type("java.io.FileOutputStream")
const BufferedInputStream = Java.type("java.io.BufferedInputStream")
const System = Java.type('java.lang.System')
const JavaArray = Java.type("java.lang.reflect.Array")
const Byte = Java.type('java.lang.Byte')
const File = Java.type("java.io.File")
const ZipInputStream = Java.type("java.util.zip.ZipInputStream")
const Files = Java.type("java.nio.file.Files")
const Paths = Java.type("java.nio.file.Paths")
const BufferedOutputStream = Java.type("java.io.BufferedOutputStream")
const StandardCopyOption = Java.type('java.nio.file.StandardCopyOption')

function httpGet(url) {
    const connection = new URL(url).openConnection()
    connection.setRequestMethod("GET")
    connection.setRequestProperty("User-Agent", "ChatTriggers-Module-Updater")
    const reader = new InputStreamReader(connection.getInputStream())
    const result = []
    let i
    while ((i = reader.read()) !== -1)
        result.push(String.fromCharCode(i))
    return result.join("")
}

function getLatestSHA() {
    const repoInfo = JSON.parse(httpGet("https://api.github.com/repos/OmniscientARK/ConspicuousUtilities/commits/master"));
    return repoInfo.sha;
}

function downloadFileFromURL(downloadURL, savePath) {
    let input = null;
    let output = null;
    try {
        const url = new URL(downloadURL);
        const connection = url.openConnection();
        connection.setRequestProperty("User-Agent", "Mozilla/5.0");
        input = new BufferedInputStream(connection.getInputStream());
        output = new FileOutputStream(savePath);
        let data = JavaArray.newInstance(Byte.TYPE, 1024);
        let count;
        while ((count = input.read(data)) !== -1)
            output.write(data, 0, count);
        return true;
    } catch (e) {
        console.log("Error downloading file: " + e);
        return false;
    } finally {
        try {
            if (input) input.close();
            if (output) output.close();
        } catch (e) {
            console.log("Error closing streams: " + e);
        }
    }
}

function moveDirectory(sourceDir, targetDir) {
    const source = new File(sourceDir);
    const target = new File(targetDir);

    if (!source.exists() || !source.isDirectory()) {
        console.log("Source directory does not exist or is not a directory: " + sourceDir);
        return;
    }

    if (!target.exists()) {
        target.mkdir();
    }

    const files = source.listFiles();

    // Process directories first
    for (let i = 0; i < files.length; i++) {
        if (files[i].isDirectory()) {
            const movedDir = new File(target.getPath(), files[i].getName());
            moveDirectory(files[i].getPath(), movedDir.getPath());
            files[i]['delete'](); // delete the directory once its contents have been moved
        }
    }

    // Process files
    for (let i = 0; i < files.length; i++) {
        if (files[i].isFile()) {
            const movedFile = new File(target.getPath(), files[i].getName());
            if (!movedFile.getParentFile().exists()) {
                movedFile.getParentFile().mkdirs(); // ensures parent directories exist
            }
            Files.move(files[i].toPath(), movedFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
        }
    }
}

function unzipAndReplace(zipFilePath, destDirPath) {
    const BUFFER_SIZE = 4096;
    let zipIn = null;
    try {
        const destDir = new File(destDirPath);
        if (!destDir.exists()) destDir.mkdir();
        const zipFile = new File(zipFilePath);
        zipIn = new ZipInputStream(new BufferedInputStream(Files.newInputStream(Paths.get(zipFile.toURI()))));
        let entry;
        while ((entry = zipIn.getNextEntry()) !== null) {
            let entryName = entry.getName();
            if (entryName.startsWith("ConspicuousUtilities-master/"))
                entryName = entryName.replace("ConspicuousUtilities-master/", "");
            if (entryName.endsWith(".gitignore") || entryName.startsWith(".idea/")) {
                console.log("Skipping file:", entryName)
                continue
            }
            const filePath = destDirPath + File.separator + entryName;
            if (!entry.isDirectory()) {
                console.log("Writing to file: " + filePath);

                if (filePath.endsWith("index.js") && entryName !== "index.js") {
                    console.error("Attempt to overwrite index.js with " + entryName);
                    continue;
                }

                const bos = new BufferedOutputStream(new FileOutputStream(filePath));
                const bytesIn = JavaArray.newInstance(Byte.TYPE, BUFFER_SIZE);
                let read;
                while ((read = zipIn.read(bytesIn)) !== -1) {
                    bos.write(bytesIn, 0, read);
                }
                bos.close();
            } else {
                const dir = new File(filePath);
                dir.mkdir();
            }
            zipIn.closeEntry();
        }

        const extractedFolderPath = destDirPath + File.separator + "ConspicuousUtilities-master";
        const extractedFolder = new File(extractedFolderPath);
        if (extractedFolder.exists() && extractedFolder.isDirectory()) {
            moveDirectory(extractedFolderPath, destDirPath + File.separator + "ConspicuousUtilities");
            extractedFolder['delete']();
        }
    } catch (e) {
        console.log("Error during unzip operation: " + e);
    } finally {
        if (zipIn) zipIn.close();
    }
}

function ensureDir(directoryPath) {
    const dir = new File(directoryPath);
    if (!dir.exists()) {
        dir.mkdirs();  // This will create directory along with any necessary parent directories
    }
}

function copyFile(sourcePath, destPath) {
    try {
        ensureDir(new File(destPath).getParent());
        Files.copy(Paths.get(sourcePath), Paths.get(destPath), java.nio.file.StandardCopyOption.REPLACE_EXISTING);
    } catch (e) {
        console.log("Error copying file: " + e);
    }
}

function copyDir(sourceDirectory, destDirectory) {
    try {
        Files.walk(Paths.get(sourceDirectory)).forEach(sourcePath => {
            try {
                const targetPath = Paths.get(destDirectory, sourcePath.subpath(Paths.get(sourceDirectory).getNameCount(), sourcePath.getNameCount()).toString());
                ensureDir(targetPath.getParent().toString());
                if (!Files.isDirectory(sourcePath)) {
                    Files.copy(sourcePath, targetPath, StandardCopyOption.REPLACE_EXISTING);
                }
            } catch (e) {
                console.log("Error copying directory: " + e);
            }
        });
    } catch (e) {
        console.log("Error walking through directory: " + e);
    }
}

export function backupAndReplaceModule() {
    unzipAndReplace(System.getenv("TEMP") + "/ConspicuousUtilities-auto-update.zip", Config.modulesFolder);

    FileLib.deleteDirectory(System.getenv("TEMP") + "/ConspicuousUtilities-auto-update.zip");

    ChatLib.chat("&aModule updated! Please reload ChatTriggers to see changes.");
}

export function setup() {
    if (!FileLib.exists("ConspicuousUtilities/data", "version.txt"))
        FileLib.write("ConspicuousUtilities/data", "version.txt", "null", true)
    const currentSHA = FileLib.read("ConspicuousUtilities/data", "version.txt")
    const latestSHA = getLatestSHA()
    console.log("Current version: ", currentSHA)
    console.log("Latest version: ", latestSHA)
    if (currentSHA !== latestSHA) {
        ChatLib.chat("&cYou are using an old version of ConspicuousUtilities... The module is going to be auto-updated.")
        if (!downloadFileFromURL("https://github.com/OmniscientARK/ConspicuousUtilities/archive/refs/heads/master.zip", System.getenv("TEMP") + "/ConspicuousUtilities-auto-update.zip"))
            return ChatLib.chat("&4An error occurred while downloading the new version. Try again later.")
        backupAndReplaceModule()
        FileLib.write("ConspicuousUtilities/data", "version.txt", latestSHA, true)
        ChatLib.command("ct reload", true)
    }
}

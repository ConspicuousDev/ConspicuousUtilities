const URL = Java.type("java.net.URL")
const InputStreamReader = Java.type("java.io.InputStreamReader")
const FileOutputStream = Java.type("java.io.FileOutputStream")
const BufferedInputStream = Java.type("java.io.BufferedInputStream")
const System = Java.type('java.lang.System')
const JavaArray = Java.type("java.lang.reflect.Array");
const Byte = Java.type('java.lang.Byte');
const File = Java.type("java.io.File");
const Files = Java.type("java.nio.file.Files");
const ZipInputStream = Java.type("java.util.zip.ZipInputStream");
const BufferedOutputStream = Java.type("java.io.BufferedOutputStream");
const FileInputStream = Java.type("java.io.FileInputStream");


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

function getLatestSHA() {
    const repoInfo = JSON.parse(httpGet("https://api.github.com/repos/OmniscientARK/ConspicuousUtilities/commits/master"));
    return repoInfo.sha;
}

export function setup() {
    if (!FileLib.exists("ConspicuousUtilities/data", "version"))
        FileLib.write("ConspicuousUtilities/data", "version.txt", "null", true)

    const currentSHA = FileLib.read("ConspicuousUtilities/data", "version.txt")
    const latestSHA = getLatestSHA()
    if (currentSHA !== latestSHA) {
        ChatLib.chat("&cYou are using an old version of ConspicuousUtilities... The module is going to be auto-updated.")
        if (!downloadFileFromURL("https://github.com/OmniscientARK/ConspicuousUtilities/archive/refs/heads/master.zip", System.getenv("TEMP") + "/ConspicuousUtilities-auto-update.zip"))
            return ChatLib.chat("&4An error occurred while auto updating. Try again later.")
        FileLib.write("ConspicuousUtilities/data", "version.txt", latestSHA, true)
        // replaceModuleFiles(System.getenv("TEMP") + "/ConspicuousUtilities-auto-update.zip", Config.modulesFolder + "\\ConspicuousUtilities");
    }
}

document.getElementById("copyButton").addEventListener("click", () => {
    const preTag = document.getElementById("myPreTag");
    const range = document.createRange();
    range.selectNode(preTag);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);

    try {
        document.execCommand("copy");
        alert("Code copied to clipboard!");
    } catch (err) {
        console.error("Unable to copy code:", err);
    } finally {
        window.getSelection().removeAllRanges();
    }
});
console.log(executed)






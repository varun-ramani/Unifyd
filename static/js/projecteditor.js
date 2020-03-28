var save;
var currentFile = "";

require.config({ paths: { 'vs': '../static/browserlib/monaco-editor/min/vs' }});
require(['vs/editor/editor.main'], function() {
    var editor = monaco.editor.create(document.getElementById('editorcontainer'), {
        value: "",
        language: 'C',
        "theme": "vs-dark"
    }); 

    save = () => {
        var data = editor.getValue();
    }
});
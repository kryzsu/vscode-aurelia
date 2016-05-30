'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "lotar-aurelia" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.createCustomElementClass', () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        var editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }

        let selection = editor.selection;
        let selectedText:string = editor.document.getText(selection);
        let parts:string[] = selectedText.split('-');
        
        parts = parts.map( item =>  item[0].toUpperCase() + item.slice(1) );

        editor.edit( (editBuilder: vscode.TextEditorEdit) => {
                editBuilder.replace( selection, 
                "import {customElement, bindable} from 'aurelia-framework'; \n\n\
@customElement('" + selectedText + "') \n\
export class "+ parts.join("") +"{ \n\
}" 
);
            }
            
        )

        let sbar:vscode.StatusBarItem = vscode.window.createStatusBarItem();
        sbar.text ='Done';
        sbar.show();

    });

let disposable2 = vscode.commands.registerCommand('extension.bindingProperty', () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        var editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }

        let selection = editor.selection;
        let selectedText:string = editor.document.getText(selection);
        let parts:string[] = selectedText.split('-');
        
        parts = parts.map( item =>  item[0].toUpperCase() + item.slice(1) );

        editor.edit( (editBuilder: vscode.TextEditorEdit) => {
                editBuilder.insert( selection.start , "@bindable "); 
                editBuilder.insert( new vscode.Position(0,0) , 
                "import {bindable} from 'aurelia-framework'; \n"
                );
            }
            
        )

        let sbar:vscode.StatusBarItem = vscode.window.createStatusBarItem();
        sbar.text ='Done';
        sbar.show();

    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}
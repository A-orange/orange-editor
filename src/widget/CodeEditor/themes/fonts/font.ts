export type EditorFontItem = {
    label: string,
    ligatures: boolean,
    fontFamily: string
}
export const editorFonts:Array<EditorFontItem> = [
    {label: 'Light', ligatures: true, fontFamily: 'JetBrains Mono Light'},
    {label: 'ExtraLight', ligatures: true, fontFamily: 'JetBrains Mono ExtraLight'},
    {label: 'Bold', ligatures: true, fontFamily: 'JetBrains Mono Bold'},
    {label: 'ExtraBold', ligatures: true, fontFamily: 'JetBrains Mono ExtraBold'},
    {label: 'Medium', ligatures: true, fontFamily: 'JetBrains Mono Medium'},
    {label: 'R', ligatures: true, fontFamily: 'JetBrains Mono R'},
    {label: 'S', ligatures: true, fontFamily: 'JetBrains Mono S'},
    {label: 'Thin', ligatures: true, fontFamily: 'JetBrains Mono Thin'},
    {label: 'Light', ligatures: false, fontFamily: 'JetBrains Mono NL Light'},
    {label: 'ExtraLight', ligatures: false, fontFamily: 'JetBrains Mono NL ExtraLight'},
    {label: 'Bold', ligatures: false, fontFamily: 'JetBrains Mono NL Bold'},
    {label: 'ExtraBold', ligatures: false, fontFamily: 'JetBrains Mono NL ExtraBold'},
    {label: 'Medium', ligatures: false, fontFamily: 'JetBrains Mono NL Medium'},
    {label: 'R', ligatures: false, fontFamily: 'JetBrains Mono NL R'},
    {label: 'S', ligatures: false, fontFamily: 'JetBrains Mono NL S'},
    {label: 'Thin', ligatures: false, fontFamily: 'JetBrains Mono NL Thin'},
]
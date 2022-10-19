export type EditorFontItem = {
    label: string,
    ligatures: boolean,
    fontFamily: string
}
export const editorFonts:Array<EditorFontItem> = [
    {label: 'JetBrains Mono Light', ligatures: true, fontFamily: 'JetBrains Mono Light'},
    {label: 'JetBrains Mono ExtraLight', ligatures: true, fontFamily: 'JetBrains Mono ExtraLight'},
    {label: 'JetBrains Mono Bold', ligatures: true, fontFamily: 'JetBrains Mono Bold'},
    {label: 'JetBrains Mono ExtraBold', ligatures: true, fontFamily: 'JetBrains Mono ExtraBold'},
    {label: 'JetBrains Mono Medium', ligatures: true, fontFamily: 'JetBrains Mono Medium'},
    {label: 'JetBrains Mono R', ligatures: true, fontFamily: 'JetBrains Mono R'},
    {label: 'JetBrains Mono S', ligatures: true, fontFamily: 'JetBrains Mono S'},
    {label: 'JetBrains Mono Thin', ligatures: true, fontFamily: 'JetBrains Mono Thin'},
    {label: 'JetBrains Mono Light', ligatures: false, fontFamily: 'JetBrains Mono NL Light'},
    {label: 'JetBrains Mono ExtraLight', ligatures: false, fontFamily: 'JetBrains Mono NL ExtraLight'},
    {label: 'JetBrains Mono Bold', ligatures: false, fontFamily: 'JetBrains Mono NL Bold'},
    {label: 'JetBrains Mono ExtraBold', ligatures: false, fontFamily: 'JetBrains Mono NL ExtraBold'},
    {label: 'JetBrains Mono Medium', ligatures: false, fontFamily: 'JetBrains Mono NL Medium'},
    {label: 'JetBrains Mono R', ligatures: false, fontFamily: 'JetBrains Mono NL R'},
    {label: 'JetBrains Mono S', ligatures: false, fontFamily: 'JetBrains Mono NL S'},
    {label: 'JetBrains Mono Thin', ligatures: false, fontFamily: 'JetBrains Mono NL Thin'},
]
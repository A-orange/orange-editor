import CodeEditorControl from "@/widget/CodeEditor/CodeEditor.vue";
import TitleControl from "@/widget/title/Title.vue";
import TodoControl from "@/widget/todo/Todo.vue";
import TodoProControl from "@/widget/todo/TotoPro.vue";
import UlControl from "@/widget/ul/Ul.vue";

export const widgetComponent = {
  'title': TitleControl,
  'codeEditor': CodeEditorControl,
  'todo': TodoControl,
  'todoPro': TodoProControl,
  'ul': UlControl,
}